import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sayto")
    .setDescription("Make the bot say something you want to a channel.")
    .addStringOption((option) =>
      option.setName("text").setDescription("Where").setRequired(true)
    )
    .addChannelOption((option) =>
      option.setName("channel").setDescription("What")
    ),
  async execute(interaction: any) {
    const text = interaction.options.getString("text");
    const targetChannel = interaction.options.getChannel("channel");

    console.log(text);
    if (targetChannel) {
      console.log(targetChannel.name);
      targetChannel.send(text);
    } else {
      interaction.channel.send(text);
    }

    interaction.reply({ content: "Sent", ephemeral: true });
    interaction.deleteReply();
  },
};
