import { ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder } from "discord.js";
import { SlashCommands } from "../type";
import { simpleEmbed } from '../utils/embed';
import { simpleButton } from '../utils/button';
import { prisma } from '../utils/prisma';
import { openai } from '../utils/openai';

export const command: SlashCommands = {
    name : 'imagine',
    data : new SlashCommandBuilder()
    .setName(`imagine`)
    .setDescription(`Generate an image with DallE !`)
    .setDMPermission(false)
    .addStringOption(option =>
	    option.setName('desc')
		.setDescription('What is the image you want to generate ?')
        .setRequired(true)),
        
    execute : async(command: ChatInputCommandInteraction) => {     

        const input = command.options.getString('desc');
            console.log('🟥 Request sent : ' + input);
            await command.deferReply(); 

        try {
            //In the process of connecting with the api
            const membre = await prisma.membre.findUnique({ where: { id: command.user.id } });
            if (membre) {
                if(membre.uses == 0) {
                    //The member to use his monthly limit
                    const buton = simpleButton("You have exhausted your requests for the month.", "limit", ButtonStyle.Danger, true)
                    const row = new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(buton) 
                    const embed = simpleEmbed("⛔ **You have exceeded your monthly limit !**", "", "error");
                    await command.editReply({ embeds: [embed], components: [row]})
                } else {  
                    //The request was successfully completed
                    const response = await openai.createImage({prompt: input, n: 1, size: "1024x1024",});
                    const embed = simpleEmbed("🤖 You have requested ``" + input + "``.", response.data.data[0].url, "normal");
                    const buton = simpleButton(membre.uses - 1 + "/25 uses remaining this month.", "limit", ButtonStyle.Secondary, true)
                    const row = new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(buton) 
                    await prisma.membre.update({ where: { id: command.user.id }, data: { uses: membre.uses - 1 }});
                    await command.editReply({ embeds: [embed], components: [row]}) 
                }
            } else {
                //The data of the member is initialized
                const response = await openai.createImage({prompt: input, n: 1, size: "1024x1024",});
                const embed = simpleEmbed("🤖 You have requested ``" + input + "``.", response.data.data[0].url, "normal");
                const buton = simpleButton("24/25 uses remaining this month.", "limit", ButtonStyle.Secondary, true)
                const row = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(buton) 
                await prisma.membre.create({ data: { id: command.user.id, uses: 24 }});    
                await command.editReply({ embeds: [embed], components: [row]}) 
            }
        } catch (error) {
            //The request to the api failed !
            if (error.response) {
                const embed = simpleEmbed("⛔ **An error has occurred.**", "", "error");
                await command.editReply({ embeds: [embed]}) 
            }
        }
    }
}
