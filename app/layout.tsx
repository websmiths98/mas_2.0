import type { Metadata, Viewport } from "next";
import "./globals.css";
import FloatingQuoteButton from "./components/FloatingQuoteButton";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "mas logistics",
  description: "MAS is one of the India’s leading providers of freight forwarding and supply chain management services. For more than a decade, we have been providing our customers with transportation and logistics solutions that support the way they want to do business, wherever they are in the world.Read More",
};

import Footer from "./components/Footer";
import { SmoothScrollProvider } from "./animations/SmoothScrollProvider";
import { MotionProvider } from "./components/MotionProvider";
import UniversalCompassNav from "./components/UniversalCompassNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <MotionProvider>
          <SmoothScrollProvider>
            <UniversalCompassNav />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <FloatingQuoteButton />
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
