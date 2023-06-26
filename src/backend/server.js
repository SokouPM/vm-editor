const express = require("express")
const { createAndDeleteVmFunction, getAllMachines } = require("./vm")
const cors = require("cors")
const pino = require("pino")

const app = express()
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
})

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())

app.get("/api/vm/get-all", async (req, res) => {
  try {
    const vms = await getAllMachines()
    if (vms.status !== 200) {
      return res.status(vms.status).send(vms.error)
    }

    res.status(200).send(vms.data)
  } catch (err) {
    logger.error(err)
    return res.status(500).send("Internal server error")
  }
})

app.post("/api/vm/create", async (req, res) => {
  try {
    createAndDeleteVmFunction(req.body)
      .then((result) => {
        console.log("result", result)
        return res.status(result.status).send(result.message || result.error)
      })
      .catch((err) => {
        logger.error(err)
        return res.status(400).send("An error occured")
      })
  } catch (err) {
    return res.status(500).send("Internal server error")
  }
})

app.listen(3001, () => {
  logger.info("Serveur started on port:3001")
})
