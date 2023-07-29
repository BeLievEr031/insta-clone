import { INext, IRequest, IResponse } from "../types";
import ApiError from "../utils/ApiError";
import { validateRegisterUser } from "../validations";

class AuthController {
    async register(req: IRequest, res: IResponse, next: INext) {
        const { error, value } = validateRegisterUser(req.body);
        if (error) return next(new ApiError(422, error.message))
        
    }

    async login(req: IRequest, res: IResponse, next: INext) {

    }
}

export default new AuthController();