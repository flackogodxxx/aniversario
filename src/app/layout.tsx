'use client';

import { ReactNode, useEffect } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  useEffect(() => {
    // Corrige problema de altura em dispositivos iOS
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    
    window.addEventListener('resize', appHeight);
    window.addEventListener('orientationchange', appHeight);
    
    // Inicialização
    appHeight();
    
    return () => {
      window.removeEventListener('resize', appHeight);
      window.removeEventListener('orientationchange', appHeight);
    };
  }, []);

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <title>Feliz Aniversário!</title>
        <meta name="description" content="Uma surpresa especial para você" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="ios-fix mobile-text-adjust">
        {children}
      </body>
    </html>
  );
}
