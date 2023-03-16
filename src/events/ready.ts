import { DalleEvents } from "../type";
import { Events, Client, ActivityType} from 'discord.js';

const event : DalleEvents = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        client.user.setPresence({
            activities: [{ name: client.guilds.cache.size.toString() + " server(s)...", type: ActivityType.Watching }],
        });
        console.log(`✅ ${client.user.tag} ready to use`)
    }
}

export default event;