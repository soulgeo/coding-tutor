import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col w-full overscroll-none items-center bg-base-300 h-screen pt-20">
        {children}
      </main>
    </>
  );
};
export default Layout;
