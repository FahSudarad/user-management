import { Poppins } from 'next/font/google'
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: "--font-poppins",
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
