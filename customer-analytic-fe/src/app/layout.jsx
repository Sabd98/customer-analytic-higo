//Init layout render and styling with SWRProvider for data fetching
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { SWRProvider } from "@/lib/swrConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cusboard",
  description: "Dashboard for customer data analytics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SWRProvider>
          <div className="min-h-screen flex flex-col bg-purple-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6">
              {children}
            </main>
            <Footer />
          </div>
        </SWRProvider>
      </body>
    </html>
  );
}