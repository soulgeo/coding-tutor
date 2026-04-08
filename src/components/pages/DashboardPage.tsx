import { useAuth } from "../../context/AuthContext"
import Layout from "../layout/Layout"

const DashboardPage = () => {
  const { currentUser } = useAuth()

  return (
    <Layout>
      <div>Welcome {currentUser?.email}</div>
    </Layout>
  )
}
export default DashboardPage
