import { StatusCode } from "../../HttpResponse/HttpResponse"
import HttpRequest from "../../HttpRequest/HttpRequest"
import { LoginBody, LoginRouter } from "./login-router"

class AuthUseCase {
    email?: string
    password?: string

    auth(email: string, password: string) {
        this.email = email
        this.password = password
    }
}

type MakeSutReturn = {
    authUseCase: AuthUseCase,
    loginRouter: LoginRouter
}

const makeSut = (): MakeSutReturn => {

    const authUseCase = new AuthUseCase()
    const loginRouter = new LoginRouter(authUseCase)
    return {
        authUseCase,
        loginRouter
    }
}

describe('Login router', () => {
    test('Should return 400 if no email is provided', () => {
        const { loginRouter } = makeSut()
        const httpRequest = new HttpRequest<LoginBody>({
            password: '123456',
        })

        const httpResponse = loginRouter.route(httpRequest)
        expect(httpResponse.statusCode).toBe(StatusCode.BAD_REQUEST)
    })

    test('Should return 400 if no password is provided', () => {
        const { loginRouter } = makeSut()
        const httpRequest = new HttpRequest<LoginBody>({
            email: 'test@gmail.com',
        })

        const httpResponse = loginRouter.route(httpRequest)
        expect(httpResponse.statusCode).toBe(StatusCode.BAD_REQUEST)
    })

    test('Should call AuthUseCase with correct params', () => {
        const { loginRouter, authUseCase } = makeSut()
        const httpRequest = new HttpRequest<LoginBody>({
            email: 'test@gmail.com',
            password: 'password'
        })

        loginRouter.route(httpRequest)
        expect(authUseCase.email).toBe(httpRequest.body.email)
    })
})