class AuthHeader {
    constructor(authCode) {
        this._authCode = authCode;
    }

    handleRequest(req) {
        req.headers['Authorization'] = this._authCode;
        return req;
    }
}

export {
    AuthHeader as default
}
