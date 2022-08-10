import { SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pooooong!'),
  async execute(interaction: any) {
    console.log(`${interaction.user.tag} pinged the bot!`);
    await interaction.reply('pooooong!');
  },
};
