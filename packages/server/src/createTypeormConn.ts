import { createConnection } from "typeorm"
import * as conf from "config"

export const createTypeormConn = async () => {
  let retries = 5
  while (retries) {
    try {
      const config = conf.get('db')
      return createConnection({
        ...config,
        name: "default"
      } as any)
    } catch (err) {
      console.error(err)
      retries--
      console.log(`retries left: ${retries}`)
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000))
    }
  }

  return null
};