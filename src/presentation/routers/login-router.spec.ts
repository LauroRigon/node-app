class HttpRequest {
    body: any

    setBody(body: Object) {
        this.body = body
    }
}

class HttpResponse {
    statusCode: number

    constructor(code: number) {
        this.statusCode = code
    }

    setStatusCode(code: number) {
        this.statusCode = code
    }
}


class LoginRouter {
    route(request: HttpRequest): HttpResponse {
        if (!request.body.email) {
            return new HttpResponse(400)
        }

        return new HttpResponse(200)
    }
}

describe('Login router', () => {
    test('Should return 400 if no email is provided', () => {
        const loginRouter = new LoginRouter()
        const httpRequest = new HttpRequest()
        httpRequest.setBody({
            body: {
                password: '123456',
            },
        })

        const httpResponse = loginRouter.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
})

describe('Login router', () => {
    test('Should return 400 if no password is provided', () => {
        const loginRouter = new LoginRouter()
        const httpRequest = new HttpRequest()
        httpRequest.setBody({
            body: {
                email: 'test@gmail.com',
            },
        })

        const httpResponse = loginRouter.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
})