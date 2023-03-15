import { EttyEvents } from "../type";
import { Events, Interaction} from 'discord.js';

const event : EttyEvents = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        if(!interaction.isChatInputCommand()) return;

        const command = interaction.client.slashCommands.get(interaction.commandName);

        if(!command) return;

        await command.execute(interaction);
    }
}

export default event;