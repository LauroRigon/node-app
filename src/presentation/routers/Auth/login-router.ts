import HttpRequest from "../../HttpRequest/HttpRequest"
import HttpResponse, { ResponseBody } from "../../HttpResponse/HttpResponse"


export type LoginBody = {
    email?: string,
    password?: string,
}

export class LoginRouter {
    authUseCase: any

    constructor(authUseCase: any) {
        this.authUseCase = authUseCase
    }

    route(request: HttpRequest<LoginBody>): HttpResponse<ResponseBody> {
        const { email, password } = request.body
        if (!email || !password) {
            return HttpResponse.badRequest('Email and password are required')
        }

        this.authUseCase.auth(email, password)
        return HttpResponse.success()
    }
}