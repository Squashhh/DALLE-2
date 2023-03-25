import { readdirSync } from "fs";
import Logger from "$core/utils/Logger";

export default class TaskManager {

  public async load() : Promise<void> {
    const files = readdirSync(`${__dirname}/list`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    let i = 0;
    for (const file of files) {
      const dynamicImport = await import(`./list/${file}`);
      Logger.info(`Loading task ${dynamicImport.default.name}`);

      new dynamicImport.default();
      i++;
    }

    Logger.info(`${i} tasks loaded`);
  }

}