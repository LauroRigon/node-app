export type ResponseBody = {
    message: string
    data?: any[]
}

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
}

export default class HttpResponse<BodyType> {
    body?: BodyType
    statusCode: StatusCode

    constructor(code: StatusCode) {
        this.statusCode = code
    }

    static badRequest(message?: string) {
        return new HttpResponse<ResponseBody>(StatusCode.BAD_REQUEST)
            .setBody({
                message: message ?? 'Bad request',
            })
    }

    static unautorized() {
        return new HttpResponse<ResponseBody>(StatusCode.UNAUTHORIZED)
    }

    static success() {
        return new HttpResponse<ResponseBody>(StatusCode.OK)
    }

    setBody(body: BodyType) {
        this.body = body

        return this
    }
}