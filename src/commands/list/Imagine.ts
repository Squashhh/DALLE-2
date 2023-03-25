import Command from "$core/commands/Command";
import { ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, WebhookClient } from "discord.js";
import { simpleEmbed } from "$core/utils/Embed";
import { simpleButton } from "$core/utils/Button";
import { Prisma } from "$core/utils/Prisma";
import { Openai } from "$core/utils/Openai";
import { EmbedBuilder } from "@discordjs/builders";

export default class Ask extends Command {

  public readonly guildOnly = false;

  public readonly slashCommand = new SlashCommandBuilder()
  .setName(`imagine`)
  .setDescription(`Generate an image with DallE !`)
  .setDMPermission(false)
  .addStringOption(option =>
    option.setName('desc')
  .setDescription('What is the image you want to generate ?')
      .setRequired(true))

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    const input = command.options.getString('desc');
            console.log('🟥 Request sent : ' + input + " !");
        await command.deferReply(); 


            //In the process of connecting with the api
            const user = await Prisma.user.findUnique({ where: { id: command.user.id } });
            if (user) {
                if(user.uses == 0) {
                    //The member to use his dayly limit
                    const buton = simpleButton("You have exhausted your requests for the month.", "limit", ButtonStyle.Danger, true)
                    const row = new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(buton) 
                    const embed = simpleEmbed("⛔ **You have exceeded your monthly limit !**", "", "error");
                    await command.editReply({ embeds: [embed], components: [row]})
                } else {  

                  try {
                    //The request was successfully completed
                    if (input !== null) {
                      
                      const response = await Openai.createImage({prompt: input, n: 1, size: "1024x1024"});              
                      const url = response.data.data[0].url ?? "https://example.com/default-image.jpg";
                      const embed = simpleEmbed("🤖 You have requested ``" + input + "``.", url, "normal");
                      const button = simpleButton(user.uses - 1 + "/25 uses remaining this month.", "limit", ButtonStyle.Secondary, true)
                      const row = new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(button)
                      await Prisma.user.update({ where: { id: command.user.id }, data: { uses: user.uses - 1 }});
                      await command.editReply({ embeds: [embed], components: [row]}) 
                    }
                  } catch (error) {
                    
                        const embed3 = new EmbedBuilder()
                            .setTitle('Dall·E - Image Generation Tool')
                            .setDescription("⛔ **An error has occurred.**")
                            .setColor(0xED4245)
                            .setURL('https://openai.com/product/dall-e-2')
                            .setTimestamp();
                        await command.editReply({ embeds: [embed3]}) 
                  }  
                }
            } else {
                //The data of the member is initialized
                try {
                if (input !== null) {
                  const response = await Openai.createImage({prompt: input, n: 1, size: "1024x1024",});
                  const url = response.data.data[0].url ?? "https://example.com/default-image.jpg";
                  const embed = simpleEmbed("🤖 You have requested ``" + input + "``.", url, "normal");
                  const button = simpleButton("24/25 uses remaining this month.", "limit", ButtonStyle.Secondary, true)
                  const row = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(button)
                  await Prisma.user.create({data: { id: command.user.id, uses: 24 }})
                  await command.editReply({ embeds: [embed], components: [row]}) 
                }

                } catch (error) {
                    
                  const embed3 = new EmbedBuilder()
                      .setTitle('Dall·E - Image Generation Tool')
                      .setDescription("⛔ **An error has occurred.**")
                      .setColor(0xED4245)
                      .setURL('https://openai.com/product/dall-e-2')
                      .setTimestamp();
                  await command.editReply({ embeds: [embed3]}) 
            } 
                }
            }
        }
        
          

