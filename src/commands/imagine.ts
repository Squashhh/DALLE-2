import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommands } from "../type";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI,
});

export const command: SlashCommands = {
    name : 'imagine',
    data : new SlashCommandBuilder().setName(`imagine`).setDescription(`Generate an image with DallE !`)
    .addStringOption(option =>
	    option.setName('desc')
		.setDescription('What is the image you want to generate ?')
        .setRequired(true)),

        execute : async(command: ChatInputCommandInteraction) => {

            await command.deferReply();
            
            const input = command.options.getString('desc');

            const row = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Get Variant')
					.setStyle(ButtonStyle.Success)
			)

            const openai = new OpenAIApi(configuration);const response = await openai.createImage({
                prompt: input,
                n: 1,
                size: "1024x1024",
            });
            const image_url = response.data.data[0].url; 
            
            const embed = new EmbedBuilder()
            .setTitle('Dall·E - Image Generation Tool')
            .setDescription("🤖 You have requested ``" + input + "``.")
            .setColor('#23272a')
            .setURL('https://openai.com/product/dall-e-2')
            .setImage(image_url)
            .setTimestamp();

            await command.editReply({ embeds: [embed], components: [row]}) 
        }
}