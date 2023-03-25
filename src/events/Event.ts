import { ClientEvents } from "discord.js";

export default abstract class Event {

  protected constructor(public readonly name: keyof ClientEvents, public once: boolean = false) {}

  public abstract execute(...args: unknown[]): Promise<void>;

}