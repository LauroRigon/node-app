export default class HttpRequest<BodyType> {
    body: BodyType

    constructor(body: BodyType) {
        this.body = body
    }
}