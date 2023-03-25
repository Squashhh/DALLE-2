import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import Event from "$core/events/Event";
import Client from "$core/Client";
import Logger from "$core/utils/Logger";

export default class EventManager {

  private listeners = 0;

  constructor() {
    this.load();
  }

  private async load(): Promise<void> {
    const directories = readdirSync(__dirname).filter((dir) => lstatSync(join(__dirname, dir)).isDirectory());
    for (const directory of directories) {
      const files = readdirSync(join(__dirname, directory)).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
      for (const file of files) {
        const dynamicImport = await import(`./${directory}/${file}`);
        const event: Event = new dynamicImport.default();

        Client.instance[event.once ? "once" : "on"](event.name, (...args) => event.execute(...args));
        this.listeners++;
      }
    }

    Logger.info(`${this.listeners} listener${this.listeners > 1 ? "s" : ""} loaded`);
  }

}