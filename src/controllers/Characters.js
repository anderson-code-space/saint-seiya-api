const {
  getCollectionData,
  getCollectionItem
} = require('../utils/getCollections.js');



module.exports = {
  async getCharacters(request, response) {
    await getCollectionData(
      request, response, 'characters', 'totalCharacters', 'paginatedCharacters'
    )
  },

  async getCharacter(request, response) {
    await getCollectionItem(request, response, 'characters', 'character')

  }

};