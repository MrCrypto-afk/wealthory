import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wealthoryglobal.com'),
  title: "Wealthory Global | Premium Financial Services & Market Insights",
  description: "Institutional-grade financial services and actionable market insights for investors who demand excellence.",
  alternates: {
    canonical: '/',
  },
  verification: {
    google: "IdiZ2KSgO8DPpMXd4i7r47HQhPHctYPEXICPF9zuiGc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-500 ease-in-out">
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K8KKZRDD" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-9PBSV25Z3K" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9PBSV25Z3K');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K8KKZRDD');
          `}
        </Script>
      </body>
    </html>
  );
}
