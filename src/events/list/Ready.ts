import Event from "$core/events/Event";
import Logger from "$core/utils/Logger";
import Client from "$core/Client";
import { ActivityType } from "discord.js";

export default class Ready extends Event {

  constructor() {
    super("ready", false);
  }

  public async execute(): Promise<void> {
    Client.instance.commandManager.register();
    Logger.success(`✅ Dall·E#1650 ready to use`)

    Client.instance.user?.setActivity({
      name: "DALLE-2",
      type: ActivityType.Playing
    });

    Client.instance.taskManager.load();
  }

}