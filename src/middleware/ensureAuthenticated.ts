import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authToken = request.headers.authorization

  if (!authToken) {
    response.status(401).json({ errorCode: "token.invalid" })
  }

  // Bearer 3123213213213123213213
  // [0] Bearer
  // [1] 3123213213213123213213

  const [, token] = authToken.split(" ")

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload
    request.user_id = sub
    return next()
  } catch (e) {
    return response.status(401).json({ errorCode: "token.expired" })
  }
}

export { ensureAuthenticated }
