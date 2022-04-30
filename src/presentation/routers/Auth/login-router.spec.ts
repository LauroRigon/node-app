import { StatusCode } from "../../HttpResponse/HttpResponse"
import HttpRequest from "../../HttpRequest/HttpRequest"
import { LoginBody, LoginRouter } from "./login-router"

describe('Login router', () => {
    test('Should return 400 if no email is provided', () => {
        const loginRouter = new LoginRouter()
        const httpRequest = new HttpRequest<LoginBody>({
            password: '123456',
        })

        const httpResponse = loginRouter.route(httpRequest)
        expect(httpResponse.statusCode).toBe(StatusCode.BAD_REQUEST)
    })
})

describe('Login router', () => {
    test('Should return 400 if no password is provided', () => {
        const loginRouter = new LoginRouter()
        const httpRequest = new HttpRequest({
            email: 'test@gmail.com',
        })

        const httpResponse = loginRouter.route(httpRequest)
        expect(httpResponse.statusCode).toBe(StatusCode.BAD_REQUEST)
    })
})