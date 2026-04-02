import Card from "../ui/Card"

const Login = () => {
  return (
    <Card title="Sign In">
      <input type="text" name="username" />
      <input type="text" name="password"/>
      <button>Sign In</button>
    </Card>
  )
}

export default Login
