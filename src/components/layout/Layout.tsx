import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center bg-neutral-300 h-screen pt-5">
        {children}
      </main>
    </>
  );
};
export default Layout;
