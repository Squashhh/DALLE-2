import { Client, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommands } from "../type";

module.exports = async (client: Client) => {

    let slashCommandsDir = join(__dirname, '../commands');
    const body = [];

    readdirSync(slashCommandsDir).forEach(file => {
        if(!file.endsWith(`.js`)) return;
        
        const command : SlashCommands =  require(`${slashCommandsDir}/${file}`).command;
        body.push(command.data.toJSON());
        client.slashCommands.set(command.name, command);
    });

    const rest = new REST({version: `10`}).setToken(process.env.TOKEN);

    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: body });
        console.log('✨ SlashCommands has been reloaded');
    } catch (error) {
        console.error(error);
    }
}
