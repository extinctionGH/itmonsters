import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "ITMonsters Production Co.",
  description: "Creativity born from chaos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-im-gray text-im-black antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}