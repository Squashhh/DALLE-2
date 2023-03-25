import { Client as DiscordClient, GatewayIntentBits, Partials, WebhookClient } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import Logger from "$core/utils/Logger";
import CommandManager from "$core/commands/CommandManager";
import EventManager from "$core/events/EventManager";
import TaskManager from "$core/tasks/TaskManager";
import "dotenv/config";


export default class Client extends DiscordClient {

  public static instance: Client;
  public readonly openai: OpenAIApi;
  public readonly eventManager: EventManager;
  public readonly commandManager: CommandManager;
  public readonly taskManager: TaskManager;
  public readonly webhook: WebhookClient | null;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
         GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildIntegrations, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildPresences
      ],
      partials: [
        Partials.Message, 
        Partials.Channel, 
        Partials.Reaction
      ]
    });

    Client.instance = this;
    this.login(process.env.TOKEN);

    this.openai = new OpenAIApi(new Configuration({
      apiKey: process.env.OPEN_AI
    }));

    if (!process.env.WEBHOOK_URL) {
      Logger.error("WEBHOOK_URL not found in .env file");
      this.webhook = null;
    } else {
      this.webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });
      if (this.webhook) Logger.success("Webhook initialized");
      else Logger.error("Webhook not initialized");
    }


    this.eventManager = new EventManager();
    this.commandManager = new CommandManager();
    this.taskManager = new TaskManager();

    this.on("ready", () => {
      Logger.where("Actually in " + this.guilds.cache.size + " guilds for a total of " + this.users.cache.size + " users");
    });
  }

}

Logger.info("The client is being initialized...");
new Client();