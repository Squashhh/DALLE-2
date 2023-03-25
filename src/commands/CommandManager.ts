import { Collection } from "discord.js";
import { readdirSync } from "fs";
import Command from "$core/commands/Command";
import Client from "$core/Client";
import Logger from "$core/utils/Logger";
import "dotenv/config";

export default class CommandManager {

  public readonly commands: Collection<string, Command> = new Collection();

  constructor() {
    this.load().then(() => this.listener());
  }

  private async load() : Promise<void> {
    const files = readdirSync(`${__dirname}/list`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    let i = 0;
    for (const file of files) {
      const dynamicImport = await import(`./list/${file}`);

      const command: Command = new dynamicImport.default();
      this.commands.set(command.name, command);
      i++;
    }

    Logger.info(`${i} commands loaded`);
  }

  private async listener() : Promise<void> {
    Client.instance.on("interactionCreate", async interaction => {
      if (!interaction.isChatInputCommand()) return;
      const command = this.commands.get(interaction.commandName);

      if (command) command.execute(interaction);
    });
  }

  /**
    * Register the slash commands (use it when the client is ready)
  */
  public async register() : Promise<void> {
    for (const command of this.commands.values()) {
      this.commands.map(command => command.slashCommand.toJSON());

      if (command.guildOnly) await Client.instance.guilds.cache.get(process.env.SUPPORT_GUILD_ID ?? "")?.commands.create(command.slashCommand);
      else await Client.instance.application?.commands.create(command.slashCommand);
    }

    Logger.info("Successfully registered application (/) commands");
  }

}