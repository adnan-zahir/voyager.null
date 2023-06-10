module.exports = {
  name: "messageCreate",
  async execute(message: any, afks: string[]) {
    // FOR DETECTING AFK
    if (afks.length >= 0) {
      const { mentions } = message;
      const { members } = mentions;
      if (!members) return;

      // check if any afk members get mentioned
      for (const user of afks) {
        if (members.has(user)) {
          let nickname = members.get(user).nickname;
          if (nickname.startsWith("(AFK)")) {
            nickname = nickname.slice(5);
          }
          message.reply(`${members.get(user).nickname} is AFK!`);
        }
      }

      // check if the message is from an afk member
      const { member } = message;
      const { id, nickname } = member;
      if (!id || !nickname) return;
      if (afks.includes(id)) {
        // remove "(AFK)" from the nickname
        if (nickname.startsWith("(AFK)")) {
          const newNickname = nickname.slice(5);
          await member.setNickname(newNickname);
        }
        afks.splice(afks.indexOf(id), 1);
        console.log(`AFKS : ${afks.map((user) => user)}`);
      }
    }

    // FOR COPY PASTE MESSAGE TO FORUM
    // Check if the message was sent in the right channel
    if (message.channel.id == "1116699949179084850") {
      // hidden-channel
      const { guild, embeds } = message;
      const forumId = "1116701409006604318"; // Manga forum
      const forum = guild.channels.cache.get(forumId);
      const postsId = Array.from(forum.threads.cache.keys());

      // Only proceed if the message author is a bot
      if (!message.author.bot) {
        // console.log("Author is human.");
        return;
      }

      for (const postId of postsId) {
        const post = guild.channels.cache.get(postId);

        if (!post) return;
        if (!embeds) return;
        if (!post.name || !embeds[0].title) return;

        // Check the matching title/name
        if (post.name == embeds[0].title) {
          post.send({ embeds: [embeds[0]] });
        }
      }
    }

    // Member verifiaction automation using reaction
    const introChannelId = "1116275978897985589";
    if (message.channel.id == introChannelId) {
      // Testing channel
      // If the author is a newcomer
      const authorId = message.author.id;
      const authorAsMember = await message.guild.members.fetch(authorId);
      const authorRoles = authorAsMember.roles.cache;
      const newcomer = authorRoles.size == 1;

      if (newcomer) {
        // Add reaction
        message.react("🕴");
      }
    }
  },
};
