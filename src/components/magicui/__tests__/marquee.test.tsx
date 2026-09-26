import { fireEvent, render, screen } from '@testing-library/react';
import { Marquee } from '../marquee';

const PAUSED = '[animation-play-state:paused]';

describe('Marquee', () => {
  // WCAG 2.2.2: anything moving on its own for more than five seconds needs a
  // way to stop it. Hover-to-pause doesn't reach keyboards or touchscreens.
  it('can be paused and resumed with a real button', () => {
    const { container } = render(
      <Marquee>
        <span>logo</span>
      </Marquee>,
    );
    const tracks = () => [...container.querySelectorAll('.animate-marquee')];

    fireEvent.click(screen.getByRole('button', { name: 'marquee.pause' }));
    tracks().forEach((track) => expect(track).toHaveClass(PAUSED));

    fireEvent.click(screen.getByRole('button', { name: 'marquee.resume' }));
    tracks().forEach((track) => expect(track).not.toHaveClass(PAUSED));
  });

  // Keyed to the tracks, not the whole strip: the pause button lives in the
  // strip too, and a click leaves focus on it. The browser half of this, that
  // "resume" really restarts it, is in e2e/smoke.spec.ts.
  it('pauses for keyboard focus as well as for the mouse', () => {
    const { container } = render(
      <Marquee pauseOnHover>
        <span>logo</span>
      </Marquee>,
    );

    expect(container.querySelector('.animate-marquee')).toHaveClass(
      'group-has-[>div:focus-within]/marquee:[animation-play-state:paused]',
      '[@media(hover:hover)]:group-has-[>div:hover]/marquee:[animation-play-state:paused]',
    );
    expect(screen.getByRole('button').tagName).not.toBe('DIV');
  });

  // A visitor can't tell a copy from the original, and for much of every loop
  // the copies are what's on screen. Inert copies ignored every click.
  it('keeps every copy as clickable as the original', () => {
    const { container } = render(
      <Marquee repeat={3}>
        <a href="#client">logo</a>
      </Marquee>,
    );
    const tracks = container.querySelectorAll('.animate-marquee');

    expect(tracks).toHaveLength(3);
    tracks.forEach((track) => expect(track).not.toHaveAttribute('inert'));
  });
});
