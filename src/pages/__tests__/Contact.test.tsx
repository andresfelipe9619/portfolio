import { fireEvent, render, screen, waitFor } from '@/test/utils';
import Contact from '../Contact';

const tMap: Record<string, string> = {
  'contact.title0': "Let's",
  'contact.title1': 'Talk',
  'contact.subtitle': 'Ping me anytime',
  'contact.cardTitle': 'Contact Card',
  'contact.cardDesc': 'Fill the form',
  'contact.nameLabel': 'Name',
  'contact.emailLabel': 'Email',
  'contact.subjectLabel': 'Subject',
  'contact.messageLabel': 'Message',
  'contact.namePlaceholder': 'Your name',
  'contact.subjectPlaceholder': 'What is this about?',
  'contact.messagePlaceholder': 'Type your message',
  'contact.chars': 'chars',
  'contact.sendBtn': 'Send message',
  'contact.sendingBtn': 'Sending...',
  'contact.successTitle': 'Sent!',
  'contact.successDesc': 'Thanks for your message',
  'contact.errorMsg': 'Something failed',
  'contact.errorTitle': "That didn't go through",
  'contact.errorDesc': 'Your message is still right here',
  'contact.footerNote': 'I answer quickly',
};

const toastMock = vi.fn();
const logEventMock = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => tMap[key] ?? key,
  }),
}));

vi.mock('sonner', () => ({
  toast: (...args: unknown[]) => toastMock(...args),
  Toaster: () => <div data-testid="toaster" />,
}));

vi.mock('@/lib/ga', () => ({
  logEvent: (...args: unknown[]) => logEventMock(...args),
}));

vi.mock('@sentry/react', () => ({
  captureException: vi.fn(),
}));

describe('Contact page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('updates character helper when user types a message', () => {
    render(<Contact />);

    const message = screen.getByLabelText(/message/i);
    fireEvent.change(message, {
      target: { value: 'Hello there!', name: 'message' },
    });

    expect(screen.getByText(/Just getting warmed up.../i)).toBeInTheDocument();
  });

  /** Fills every field so the form is ready to submit. */
  const fillForm = () => {
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { name: 'name', value: 'Andres' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: 'email', value: 'andres@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { name: 'subject', value: 'Hello' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { name: 'message', value: 'This portfolio rocks.' },
    });
  };

  it('submits the form and shows success feedback', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    vi.stubGlobal('fetch', fetchMock);

    render(<Contact />);
    fillForm();

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.web3forms.com/submit',
        expect.objectContaining({ method: 'POST' }),
      );
    });

    expect(toastMock).toHaveBeenCalledWith('Sent!', {
      description: 'Thanks for your message',
    });
    expect(logEventMock).toHaveBeenCalledWith(
      'Contact Form',
      'Submit',
      'Success',
    );

    // A successful send clears the slate.
    await waitFor(() => {
      expect(screen.getByLabelText(/message/i)).toHaveValue('');
    });
  });

  it('surfaces an error and keeps the draft when the API returns 500', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({ success: false, message: 'boom' }),
    });

    vi.stubGlobal('fetch', fetchMock);

    render(<Contact />);
    fillForm();

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith("That didn't go through", {
        description: 'Your message is still right here',
      });
    });

    expect(logEventMock).toHaveBeenCalledWith(
      'Contact Form',
      'Submit',
      'Error',
    );

    // The whole point: a failed send must never eat someone's message.
    expect(screen.getByLabelText(/message/i)).toHaveValue(
      'This portfolio rocks.',
    );
    expect(screen.getByLabelText(/email/i)).toHaveValue('andres@example.com');
  });

  it('surfaces an error and keeps the draft when the network drops', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('offline'));

    vi.stubGlobal('fetch', fetchMock);

    render(<Contact />);
    fillForm();

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith("That didn't go through", {
        description: 'Your message is still right here',
      });
    });

    expect(screen.getByLabelText(/message/i)).toHaveValue(
      'This portfolio rocks.',
    );
  });

  it('re-enables the submit button after a failure so users can retry', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('offline'));
    vi.stubGlobal('fetch', fetchMock);

    render(<Contact />);
    fillForm();

    const submit = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /send message/i }),
      ).toBeEnabled();
    });
  });

  /** Submits a filled form and hands back what was actually POSTed. */
  const submitAndCapture = async (tickHoneypot = false) => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({ success: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const { container } = render(<Contact />);
    fillForm();
    if (tickHoneypot) {
      fireEvent.click(
        container.querySelector('input[name="botcheck"]') as HTMLInputElement,
      );
    }
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    return fetchMock.mock.calls[0][1].body as FormData;
  };

  it('posts every field the visitor filled in', async () => {
    const body = await submitAndCapture();

    expect(body.get('name')).toBe('Andres');
    expect(body.get('email')).toBe('andres@example.com');
    expect(body.get('subject')).toBe('Hello');
    expect(body.get('message')).toBe('This portfolio rocks.');
    expect(body.get('access_key')).toBeTruthy();
  });

  describe('honeypot', () => {
    it('stays out of the way for a human', async () => {
      const body = await submitAndCapture();

      expect(body.has('botcheck')).toBe(false);
    });

    // The finding: botcheck used to be appended as a constant empty string,
    // so a bot ticking the hidden box changed nothing and the spam went out.
    it('reports a bot that ticks the hidden box', async () => {
      const body = await submitAndCapture(true);

      expect(body.get('botcheck')).toBe('on');
    });
  });

  // App mounts the global Toaster. A second one here made sonner render every
  // contact toast twice.
  it('does not mount a Toaster of its own', () => {
    render(<Contact />);

    expect(screen.queryByTestId('toaster')).not.toBeInTheDocument();
  });
});

describe('Web3Forms access key', () => {
  const FALLBACK_KEY = 'ce6a6db2-b865-4b4b-8f6c-c11ccb4481bf';

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  /** The key is read once at module load, so each case imports Contact fresh. */
  const postedKeyWith = async (envValue: string | undefined) => {
    vi.resetModules();
    if (envValue !== undefined) {
      vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', envValue);
    }
    const { default: FreshContact } = await import('../Contact');

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({ success: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<FreshContact />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { name: 'name', value: 'Ada' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: 'email', value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { name: 'message', value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    return (fetchMock.mock.calls[0][1].body as FormData).get('access_key');
  };

  it('uses the configured key when one is set', async () => {
    expect(await postedKeyWith('fork-owner-key')).toBe('fork-owner-key');
  });

  // The finding: `cp .env.example .env` sets this to "", and `??` kept the
  // empty string, so every message was rejected.
  it('falls back to the built-in key when the variable is blank', async () => {
    expect(await postedKeyWith('')).toBe(FALLBACK_KEY);
  });
});
