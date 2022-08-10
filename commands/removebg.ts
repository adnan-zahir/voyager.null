import axios from 'axios';
import {
  AttachmentBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import FormData from 'form-data';
import fs from 'fs';
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removebg')
    .setDescription('Receive an image input and remove the background')
    .addAttachmentOption((option) =>
      option
        .setName('image')
        .setDescription('The image to remove the background from')
        .setRequired(true)
    ),
  async execute(interaction: any) {
    const options = interaction.options;
    const image = options._hoistedOptions[0].attachment;
    const { url } = image;

    // api request to removebg API
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_url', url);
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        responseType: 'arraybuffer',
        headers: {
          ...formData.getHeaders(),
          'X-Api-Key': process.env.REMOVE_BG_API_KEY!,
        },
      });

      if (response.status != 200)
        return console.error('Error:', response.status, response.statusText);

      const filename = `no-bg-${image.name}`;

      fs.writeFileSync(filename, response.data);

      const file = new AttachmentBuilder(`./${filename}`);
      const embed = new EmbedBuilder()
        .setTitle('Background removed!')
        .setImage(`attachment://${filename}`);
      await interaction.deferReply();
      await wait(4000);
      await interaction.channel.send({ embeds: [embed], files: [file] });
      await interaction.editReply('Done!');
      console.log(file);
    } catch (error) {
      console.error('Request failed: ', error);
    }
  },
};
