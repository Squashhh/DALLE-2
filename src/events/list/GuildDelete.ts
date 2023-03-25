import Event from "$core/events/Event";
import Logger from "$core/utils/Logger";
import Client from "$core/Client";
import { Guild, WebhookClient } from "discord.js";
import { EmbedBuilder } from "@discordjs/builders";
import "dotenv/config";
import axios from 'axios';

export default class onInvited extends Event {

  constructor() {
    super("guildDelete", false);
  }

  public async execute(guild: Guild): Promise<void> {
    Logger.info(`❌ Removed ${guild.name}`);

    const webhookUrl: string | undefined = process.env.WEBHOOK_URL;
    if(webhookUrl){
      const webhookClient = new WebhookClient({ url: webhookUrl });
    
      const embed = new EmbedBuilder()
      .setDescription("``❌`` **Dall·E** has been removed from **" + guild.name + '** (' + guild.memberCount + ' members)')
      .setFooter({ text: guild.id + ' | Now ' + Client.instance.guilds.cache.size})
      .setColor(0xED4245)
      .setTimestamp();
      await axios.post(webhookClient.url, {
        embeds: [embed.toJSON()],
      });
    
    webhookClient.destroy();
    }
  }

}