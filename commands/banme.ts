import { SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('banme')
    .setDescription('What else would it do?')
    .addStringOption((option) =>
      option.setName('reason').setDescription('Why dude?')
    ),
  async execute(interaction: any) {
    const { member } = interaction;
    const reason = interaction.options.getString('reason');

    await member.ban({ reason: reason || "I don't know, ask yourself!" });
    await interaction.reply('Enjoy!');
  },
};
