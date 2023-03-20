import { EmbedBuilder } from "discord.js";

type EmbedType = "normal" | "error";

type Colors = {
  [key in EmbedType]: number;
};

const colors: Colors = {
  normal: 0x23272a,
  error: 0xed4245,
};

export function simpleEmbed (
    desc: string,
    image,
    type: EmbedType = "normal",
) : EmbedBuilder {
  const embed = new EmbedBuilder().setColor(colors[type]);
    embed.setTitle("Dall·E - Image Generation Tool");
    embed.setURL("https://openai.com/product/dall-e-2");
  if (desc) embed.setDescription(desc);
  if(image) embed.setImage(image)
  embed.setTimestamp();
  return embed;

//This function was taken and edited from : https://github.com/Steellgold/GPT 
}