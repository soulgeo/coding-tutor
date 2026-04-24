import { Toaster, resolveValue } from "react-hot-toast";
import Navbar from "./Navbar/Navbar";
import CustomToast from "../ui/CustomToast";

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Layout = ({ children, fullWidth }: Props) => {
  return (
    <>
      <Toaster
        position="bottom-right"
        containerStyle={{
          bottom: "40px",
          right: "20px",
        }}
        toastOptions={{
          duration: 4000,
        }}
      >
        {(t) => (
          <CustomToast 
            t={t} 
            message={resolveValue(t.message, t)} 
            icon={t.icon} 
          />
        )}
      </Toaster>
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
