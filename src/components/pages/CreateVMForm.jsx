import { Button, Form, Select, Spin, Typography } from "antd"
import { useState } from "react"
import axios from "axios"
import { PlusCircleOutlined } from "@ant-design/icons"

const { Text } = Typography

const CreateVMForm = ({ user }) => {
  const [, setValue] = useState("ubuntu")
  const [loading, setLoading] = useState(true)
  const [loadingVM, setLoadingVM] = useState(false)
  const [error, setError] = useState(null)
  const [countVMActive, setCountVMActive] = useState(0)

  axios.get("http://localhost:3001/api/vm/get-all").then((res) => {
    setCountVMActive(res.data.length)
    setLoading(false)
  })

  const logInFailed = () => {
    if (error) {
      setError(null)
    }
    setError("Please complete the form")
  }

  const options = [
    {
      value: "ubuntu",
      label: "Ubuntu",
    },
    {
      value: "centos",
      label: "CentOS",
    },
    {
      value: "debian",
      label: "Debian",
    },
  ]
  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const handleFinish = (value) => {
    setLoadingVM(true)
    const { vmChosen } = value
    let data = {}

    switch (vmChosen) {
      case "ubuntu":
        data = {
          publisher: "Canonical",
          offer: "UbuntuServer",
          sku: "18.04-LTS",
        }

        break

      case "centos":
        data = {
          publisher: "OpenLogic",
          offer: "CentOS",
          sku: "7.5",
        }

        break

      case "debian":
        data = {
          publisher: "Debian",
          offer: "debian-10",
          sku: "10",
        }

        break

      default:
        break
    }

    axios
      .post("http://localhost:3001/api/vm/create", data)
      .then((res) => {
        setLoadingVM(false)
        window.location.reload()
      })
      .catch((err) => {
        setError(err.response.data)
      })
  }

  if (!user.credit) {
    return (
      <div className="form-container">
        <Text strong>You don't have enough credit to create a VM</Text>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="form-container">
        <Text strong>
          <Spin size="large" style={{ marginRight: 10 }} />
          Loading the VM creation form...
        </Text>
      </div>
    )
  }

  if (user.limited && countVMActive >= 1) {
    return (
      <div className="form-container">
        <Text strong>Sorry, your account is limited to 1 VM</Text>
      </div>
    )
  }

  if (loadingVM) {
    return (
      <div className="form-container">
        <Text strong>
          <Spin size="large" style={{ marginRight: 10 }} />
          Creating VM... It may take a 5 minutes
        </Text>
      </div>
    )
  }

  return (
    <div className="form-container login-form">
      <Form
        name="createVmForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleFinish}
        onFinishFailed={logInFailed}
        autoComplete="off"
      >
        <Form.Item
          name="vmChosen"
          label="Select a Virtual Machine"
          rules={[{ required: true, message: "Please, select a VM" }]}
        >
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChange}
            placeholder={"Select a VM"}
            options={
              user.limited
                ? [
                    {
                      value: "ubuntu",
                      label: "Ubuntu",
                    },
                  ]
                : options
            }
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create VM <PlusCircleOutlined />
          </Button>
        </Form.Item>

        <Form.ErrorList
          styles={{ textColor: "red" }}
          className="error-message"
          errors={error ? [error] : []}
        />
      </Form>
    </div>
  )
}

export default CreateVMForm
