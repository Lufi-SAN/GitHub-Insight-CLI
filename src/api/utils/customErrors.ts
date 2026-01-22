export default class networkError extends Error {
    constructor(public statusCode: string, public message: string) {
        super(message);
    }
}