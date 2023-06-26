import { useState } from "react"
import { Button, Layout, Menu, Typography } from "antd"
import {
  ApartmentOutlined,
  AppstoreAddOutlined,
  BoxPlotFilled,
  LogoutOutlined,
} from "@ant-design/icons"

const { Content, Sider, Header } = Layout
const { Title } = Typography

const items = [
  { label: "VM list", key: "1", icon: <ApartmentOutlined /> },
  { label: "Create VM", key: "2", icon: <AppstoreAddOutlined /> },
]

const Template = ({ children, user, setUser, setSelectedPage }) => {
  const [collapsed, setCollapsed] = useState(false)

  const logout = () => {
    sessionStorage.removeItem("user")
    setUser(null)
  }

  return (
    <Layout style={{ background: "none", minHeight: "100vh" }}>
      <Header
        style={{
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <BoxPlotFilled
            style={{ fontSize: 40, color: "white", marginRight: 5 }}
          />
          <Title level={1} style={{ fontSize: 25, color: "white" }}>
            VMS
          </Title>
        </div>
        <Title style={{ marginBottom: 30, color: "white" }}>
          Welcome, {user.username}
        </Title>
        <Button danger type="primary" onClick={logout}>
          Logout <LogoutOutlined />
        </Button>
      </Header>
      <Layout hasSider style={{ background: "none" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            onClick={(e) => {
              setSelectedPage(e.key)
            }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Content
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
export default Template
