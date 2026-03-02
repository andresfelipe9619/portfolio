/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from '@/components/ui/tooltip';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    initialEntries?: string[];
}

function render(
    ui: ReactElement,
    { initialEntries = ['/'], ...renderOptions }: CustomRenderOptions = {}
) {
    function Wrapper({ children }: { children: React.ReactNode }) {
        return (
            <HelmetProvider>
                <MemoryRouter initialEntries={initialEntries}>
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </MemoryRouter>
            </HelmetProvider>
        );
    }

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
