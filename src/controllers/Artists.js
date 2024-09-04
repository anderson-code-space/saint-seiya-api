const {
  getCollectionData,
  getCollectionItem
} = require('../utils/getCollections.js');



module.exports = {
  async getArtists(request, response) {
    await getCollectionData(
      request, response, 'artists', 'totalArtists', 'paginatedArtists'
    )
  },

  async getArtist(request, response) {
    await getCollectionItem(request, response, 'artists', 'artist')

  }
};