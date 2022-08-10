import { EmbedBuilder } from 'discord.js';
require('dotenv').config();

module.exports = {
  name: 'interactionCreate',
  async execute(interaction: any, afks: string[]) {
    // check if the interaction is a select menu
    if (interaction.isSelectMenu()) {
      if (interaction.customId === 'checkgame') {
        try {
          const gameName = interaction.values[0];
          const { guild } = interaction;
          const { members, memberCount } = guild;
          // GET ALL MEMBER PLAYING THE GAME
          await members.fetch();
          const gameMembers = members.cache
            .filter((member: any) => member.presence !== null)
            .filter(({ presence }: any) => presence.activities.length > 0)
            .filter(
              ({ presence }: any) => presence.activities[0].name === gameName
            );
          const gameMembersName = gameMembers.map(
            (member: any) => member.nickname || member.user.username
          );
          const gameMembersCount = gameMembersName.length;
          console.log([...gameMembersName]);
          console.log(`Total : ${gameMembersCount}`);
          const embed = new EmbedBuilder()
            .setTitle(
              `${gameName} is being played by ${gameMembersCount} out of ${memberCount} members.`
            )
            .setDescription(`${gameMembersName.join(', ')}`)
            .setColor('#0099ff');
          console.log(`Checking game: ${gameName}`);
          await interaction.update({ embeds: [embed] });
        } catch (error) {
          console.error(error);
        }
      }
    }

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
