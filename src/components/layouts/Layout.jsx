import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-[90vh]">{children}</main>
      <Footer />
    </>
  );
};
