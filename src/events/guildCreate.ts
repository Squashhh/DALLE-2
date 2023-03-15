import { EttyEvents } from "../type";
import { Events, Guild, WebhookClient, EmbedBuilder, ActivityType } from 'discord.js';
import { client } from '../index';
import axios from 'axios';

const event: EttyEvents = {
  name: Events.GuildCreate,
  once: false,
  async execute(guild: Guild) {
    console.log(`✅ Added ${guild.name}`);

    const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_URL});
    const embed = new EmbedBuilder()
      .setDescription("``✅`` **Dall·E** has been added from **" + guild.name + '** (' + guild.memberCount + ' members)')
      .setFooter({ text: guild.id + ' | Now ' + client.guilds.cache.size})
      .setColor('#57F287')
      .setTimestamp();
      await axios.post(webhookClient.url, {
        embeds: [embed.toJSON()],
      });

    webhookClient.destroy();

    client.user.setPresence({
      activities: [{ name: client.guilds.cache.size.toString() + " servers...", type: ActivityType.Watching }],
  })
  }
};

export default event;
