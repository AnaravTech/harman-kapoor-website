import type { Metadata } from "next";
import "./globals.css";
import MagneticCursor from "@/components/MagneticCursor";

export const metadata: Metadata = {
  title: "Harman Singh Kapoor | UK Entrepreneur, Restaurateur & Public Speaker",
  description:
    "Harman Singh Kapoor — founder of Rangrez restaurant, UK entrepreneur, and public speaker advocating for freedom of expression, democratic values, and the rule of law.",
  keywords: [
    "Harman Singh Kapoor",
    "UK entrepreneur",
    "Rangrez restaurant",
    "Freedom of speech UK",
    "public speaker London",
    "restaurateur London",
    "democratic values UK",
    "British entrepreneur",
  ],
  authors: [{ name: "Harman Singh Kapoor" }],
  openGraph: {
    title: "Harman Singh Kapoor | UK Entrepreneur & Public Speaker",
    description:
      "An entrepreneur's journey through challenges, resilience, and a commitment to fairness and democratic values.",
    type: "website",
    locale: "en_GB",
    siteName: "Harman Singh Kapoor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harman Singh Kapoor | UK Entrepreneur & Public Speaker",
    description:
      "Standing for Principles. Speaking for Freedom. Protecting the Rule of Law.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ cursor: "none" }}>
        <MagneticCursor />
        {children}
      </body>
    </html>
  );
}
