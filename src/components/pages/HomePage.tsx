import { Link } from "react-router"
import Layout from "../layout/Layout"

function HomePage() {
  return (
    <Layout>
      <div className="flex flex-col h-screen w-full items-center justify-center gap-4">
        <h2 className="text-4xl">Your trusty python tutor.</h2>
        <h1 className="text-xl">Learn python through interactive lessons and coding exercises.</h1>
        <div className="flex flex-row gap-4 mt-2">
          <Link to="/" className="btn btn-primary">Sign In</Link>
          <Link to="/" className="btn btn-secondary">Create an Account</Link>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
