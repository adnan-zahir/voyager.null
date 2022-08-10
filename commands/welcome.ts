import { SlashCommandBuilder } from 'discord.js';
import sendEmbed from '../functions/sendEmbed';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('Send you a welcome message (for testing)'),
  async execute(interaction: any) {
    await sendEmbed(interaction);
    await interaction.reply('Sent!');
  },
};
