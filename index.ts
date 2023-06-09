// dependencies
// import { Client, GatewayIntentBits as intents, Collection } from 'discord.js';
const { Client, GatewayIntentBits, Collection } = require("discord.js");
import path from "path";
import fs from "fs";
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ],
});

const afks: string[] = [];

// COMMANDS HANDLING
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts"));

commandFiles.forEach((file) => {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
});

// LISTEN TO EVENTS
const eventsPath = path.join(__dirname, "events");
const eventsFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".ts"));

eventsFiles.forEach((file) => {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args: any) => event.execute(...args, afks));
  } else {
    client.on(event.name, (...args: any) => event.execute(...args, afks));
  }
});

// LOGIN BOT
client.login(process.env.TOKEN);

export { afks };
