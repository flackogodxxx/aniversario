'use client';

import { ReactNode, useEffect } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Cormorant_Garamond, Montserrat } from "next/font/google";
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} ${montserrat.variable} antialiased ios-fix mobile-text-adjust`}>
        {children}
      </body>
    </html>
  );
}
