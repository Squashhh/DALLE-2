import { DalleEvents } from "../type";
import { Events, Client, ActivityType} from 'discord.js';
import { client } from '../index';
import { formatNumbers } from '../utils/numbers';

const event : DalleEvents = {
    name: Events.ClientReady,
    once: true,
    
    execute(Client : Client) {

        let userCount = 0;
    
        client.guilds.cache.forEach((guild) => {
          userCount += guild.memberCount;
        });

        Client.user.setPresence({
            activities: [{ name: Client.guilds.cache.size.toString() + " servers | " + formatNumbers(userCount) + " users", type: ActivityType.Watching }],
        });
        console.log(`✅ ${Client.user.tag} ready to use`)
    }
}

export default event;