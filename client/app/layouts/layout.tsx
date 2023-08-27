import Navbar from "@/components/Navbar";
import "@/styles/globals.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="main-container">{children}</main>
    </>
  );
}
