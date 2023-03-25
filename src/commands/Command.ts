import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export default abstract class Command {

    public abstract readonly slashCommand: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;

    /**
     * Whether the command can only be used in the Support Guild
     * @type {boolean}
     * @readonly
     * @default false
     */
    public abstract guildOnly: boolean;

    get name(): string {
      return this.slashCommand.name;
    }

    get description(): string {
      return this.slashCommand.description;
    }

    public abstract execute(command: ChatInputCommandInteraction): Promise<void>;

}