class HttpRequest<BodyType> {
    body: BodyType

    constructor(body: BodyType) {
        this.body = body
    }
}

enum StatusCode {
    OK = 100,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
}

class HttpResponse<BodyType> {
    body?: BodyType
    statusCode: StatusCode

    constructor(code: StatusCode) {
        this.statusCode = code
    }

    static badRequest(message?: string) {
        return new HttpResponse<ResponseBody>(StatusCode.BAD_REQUEST)
            .setBody({
                message: message ?? 'Bad request',
                data: []
            })
    }

    static success() {
        return new HttpResponse<ResponseBody>(StatusCode.OK)
    }

    setBody(body: BodyType) {
        this.body = body

        return this
    }
}

type LoginBody = {
    email?: string,
    password?: string,
}

type ResponseBody = {
    message: string
    data: any[]
}

class LoginRouter {
    route(request: HttpRequest<LoginBody>): HttpResponse<ResponseBody> {
        const { email, password } = request.body
        if (!email || !password) {
            return HttpResponse.badRequest('Email and password are required')
        }

        return HttpResponse.success()
    }
}

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