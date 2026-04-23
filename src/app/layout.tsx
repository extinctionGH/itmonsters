import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-im-gray text-im-black antialiased overflow-x-hidden cursor-none">
        <CustomCursor />
        <Header />
        {children}
      </body>
    </html>
  );
}