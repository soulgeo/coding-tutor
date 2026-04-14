import Layout from "../layout/Layout"
import { useRef } from "react"
import Login from "../partials/Login"
import Signup from "../partials/Signup"

const HomePage = () => {
  const loginDialogRef = useRef<HTMLDialogElement>(null)
  const signupDialogRef = useRef<HTMLDialogElement>(null)

  const openLoginModal = () => loginDialogRef.current?.showModal();
  const closeLoginModal = () => loginDialogRef.current?.close();
  const openSignupModal = () => signupDialogRef.current?.showModal();
  const closeSignupModal = () => signupDialogRef.current?.close();

  return (
    <Layout>
      <div className="flex flex-col h-screen w-full items-center justify-center gap-4">
        <h2 className="text-4xl">Your trusty python tutor.</h2>
        <h1 className="text-xl">Learn python through interactive lessons and coding exercises.</h1>
        <div className="flex flex-row gap-4 mt-2">
          <button onClick={openLoginModal} className="btn btn-primary">Log In</button>
          <button onClick={openSignupModal} className="btn btn-secondary">Create an Account</button>
        </div>
        <dialog ref={loginDialogRef} className="m-auto bg-transparent border-none w-sm p-3">
          <button onClick={closeLoginModal} className="btn btn-ghost btn-circle absolute top-6 right-6">✕</button>
          <Login />
        </dialog>
        <dialog ref={signupDialogRef} className="m-auto bg-transparent border-none w-sm p-3">
          <button onClick={closeSignupModal} className="btn btn-ghost btn-circle absolute top-6 right-6">✕</button>
          <Signup />
        </dialog>
      </div>
    </Layout>
  )
}

export default HomePage
