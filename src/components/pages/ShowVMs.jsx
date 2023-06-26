import { Card, List, Row, Typography } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"

const { Title, Text } = Typography

const ShowVMs = () => {
  const [vms, setVms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/vm/get-all")
      .then((res) => {
        setVms(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    setLoading(false)
  }, [])

  return (
    <div
      className="list-container"
      style={{ width: "90%", alignSelf: "self-start", marginTop: "5%" }}
    >
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={2} style={{ marginTop: 0 }}>
          List of active virtual machines
          <br />
          <em style={{ fontSize: 15 }}>
            ⚠️ If the IP address of a machine does not appear, wait 1 minute and
            et reload the page ⚠️
          </em>
        </Title>

        <Text style={{ fontSize: 18 }}>
          <strong>{vms.length}</strong> active{vms.length > 1 && "s"} virtual
          machine{vms.length > 1 && "s"}{" "}
        </Text>
      </Row>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={vms}
        loading={loading}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontSize: 20 }}>
                    Virtual machine informations <br />
                    <span style={{ fontSize: 15 }}>
                      Operating system : <strong>{item.os}</strong>
                    </span>
                  </div>
                  {item.os === "Linux" && (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg"
                      alt="OS logo"
                      height={70}
                      style={{ margin: 10 }}
                    />
                  )}
                  {item.os === "Windows" && (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg"
                      alt="OS logo"
                      height={70}
                      style={{ margin: 10 }}
                    />
                  )}
                </div>
              }
            >
              <Text>
                IP address : <strong>{item.ip}</strong>
              </Text>
              <br />
              <Text>
                Username : <strong>{item.username}</strong>
              </Text>
              <br />
              <Text>
                Password : <strong>{item.password}</strong>
              </Text>
              <br />
              <br />
              <Text strong>SSH connection :</Text>
              <br />
              <Text code copyable>
                {`${item.username}@${item.ip}`}
              </Text>
              <br />
              <Text strong>Password connection :</Text>
              <br />
              <Text code copyable>
                {item.password}
              </Text>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ShowVMs
