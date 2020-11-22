import React from "react";
import { Particles } from "@blackbox-vision/react-particles";
import { useTheme } from "@material-ui/core";

export default function CustomParticles() {
  const theme = useTheme();
  return (
    <Particles
      id="simple"
      width="auto"
      height="90vh"
      style={{
        backgroundColor: "inherit",
      }}
      params={{
        particles: {
          color: { value: theme.palette.secondary.main },
          number: {
            value: 70,
          },
          size: {
            value: 4,
          },
          line_linked: {
            color: theme.palette.secondary.main,
            opacity: 1,
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
          },
        },
      }}
    />
  );
}
