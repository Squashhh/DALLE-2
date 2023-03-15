import { Collection, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_ID: string,
            TOKEN: string
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommands>
    }
}

export interface EttyEvents {
    name: string,
    once?: boolean | false,
    execute:(...args) => void
}

export interface SlashCommands{
    name: string,
    data: SlashCommandBuilder | any,
    execute: (interaction : CommandInteraction) => Promise<void>
}

export{}