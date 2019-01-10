import { Repository, DeepPartial } from "typeorm"
import * as faker from "faker"

export const makeSeed = async <RepT extends Repository<EnT>, EnT>(rep: RepT, count: number, func: (faker: Faker.FakerStatic, ) => Promise<DeepPartial<EnT>> ) => {
    while (count > 0) {
        console.log(count)
        count--
        let item = await func(faker)
        await rep.save(item)
    }
}