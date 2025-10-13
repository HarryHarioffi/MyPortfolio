import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Hariharasudhan S | Product Designer",
  description: "Portfolio of Hariharasudhan S, a curious Product Designer who loves learning through exploration",
  icons: {
    icon: [
      { url: "./icon.png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="./icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="./favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="./favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="./favicon.ico" />
      </head>
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={<div>Loading...</div>}>
            <SiteHeader />
            {children}
            <SiteFooter />
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
