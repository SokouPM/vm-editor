import React, { useEffect, useState } from "react"
import { Spin } from "antd"
import Login from "./components/LoginPage"
import PortalPage from "./components/PortalPage"
import "./styles/App.css"

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user && sessionStorage.getItem("user")) {
      setUser(JSON.parse(sessionStorage.getItem("user")))
    }

    setLoading(false)
  }, [user])

  if (loading) {
    return (
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "white",
        }}
      >
        <Spin size="large" />
      </main>
    )
  }

  if (user) {
    return <PortalPage user={user} setUser={setUser} />
  }

  return <Login user={user} setUser={setUser} />
}

export default App
