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