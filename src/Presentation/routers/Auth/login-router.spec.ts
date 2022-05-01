import { StatusCode } from "../../HttpResponse/HttpResponse"
import HttpRequest from "../../HttpRequest/HttpRequest"
import { LoginBody, LoginRouter } from "./login-router"
import InvalidCredentialsError from "../../../UseCases/Auth/Errors/InvalidCredentialsError"
import AuthUseCaseInterface from "../../../UseCases/Auth/AuthUseCaseInterface"

class AuthUseCaseSpy implements AuthUseCaseInterface {
    email?: string
    password?: string

    auth(email: string, password: string): void {
        this.email = email
        this.password = password

        const validEmail = 'valid@mail.com'
        const validPassword = 'password_valid'

        if (email != validEmail || password != validPassword) {
            throw new InvalidCredentialsError('Email or password invalid')
        }
    }
}

type MakeSutReturn = {
    authUseCase: AuthUseCaseSpy,
    loginRouter: LoginRouter
}

const makeSut = (): MakeSutReturn => {

    const authUseCase = new AuthUseCaseSpy()
    const loginRouter = new LoginRouter(authUseCase)
    return {
        authUseCase,
        loginRouter
    }
}

describe('Login router', () => {
    test('Should return 400 if no email is provided', () => {
        const { loginRouter } = makeSut()
        const request = new HttpRequest<LoginBody>({
            password: '123456',
        })

        const response = loginRouter.route(request)
        expect(response.statusCode).toBe(StatusCode.BAD_REQUEST)
    })

    test('Should return 400 if no password is provided', () => {
        const { loginRouter } = makeSut()
        const request = new HttpRequest<LoginBody>({
            email: 'test@gmail.com',
        })

        const response = loginRouter.route(request)
        expect(response.statusCode).toBe(StatusCode.BAD_REQUEST)
    })

    test('Should call AuthUseCase with correct params', () => {
        const { loginRouter, authUseCase } = makeSut()
        const request = new HttpRequest<LoginBody>({
            email: 'email@mail.com',
            password: 'password'
        })

        loginRouter.route(request)
        expect(authUseCase.email).toBe(request.body.email)
        expect(authUseCase.password).toBe(request.body.password)
    })

    test('Should return 401 when invalid credentials are provided', () => {
        const { loginRouter } = makeSut()
        const request = new HttpRequest<LoginBody>({
            email: 'test@gmail.com',
            password: 'invalid_password'
        })

        const response = loginRouter.route(request)
        expect(response.statusCode).toBe(401)
    })

    test('Should return 200 when valid credentials are provided', () => {
        const { loginRouter } = makeSut()
        const request = new HttpRequest<LoginBody>({
            email: 'valid@mail.com',
            password: 'password_valid'
        })

        const response = loginRouter.route(request)
        expect(response.statusCode).toBe(200)
    })
})