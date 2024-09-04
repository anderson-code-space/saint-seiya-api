const {
  getCollectionData,
  getCollectionItem
} = require('../utils/getCollections.js');



module.exports = {
  async getDebuts(request, response) {

    await getCollectionData(
      request, response, 'debuts', 'totalDebuts', 'paginatedDebuts'
    )
  }
  ,

  async getDebut(request, response) {
    await getCollectionItem(request, response, 'debuts', 'debut')
  }
};