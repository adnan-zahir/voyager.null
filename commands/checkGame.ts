import {
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
} from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checkgame')
    .setDescription('Check how many memeber playing certain game'),
  async execute(interaction: any) {
    // const game = interaction.options.get('game');
    // const { value: gameName } = game;
    const { guild } = interaction;
    const { members, memberCount, presences } = guild;
    try {
      // GET ALL ACTIVITIES
      await guild.fetch();
      const dupeGameList = presences.cache
        .filter(({ activities }: any) => activities.length > 0)
        .map(({ activities }: any) => activities[0].name)
        .filter(
          (game: string) =>
            !game.includes('Custom Status') && !game.includes('help')
        );
      const gameListSet = [...new Set(dupeGameList)];
      const gameList = Array.from(gameListSet);
      console.log('Game List: ', gameList);

      // SEND GAME LIST
      const options = gameList.map((game: any) => {
        return {
          label: game,
          value: game,
        };
      });
      const row = new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId('checkgame')
          .setPlaceholder('Select game')
          .addOptions(options)
      );
      await interaction.reply({ components: [row] });

      // GET ALL MEMBER PLAYING THE GAME
      // await members.fetch();
      // const gameMembers = members.cache
      //   .filter((member: any) => member.presence !== null)
      //   .filter(({ presence }: any) => presence.activities.length > 0)
      //   .filter(
      //     ({ presence }: any) => presence.activities[0].name === gameName
      //   );
      // const gameMembersName = gameMembers.map(
      //   (member: any) => member.nickname || member.user.username
      // );
      // const gameMembersCount = gameMembersName.length;
      // console.log([...gameMembersName]);
      // console.log(`Total : ${gameMembersCount}`);
      // const embed = new EmbedBuilder()
      //   .setTitle(
      //     `${gameName} is being played by ${gameMembersCount} out of ${memberCount} members.`
      //   )
      //   .setDescription(`${gameMembersName.join(', ')}`)
      //   .setColor('#0099ff');
      // console.log(`Checking game: ${gameName}`);
      // await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
    }
  },
};
