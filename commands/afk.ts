import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription(
      'Set your status to afk untill you are active again in this server'
    ),
  async execute(interaction: any, afks: string[]) {
    const { user, member, options } = interaction;
    const { username } = user;
    const { nickname } = member;
    const { tag, defaultAvatarURL, id } = user;
    const reason = options.getString('reason');

    // push to akfs array
    if (!afks.includes(id)) afks.push(id);
    console.log(`AFKS : ${afks.map((user) => `${user}\n`)}`);

    try {
      // change username
      // check if user has nickname in guild
      if (!nickname === null) {
        if (!nickname.startsWith('(AFK)')) {
          await member.setNickname(`(AFK) ${nickname}`);
        }
      } else {
        await member.setNickname(`(AFK) ${username}`);
      }

      // send afk confirmation
      const embed = new EmbedBuilder()
        .setTitle(`${nickname === null ? username : nickname} is now AFK!`)
        .setDescription(`${tag}\n${reason !== null ? `Reason: ${reason}` : ''}`)
        .setThumbnail(defaultAvatarURL)
        .setColor('#ff0000');
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  },
};
