import { Request } from "express"
import * as DataLoader from "dataloader"

import { User } from "../entity/User"

export interface MyContext {
  req: Request,
  userId: string,
  lang: { default: string, available: [string] }
  userLoader: DataLoader<string, User>
}