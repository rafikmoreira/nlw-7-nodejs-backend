import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { code } = request.body
    if (!code)
      return response.status(404).json({ erro: "Código não informado" })
    try {
      const service = new AuthenticateUserService()
      const result = await service.execute(code)
      return response.json(result)
    } catch (e) {
      response.json({ error: e.message })
    }
  }
}

export { AuthenticateUserController }
