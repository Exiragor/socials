import { PaginationResult } from "../types/PaginationResult";
import { Repository } from "typeorm";

export const getPaginationResult = async <RepT extends Repository<EnT>, EnT, ResT extends PaginationResult<EnT>>
(result: ResT,rep: RepT, page: number, count: number): Promise<ResT> => {
    const skip = page - 1
    const totalCount = await rep.count()
    const totalPages = Math.ceil(totalCount / count)
    const items = await rep.find({ skip, take: count })

    result.data = items
    result.currentPage = page
    result.totalCount = totalCount
    result.totalPages = totalPages

    return result
}