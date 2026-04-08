import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full overscroll-none bg-base-300 h-screen pt-20">
        <main className="flex flex-col w-full max-w-5xl px-4 items-center">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
