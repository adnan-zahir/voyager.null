import { EmbedBuilder } from 'discord.js';

const sendEmbed = async (target: any) => {
  const embed = new EmbedBuilder()
    .setTitle('Welcome to SCTR51')
    .setColor('#321cba')
    .setImage(
      'https://i.postimg.cc/c4QxL1KK/d289d34ff2e1cddc23293d5ce3164342.jpg'
    )
    .setDescription(
      `Hello @${target.user.username}
  
  I am SCTR51 Helper Bot, pleasure to meet you. Welcome to SCTR51!
  
  Feel free to explore. If you are new on discord, please read the messages at #rules and you can always ask for help from the Moderators in this server. And if you're experiencing inconvenience in this server, please immediately report it to one of the mods as well.
  
  I hope you enjoy your stay in SCTR51!
  
  There are currently ${target.guild?.memberCount} member including you.`
    );

  await target.user.send({ embeds: [embed] });
};

export default sendEmbed;
