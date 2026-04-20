import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Layout = ({ children, fullWidth }: Props) => {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "var(--color-base-200)",
            color: "var(--color-base-content)",
            border: "1px solid var(--color-base-300)",
          },
          success: {
            iconTheme: {
              primary: "var(--color-success)",
              secondary: "var(--color-success-content)",
            },
            style: {
              border: "1px solid var(--color-success)",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--color-error)",
              secondary: "var(--color-error-content)",
            },
            style: {
              border: "1px solid var(--color-error)",
            },
          },
        }}
      />
      <Navbar />
      <div
        className={`flex flex-col items-center w-full overscroll-none bg-base-300 h-full min-h-screen pt-20`}
      >
        <main
          className={`flex flex-col w-full ${fullWidth ? "" : "max-w-5xl px-4"} items-center`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
