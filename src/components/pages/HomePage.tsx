import Layout from "../layout/Layout"
import { useRef, useState } from "react"
import Login from "../partials/Login"
import Signup from "../partials/Signup"
import 'animate.css'

const HomePage = () => {
  const loginDialogRef = useRef<HTMLDialogElement>(null)
  const signupDialogRef = useRef<HTMLDialogElement>(null)
  const [isClosingLogin, setIsClosingLogin] = useState(false)
  const [isClosingSignup, setIsClosingSignup] = useState(false)

  const openLoginModal = () => {
    setIsClosingLogin(false);
    loginDialogRef.current?.showModal();
  }
  
  const closeLoginModal = () => {
    setIsClosingLogin(true);
    setTimeout(() => {
      loginDialogRef.current?.close();
      setIsClosingLogin(false);
    }, 200);
  }

  const openSignupModal = () => {
    setIsClosingSignup(false);
    signupDialogRef.current?.showModal();
  }

  const closeSignupModal = () => {
    setIsClosingSignup(true);
    setTimeout(() => {
      signupDialogRef.current?.close();
      setIsClosingSignup(false);
    }, 200);
  }

  return (
    <Layout>
      <div className="flex flex-col h-screen w-full items-center justify-center gap-4">
        <h2 className="text-4xl">Your trusty python tutor.</h2>
        <h1 className="text-xl">Learn python through interactive lessons and coding exercises.</h1>
        <div className="flex flex-row gap-4 mt-2">
          <button onClick={openLoginModal} className="btn btn-primary">Log In</button>
          <button onClick={openSignupModal} className="btn btn-secondary">Create an Account</button>
        </div>
        <dialog ref={loginDialogRef} className="m-auto bg-transparent border-none w-sm p-3 overflow-visible">
          <div className={isClosingLogin ? "animate-subtle-zoom-fade-out" : "animate-subtle-zoom-fade"}>
            <button onClick={closeLoginModal} className="btn btn-ghost btn-circle absolute top-3 right-3 z-50">✕</button>
            <Login />
          </div>
        </dialog>
        <dialog ref={signupDialogRef} className="m-auto bg-transparent border-none w-sm p-3 overflow-visible">
          <div className={isClosingSignup ? "animate-subtle-zoom-fade-out" : "animate-subtle-zoom-fade"}>
            <button onClick={closeSignupModal} className="btn btn-ghost btn-circle absolute top-3 right-3 z-50">✕</button>
            <Signup />
          </div>
        </dialog>
      </div>
    </Layout>
  )
}

export default HomePage
