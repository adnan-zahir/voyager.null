module.exports = {
  name: 'messageCreate',
  async execute(message: any, afks: string[]) {
    if (afks.length >= 0) {
      const { mentions } = message;
      const { members } = mentions;
      if (!members) return;

      // check if any afk members get mentioned
      for (const user of afks) {
        if (members.has(user)) {
          let nickname = members.get(user).nickname;
          if (nickname.startsWith('(AFK)')) {
            nickname = nickname.slice(5);
          }
          message.reply(`${members.get(user).nickname} is AFK!`);
        }
      }

      // check if the message is from an afk member
      const { member } = message;
      const { id, nickname } = member;
      if (afks.includes(id)) {
        // remove "(AFK)" from the nickname
        if (nickname.startsWith('(AFK)')) {
          const newNickname = nickname.slice(5);
          await member.setNickname(newNickname);
        }
        afks.splice(afks.indexOf(id), 1);
        console.log(`AFKS : ${afks.map((user) => user)}`);
      }
    }
  },
};
