import { createConnection } from "typeorm";
import conf from "config";

export const createTypeormConn = async () => {
  let retries = 5;
  while (retries) {
    try {
      const config = conf.db;
      return createConnection({
        ...config,
        name: "default"
      });
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  return null;
};