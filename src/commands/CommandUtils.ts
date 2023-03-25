import Client from "$core/Client";

export function getCommandId(command: string): string {
  return Client.instance.application?.commands.cache.find(c => c.name === command)?.id ?? "";
}