const { SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction, PermissionFlagsBits, userMention } = require('discord.js');
const { ALLOWED_DECODERS, ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE_IN_MB } = require('../../constants')
const { UserFixableAction, WrongFileType, ImageWrongAspectRatio, ImageFilesizeTooLarge } = require('../../utilities/errors')
const { getXMostRecentBanners, getPicById } = require('../../db');
const {emptyShipEmbed} = require('../../utilities/embedBuilder')
const log = require('../../utilities/logger')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-ship')
    .setDescription('Set the ship for your shit')
    .addStringOption(option =>
      option
        .setName('ship')
        .setDescription('Name of ship')
        .setAutocomplete(true)
        .setRequired(true))
        
    .setDMPermission(false),

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Eris.Client} bot
  */
  async execute(interaction, bot) {

    await interaction.deferReply({
      ephemeral: true,
    })
    
    const shipRef = interaction.options.getString('ship')
    log.info(`SET_SHIP: looking up ${shipRef}}`)


    const potentialShip = bot.erkulData.ships.find(ship => ship.data.ref === shipRef);
    if(!potentialShip) {
      return interaction.editReply({
        content: "Sorry, that ship wasn't able to be found...",
      })
    }


    return interaction.editReply({
      embeds: [emptyShipEmbed(potentialShip)],
    });

  },

  /**
   * @param {AutocompleteInteraction} interaction
   * @param {Eris.Client} bot
  */
  async autocomplete(interaction, bot) {
    const focusedValue = interaction.options.getFocused();
    const shipNames = bot.erkulData.ships.map(s => ({ name: s.data.name, value: s.data.ref }));
    const matchingShipNames = shipNames.filter(ship => ship.name.toLowerCase().includes(focusedValue));
    await interaction.respond(matchingShipNames.slice(0,25));
  }
};
