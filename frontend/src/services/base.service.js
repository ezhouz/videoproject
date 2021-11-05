export class BaseService {
    #authToken;

    constructor() {
        this.setAuthToken(localStorage.getItem("chabadtoken"));
    }

    setAuthToken(token) {
        this.#authToken = token;
    }

    getHeaders() {
        if (this.#authToken) {
            return {
                Authorization: 'Bearer ' + this.#authToken
            };
        } else {
            return {};
        }
    }
}
