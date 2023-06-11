module.exports = {
  name: "messageCreate",
  async execute(message: any, afks: string[]) {
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
        if (embeds.size >= 1) return;
        console.log("Has embed!");
        console.log(embeds[0]);
        if (!embeds[0].title) return;
        console.log(`Embed title: ${embeds[0].title}`);

        // Check the matching title/name
        if (post.name == embeds[0].title) {
          post.send({ embeds: [embeds[0]] });
        }
      }
    }

    // Member verifiaction automation using reaction
    const introChannelId = "1116275978897985589";
    if (message.channel.id == introChannelId) {
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

    // Say command
    if (message.content.split(" ")[0] == "^say") {
      const ownerRoleId = "865074331154120745";
      const adminRoleId = "865258585935577098";
      const authorizedRoleIds = [ownerRoleId, adminRoleId];
      const { content, channel, author } = message;

      // Remove the prefix
      const text = content.substr(content.indexOf(" ") + 1);

      // Check if the reactor is authorized
      const authorAsMember = await message.guild.members.fetch(author.id);
      const authorRoles = authorAsMember.roles.cache;
      let isAuthorized = false;
      for (const [roleId, _] of authorRoles) {
        if (authorizedRoleIds.includes(roleId)) isAuthorized = !isAuthorized;
      }

      if (isAuthorized) {
        message.delete();
        channel.send(text);
      }
    }
  },
};
