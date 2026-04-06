import { Link } from "react-router"
import Layout from "../layout/Layout"
import { useRef } from "react"
import Login from "../partials/Login"

const HomePage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  return (
    <Layout>
      <div className="flex flex-col h-screen w-full items-center justify-center gap-4">
        <h2 className="text-4xl">Your trusty python tutor.</h2>
        <h1 className="text-xl">Learn python through interactive lessons and coding exercises.</h1>
        <div className="flex flex-row gap-4 mt-2">
          <button onClick={openModal} className="btn btn-primary">Sign In</button>
          <Link to="/" className="btn btn-secondary">Create an Account</Link>
        </div>
        <dialog ref={dialogRef} className="m-auto bg-transparent border-none w-sm p-3">
          <button onClick={closeModal} className="btn btn-ghost btn-circle absolute top-6 right-6">✕</button>
          <Login />
        </dialog>
      </div>
    </Layout>
  )
}

export default HomePage
