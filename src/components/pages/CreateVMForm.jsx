import { Button, Form, Select, Typography } from "antd"
import { useState } from "react"
import axios from "axios"
import { PlusCircleOutlined } from "@ant-design/icons"

const { Text } = Typography

const CreateVMForm = ({ user }) => {
  const [, setValue] = useState("ubuntu")
  const [error, setError] = useState(null)

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
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (!user.credit) {
    return (
      <div className="form-container">
        <Text strong>You don't have enough credit to create a VM</Text>
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
