import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Build Club",
  description:
    "A small community of AI-native builders shipping weekly prototypes and building portfolio evidence that gets interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
