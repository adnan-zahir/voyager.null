module.exports = {
  name: 'ready',
  once: true,
  execute(client: any) {
    console.log('Bot is ready!');
    client.user.setActivity('REPORT BUG TO MODS OR DEVELOPERS ');
  },
};
