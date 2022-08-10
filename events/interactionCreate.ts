import sendEmbed from '../functions/sendEmbed';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { AttachmentBuilder, EmbedBuilder } from 'discord.js';
require('dotenv').config();
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: 'interactionCreate',
  async execute(interaction: any, afks: string[]) {
    // check if the interaction is a message
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, afks);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'An error occured while executing the command.',
        ephemeral: true,
      });
    }
  },
};
