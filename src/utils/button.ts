import { ButtonBuilder, ButtonStyle } from "discord.js";

export function simpleButton (
    label: string,
    id: string,
    style: ButtonStyle,
    isdisable: boolean,
) : ButtonBuilder {
    const button = new ButtonBuilder()
        button.setLabel(label)
        button.setCustomId(id)
        button.setStyle(style)
        if(isdisable) button.setDisabled()
    return button;
}

export function lovedButton (
    emoji: string,
    id: string,
    style: ButtonStyle,
    isdisable: boolean,
) : ButtonBuilder {
    const Button = new ButtonBuilder()
    Button.setEmoji(emoji)
        Button.setCustomId(id)
        Button.setStyle(style)
        if(isdisable) Button.setDisabled()
    return Button;
}