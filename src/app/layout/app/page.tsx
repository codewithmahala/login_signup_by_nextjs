import NavbarPage from "../navbar/page";
import Footer from "../footer/page";
import "../../../../../styles/frontend/navbar.css";
import "../../../../../styles/frontend/footer.css";
import "../../../../../styles/frontend/donation.css";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarPage />
      <main>
        {children}
      </main>
      <Footer />
      {/* You can add a Footer component here if needed */}
    </>
  );
}