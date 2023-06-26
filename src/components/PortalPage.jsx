import Template from "./template/Template"
import { useState } from "react"
import CreateVMForm from "./pages/CreateVMForm"
import ShowVMs from "./pages/ShowVMs"

const PortalPage = ({ user, setUser }) => {
  const [selectedPage, setSelectedPage] = useState("1")

  return (
    <Template
      user={user}
      setUser={setUser}
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
    >
      {selectedPage === "1" ? (
        <ShowVMs />
      ) : (
        selectedPage === "2" && <CreateVMForm user={user} />
      )}
    </Template>
  )
}

export default PortalPage
