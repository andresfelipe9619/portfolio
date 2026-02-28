import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Contact from './Contact';

const tMap: Record<string, string> = {
  'contact.title0': 'Let\'s',
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

describe('Contact page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('updates character helper when user types a message', () => {
    render(<Contact />);

    const message = screen.getByLabelText(/message/i);
    fireEvent.change(message, { target: { value: 'Hello there!', name: 'message' } });

    expect(screen.getByText(/Just getting warmed up.../i)).toBeInTheDocument();
  });

  it('submits the form and shows success feedback', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    vi.stubGlobal('fetch', fetchMock);

    render(<Contact />);

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
    expect(logEventMock).toHaveBeenCalledWith('Contact Form', 'Submit', 'Success');
  });
});
