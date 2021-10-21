import "dotenv/config"
import express, { Response, Request } from "express"
import { router } from "./routes"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"

const app = express()

app.use(cors())

const serverHttp = http.createServer(app)

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  console.log("Usuário conectado no socket " + socket.id)
})

app.use(express.json())
app.use(router)

app.get("/github", (request: Request, response: Response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  )
})

app.get("/signin/callback", (request: Request, response: Response) => {
  const { code } = request.query
  response.status(200).json({ userCode: code })
})

export { serverHttp, io }
