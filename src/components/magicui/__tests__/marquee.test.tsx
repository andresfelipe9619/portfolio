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

  it('pauses for keyboard focus as well as for the mouse', () => {
    const { container } = render(
      <Marquee pauseOnHover>
        <span>logo</span>
      </Marquee>,
    );

    expect(container.querySelector('.animate-marquee')).toHaveClass(
      'group-focus-within:[animation-play-state:paused]',
    );
  });

  // The copies exist only to make the loop seamless. Screen readers used to
  // read every logo and quote four times.
  it('keeps the loop’s copies away from screen readers and the Tab key', () => {
    const { container } = render(
      <Marquee repeat={3}>
        <a href="#client">logo</a>
      </Marquee>,
    );
    const [original, ...copies] =
      container.querySelectorAll('.animate-marquee');

    expect(original).not.toHaveAttribute('inert');
    copies.forEach((copy) => expect(copy).toHaveAttribute('inert'));
  });
});
