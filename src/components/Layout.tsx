import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./footer";
import { ScrollToTop } from "./ScrollToTop";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
