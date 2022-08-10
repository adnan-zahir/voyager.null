// - New Member
// client.on('guildMemberAdd', async (member) => {
//   console.log(`${member.user.tag} has joined the server!`);
//   const embed = new EmbedBuilder()
//     .setTitle('Welcome to SCTR51')
//     .setColor('#321cba')
//     .setImage(
//       'https://i.postimg.cc/c4QxL1KK/d289d34ff2e1cddc23293d5ce3164342.jpg'
//     )
//     .setDescription(
//       `Hello @${member.user.username}

// I am SCTR51 Helper Bot, pleasure to meet you. Welcome to SCTR51!

// Feel free to explore. If you are new on discord, please read the messages at #rules and you can always ask for help from the Moderators in this server. And if you're experiencing inconvenience in this server, please immediately report it to one of the mods as well.

// I hope you enjoy your stay in SCTR51!

// There are currently ${member.guild?.memberCount} member including you.`
//     );

//   await member.user.send({ embeds: [embed] });
// });

import Discord, { EmbedBuilder } from 'discord.js';
import sendEmbed from '../functions/sendEmbed';

module.exports = {
  name: 'guildMemberAdd',
  async execute(member: Discord.GuildMember) {
    await sendEmbed(member);
  },
};
