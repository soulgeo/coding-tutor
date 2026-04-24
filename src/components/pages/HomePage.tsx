import Layout from "../layout/Layout"
import { useAuth } from "../../context/AuthContext"
import 'animate.css'

const HomePage = () => {
  const { setShowSignup } = useAuth();

  return (
    <Layout>
      <div className="flex flex-col h-screen w-full items-center justify-center gap-4">
        <h2 className="text-4xl">Your trusty python tutor.</h2>
        <h1 className="text-xl">Learn python through interactive lessons and coding exercises.</h1>
        <div className="flex flex-row gap-4 mt-2">
          <button onClick={() => setShowSignup(true)} className="btn btn-primary">Create an Account</button>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
