import { Card, List, Row, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"

const { Title, Text } = Typography

const ShowVMs = () => {
  const [vms, setVms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    console.log("here")
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
            <Card title={"Virtual machine informations"}>
              <Text>
                IP address : <strong>{item.ip}</strong>
              </Text>
              <br />
              <Text>
                Username : <strong>AdminSudo</strong>
              </Text>
              <br />
              <Text>
                Password : <strong>AdminSudo</strong>
              </Text>
              <br />
              <Text>
                Deletion date :{" "}
                <strong>{new Date(item.deletionDate).toLocaleString()}</strong>
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
