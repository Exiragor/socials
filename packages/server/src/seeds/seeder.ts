import { Repository, DeepPartial } from "typeorm"
import * as faker from "faker"

export const makeSeed = async <RepT extends Repository<EnT>, EnT>(rep: RepT, count: number, func: (faker: Faker.FakerStatic, item: EnT) => Promise<DeepPartial<EnT>> ) => {
    while (count > 0) {
        let item = await rep.create()
        count--
        let fillItem = await func(faker, item)
        await rep.save(fillItem)
    }
}