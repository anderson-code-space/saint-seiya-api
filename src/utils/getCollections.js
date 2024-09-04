const {
    retrieveData, retrieveDataOne
} = require('./retrieveData.js')

const { getCollections } = require('../models/Content.js');

const getCollectionData = async (request, response, collectionType, totalKey, paginatedKey) => {
    const collections = await getCollections();

    if (!collections) return response.status(204).send();

    const data = retrieveData(collections, collectionType);

    const paginatedData = response.paginate(data);
    const { totalModel, paginatedModel, ...rest } = paginatedData;

    response.json({
        ...rest,
        [totalKey]: totalModel,
        [paginatedKey]: paginatedModel
    });
}


const getCollectionItem = async (request, response, collectionType, itemName) => {
    const collections = await Content.getCollections();

    if (!collections) return response.status(204).send();

    const item = retrieveDataOne(collections, collectionType, request);

    if (item) {
        response.json(item);
    } else {
        response.status(404).json({ message: `${itemName} not found` });
    }
}

module.exports = {
    getCollectionData,
    getCollectionItem
}