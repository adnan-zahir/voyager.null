module.exports = {
  name: 'ready',
  once: true,
  execute(client: any) {
    console.log('Bot is ready!');
    client.user.setActivity('working on /check game command');
  },
};
