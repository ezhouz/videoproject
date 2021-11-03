export class BaseService {
    #authToken;

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
