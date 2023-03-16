import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommands } from "../type";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI,
});

export const command: SlashCommands = {
    name : 'imagine',
    data : new SlashCommandBuilder().setName(`imagine`).setDescription(`Generate an image with DallE !`).setDMPermission(false)
    .addStringOption(option =>
	    option.setName('desc')
		.setDescription('What is the image you want to generate ?')
        .setRequired(true)),

    execute : async(command: ChatInputCommandInteraction) => {

        const input = command.options.getString('desc');
            console.log('🟥 Request sent : ' + input);
            await command.deferReply(); 
        const openai = new OpenAIApi(configuration);

        try {
            const response = await openai.createImage({
                prompt: input,
                n: 1,
                size: "1024x1024",
            });
            const embed3 = new EmbedBuilder()
            	    .setTitle('Dall·E - Image Generation Tool')
           	        .setDescription("🤖 You have requested ``" + input + "``.")
          	        .setColor('#23272a')
          	        .setURL('https://openai.com/product/dall-e-2')
          	        .setImage(response.data.data[0].url)
           	        .setTimestamp();
            await command.editReply({ embeds: [embed3]}) 
        } catch (error) {
            if (error.response) {
                const embed3 = new EmbedBuilder()
                    .setTitle('Dall·E - Image Generation Tool')
                    .setDescription("⛔ **An error has occurred.**")
                    .setColor('#ED4245')
                    .setURL('https://openai.com/product/dall-e-2')
                    .setTimestamp();
                await command.editReply({ embeds: [embed3]}) 
            }
        }
    }
}
    

