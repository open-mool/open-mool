import type { Metadata, Viewport } from "next";
import { Eczar, Yantramanav, Gotu } from "next/font/google";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { Header } from "@/components/Header";
import "./globals.css";

const eczar = Eczar({
    subsets: ["latin", "devanagari"],
    variable: "--font-eczar",
    display: "swap",
});

const yantramanav = Yantramanav({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin", "devanagari"],
    variable: "--font-yantramanav",
    display: "swap",
});

const gotu = Gotu({
    weight: "400",
    subsets: ["latin", "devanagari"],
    variable: "--font-gotu",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Open Mool | The Source Code of the Himalayas",
    description: "The world's first open-source, AI-ready multimodal archive for the Himalayan region.",
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Auth0Provider>
                <body className={`${eczar.variable} ${yantramanav.variable} ${gotu.variable} font-body antialiased`}>
                    <Header />
                    {children}
                </body>
            </Auth0Provider>
        </html>
    );
}
