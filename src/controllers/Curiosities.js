const {
    getCollectionData,
    getCollectionItem
} = require('../utils/getCollections.js');


module.exports = {
    async getCuriosities(request, response) {
        await getCollectionData(
            request, response, 'curiosities', 'totalCuriosities', 'paginatedCuriosities'
        )
    }
}