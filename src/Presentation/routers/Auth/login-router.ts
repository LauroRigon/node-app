import HttpRequest from "../../HttpRequest/HttpRequest"
import HttpResponse, { ResponseBody } from "../../HttpResponse/HttpResponse"
import AuthUseCaseInterface from "../../../UseCases/Auth/AuthUseCaseInterface";


export type LoginBody = {
    email?: string,
    password?: string,
}

export class LoginRouter {
    authUseCase: any

    constructor(authUseCase: AuthUseCaseInterface) {
        this.authUseCase = authUseCase
    }

    route(request: HttpRequest<LoginBody>): HttpResponse<ResponseBody> {
        const { email, password } = request.body
        if (!email || !password) {
            return HttpResponse.badRequest('Email and password are required')
        }

        try {
            this.authUseCase.auth(email, password)
        } catch (error: unknown) {
            return HttpResponse.unautorized()
        }

        return HttpResponse.success()
    }
}