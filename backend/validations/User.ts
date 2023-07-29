import Joi from "joi";
import { IUser } from "../types";
import { GENDER_ENUM } from "../utils/Enums";

const validateRegisterUser = (data: IUser) => {
    const validateSchema = Joi.object<IUser>({
        avatar: Joi.string().default(null),
        name: Joi.string().disallow("").trim().required(),
        email: Joi.string().disallow("").email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        bio: Joi.string().trim().default(null),
        dob: Joi.date().default(null),
        gender: Joi.string().valid(...GENDER_ENUM).default(null),
        password: Joi.string().required().disallow("").min(3)
    })

    return validateSchema.validate(data);
}

export { validateRegisterUser };