import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHotToastConfig } from '@ngneat/hot-toast';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHotToastConfig({
      style: {
        background: 'var(--paper)',
        color: 'var(--text)',
      },
      loading: {
        iconTheme: {
          primary: 'var(--text)',
          secondary: 'rgba(var(--text-channel), 0.42)',
        },
      },
      success: {
        iconTheme: {
          primary: 'var(--success)',
          secondary: 'var(--paper)',
        },
      },
      error: {
        iconTheme: {
          primary: 'var(--error)',
          secondary: 'var(--paper)',
        },
      },
    }),
  ],
};
