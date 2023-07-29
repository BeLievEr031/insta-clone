import { INext, IRequest, IResponse } from "../types"

const AsyncHandler = (reqHandler: any) => {
    return (req: IRequest, res: IResponse, next: INext) => {
        Promise.resolve(reqHandler(req, res, next)).catch((error: any) => next(error))
    }
}

export default AsyncHandler;