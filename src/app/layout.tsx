import { Poppins } from "next/font/google";
import { NextAuthProvider } from "@/providers/auth";
import { ToastProvider } from "@/providers/toast";

import { Header } from "../components/Header";
import { Footer } from "@/components/Footer";

import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "FSW Trips",
  description: "Sistema de reserva de viagens.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <NextAuthProvider>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
