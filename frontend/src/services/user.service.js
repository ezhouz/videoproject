import axios from "axios";
import {BaseService} from "./base.service";

class UserService extends BaseService {
    static USER_CHECK_TOKEN_URI = `api/post/validatetoken`;
    static USER_INFO_URI = 'api/get/getuser';

    #user;

    async getCurrentUser() {
        try {
            const existingUser = await axios.post(
                UserService.USER_CHECK_TOKEN_URI,
                {},
                {
                    headers: this.getHeaders()
                }
            );
            if (existingUser.data.status === 200) {
                // get logged in user info
                try {
                    const curentUser = await axios.get(
                        UserService.USER_INFO_URI,
                        {
                            headers: this.getHeaders()
                        }
                    );
                    this.#user = curentUser.data;
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.showError = true;
                this.uploadErrorMessage = "Invalid Token";
            }
        } catch (error) {
            console.log(error);
        }
        return this.#user;
    }

}

export default new UserService();
