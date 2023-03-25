import Task from "$core/tasks/Task";
import Client from "$core/Client";
import { ActivityType } from "discord.js";
import { formatNumbers } from "$core/utils/Numbers";

export default class CheckTrials extends Task {
  private cycleCounter: number = 0;

  constructor() {
    super(5000);
  }

  public run(): void {
    let userCount = 0;
    Client.instance.guilds.cache.forEach((guild) => {
      userCount += guild.memberCount;
    });
    
    // Si le compteur de cycle est pair, définir le statut "Playing"
    if (this.cycleCounter % 2 === 0) {
      Client.instance.user?.setActivity({
        name:
          Client.instance.guilds.cache.size.toString() +
          " servers | " +
          formatNumbers(userCount) +
          " users",
        type: ActivityType.Playing,
      });
    } else { // Sinon, définir le statut "Watching"
      Client.instance.user?.setActivity({
        name: "DALLE-2",
        type: ActivityType.Playing,
      });
    }
    
    // Incrémenter le compteur de cycle
    this.cycleCounter++;
  }
}
