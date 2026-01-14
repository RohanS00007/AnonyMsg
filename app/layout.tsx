import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
// import AuthProvider from "@/components/custom/auth-provider";
import TanstackQueryProvider from "@/components/custom/tanstack-query-provider";
import { Toaster } from "sonner";
import AuthQueryProvider from "@/components/custom/auth-query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anonymous Message - True Feedback",
  description:
    "True Feedback - Where your identity remains a secret. Dive into the world of Anonymous Feedback.",
  keywords: [
    "anonymous",
    "feedback",
    "message",
    "secret",
    "anonymous messaging",
  ],
  authors: [{ name: "Anonymous Message" }],
  openGraph: {
    title: "Anonymous Message - True Feedback",
    description:
      "True Feedback - Where your identity remains a secret. Dive into the world of Anonymous Feedback.",
    url: "https://anon-msg-sigma.vercel.app",
    siteName: "Anonymous Message",
    images: [
      {
        url: "https://postimg.cc/mcgCf27Y",
        width: 1200,
        height: 630,
        alt: "Anonymous Message - True Feedback",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anonymous Message - True Feedback",
    description:
      "True Feedback - Where your identity remains a secret. Dive into the world of Anonymous Feedback.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen w-full flex-col antialiased`}
      >
        <TanstackQueryProvider>
          <AuthQueryProvider>
            <main className="flex w-full items-center justify-center">
              {children}
            </main>
            <Toaster position="top-center" />
          </AuthQueryProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
