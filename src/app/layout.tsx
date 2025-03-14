"use client";

import "./globals.css";
import Footer from "./components/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="h-screen w-full text-white">
          <main className="flex grow flex-col pb-[81px]">{children}</main>
          <Footer />
          <div id="portal-root"></div>
        </div>
      </body>
    </html>
  );
}
