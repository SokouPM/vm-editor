import { useState } from "react"
import { Button, Form, Input, Typography } from "antd"
import { BoxPlotFilled, LoginOutlined } from "@ant-design/icons"
import Animation from "./animation/Animation"
import users from "../data/users.json"

const { Title } = Typography

const LoginPage = ({ setUser }) => {
  const [error, setError] = useState(null)

  const logIn = (values) => {
    const { username, password } = values
    const userFound = users.find(
      (user) => user.username === username && user.password === password
    )

    if (!userFound) {
      setError("Invalid username or password")

      return
    }

    setError(null)
    sessionStorage.setItem("user", JSON.stringify(userFound))
    setUser(userFound)
  }
  const logInFailed = () => {
    if (error) {
      setError(null)
    }
    setError("Please input your username and password!")
  }

  return (
    <main className="login-page">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          top: 0,
          left: 20,
        }}
      >
        <BoxPlotFilled
          style={{ fontSize: 40, color: "white", marginRight: 5 }}
        />
        <Title level={1} style={{ fontSize: 25, color: "white" }}>
          VMS
        </Title>
      </div>
      <div className="form-container">
        <Form
          name="loginForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={logIn}
          onFinishFailed={logInFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            initialValue={users[2].username}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            initialValue={users[2].password}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login <LoginOutlined />
            </Button>
          </Form.Item>

          <Form.ErrorList
            styles={{ textColor: "red" }}
            className="error-message"
            errors={error ? [error] : []}
          />
        </Form>
      </div>

      <Animation />
    </main>
  )
}

export default LoginPage
