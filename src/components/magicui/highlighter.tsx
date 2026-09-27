'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { annotate } from 'rough-notation';

type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  inView?: boolean;
  delay?: number;
}

export function Highlighter({
  children,
  action = 'highlight',
  color = 'cyan',
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  inView = false,
  delay = 0,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, {
    once: true,
    margin: '-10%',
  });

  const shouldShow = !inView || isInView;
  const drawInstantly = useReducedMotion() === true;

  useEffect(() => {
    if (!shouldShow) return;

    const element = elementRef.current;
    if (!element) return;

    // Removed in the effect's cleanup. It used to be returned from inside the
    // setTimeout callback, where nothing ever read it, so every underline
    // outlived the component that drew it.
    let annotation: ReturnType<typeof annotate> | undefined;
    const timeout = setTimeout(() => {
      annotation = annotate(element, {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        animate: !drawInstantly,
        iterations,
        padding,
        multiline,
      });

      annotation.show();
    }, delay);

    return () => {
      clearTimeout(timeout);
      annotation?.remove();
    };
  }, [
    shouldShow,
    drawInstantly,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    delay,
  ]);

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
}
