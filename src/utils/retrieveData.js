const retrieveData = (storageType, dataType) => storageType
    .filter(storage => storage.collectionPath === dataType)
    .map(storage => storage.collection)[0] || [];

const retrieveDataOne = (storageType, dataType, request) => {
    let models = storageType
        .find(storage => storage.collectionPath === dataType)?.collection || [];

    return models.find(model => model.id === request.params.id);
}




module.exports = {
    retrieveData, retrieveDataOne
}