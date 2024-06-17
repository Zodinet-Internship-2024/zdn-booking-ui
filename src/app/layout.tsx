import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AuthProvider from '@/components/auth/AuthProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zodinet Booking",
  description: "Zodinet Booking: Your Ultimate Platform for Booking Sport Fields",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen`}>
        <AuthProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
