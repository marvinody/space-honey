const { SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction, EmbedBuilder } = require('discord.js');
const { ERKUL_ROOT_ASSET_URL } = require('../constants')

const emptyShipEmbed = ship => {

  const editableLoadoutPieces = ship.data.loadout.filter(l => l.editable);

  const embed = new EmbedBuilder()
    .setTitle(ship.data.name)
    .setImage(`${ERKUL_ROOT_ASSET_URL}/ships/${ship.localName}`)
    .addFields({name: 'Changeable Loadout Slots', value: `${editableLoadoutPieces.length}`})
    .setFooter({
      text: ship.data.ref
    });

    return embed;
}


module.exports = {
  emptyShipEmbed,
};
