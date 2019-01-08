import { PaginationResult } from "../types/PaginationResult";
import { Repository } from "typeorm";

export const getPaginationResult = async <RepT extends Repository<EnT>, EnT>(rep: RepT, page: number, count: number): Promise<PaginationResult<EnT>> => {
    page--;

    const result = new PaginationResult<EnT>()
    const totalCount = await rep.count()
    const totalPages = Math.ceil(totalCount / count)
    const items = await rep.find({ skip: page, take: count })

    result.data = items
    result.currentPage = page
    result.totalCount = totalCount
    result.totalPages = totalPages

    return result
}