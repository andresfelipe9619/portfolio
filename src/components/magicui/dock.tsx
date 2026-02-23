'use client';

import { cn } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import React, { type PropsWithChildren } from 'react';
import { dockVariants } from '@/components/constants.ts';

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  children: React.ReactNode;
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        {...props}
        className={cn(dockVariants({ className }))}
      >
        {children}
      </motion.div>
    );
  },
);

Dock.displayName = 'Dock';

export interface DockIconProps {
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({ className, children, ...props }: DockIconProps) => {
  return (
    <div
      className={cn(
        'flex aspect-square cursor-pointer items-center justify-center rounded-full',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

DockIcon.displayName = 'DockIcon';

export { Dock, DockIcon };
