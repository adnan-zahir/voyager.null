import { Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import fs from "fs";
import path from "path";
require("dotenv").config();

const commands: any = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts"));

commandFiles.forEach((file) => {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
});

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID!,
      process.env.GUILD_ID!
    ),
    {
      body: commands,
    }
  )
  .then(() => console.log("Sucsessfully registered commands!"))
  .catch(console.error);
