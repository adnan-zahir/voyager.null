module.exports = {
  name: "messageReactionAdd",
  async execute(reaction: any, user: any) {
    // member verification automation using reaction
    const { message } = reaction;
    const { channel } = message;
    const introChannelId = "1116275978897985589";
    if (channel.id == introChannelId) {
      const ownerRoleId = "865074331154120745";
      const adminRoleId = "865258585935577098";
      const modRoleId = "1116020738319716452";
      const authorizedRoleIds = [ownerRoleId, adminRoleId, modRoleId];

      // Check if the reactor is authorized
      const userAsMember = await message.guild.members.fetch(user.id);
      const userRoles = userAsMember.roles.cache;
      let isReactorAuthorized = false;
      for (const [roleId, _] of userRoles) {
        if (authorizedRoleIds.includes(roleId))
          isReactorAuthorized = !isReactorAuthorized;
      }

      if (isReactorAuthorized) {
        const memberRoleId = "1116344614937432146";
        const options = {
          user: message.author,
          role: memberRoleId,
        };
        message.guild.members.addRole(options);
      }
    }
  },
};
