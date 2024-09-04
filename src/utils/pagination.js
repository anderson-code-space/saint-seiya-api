const paginateResponse = (request, modelStorage) => {
    // Pagination logic
    const page = parseInt(request.query.page) || 1;
    const pageSize = parseInt(request.query.pageSize) || 10;

    const totalModel = modelStorage.length;
    const totalPages = Math.ceil(totalModel / pageSize);
    const paginatedModel = modelStorage.slice((page - 1) * pageSize, page * pageSize);

    return {
        page,
        pageSize,
        totalPages,
        totalModel,
        paginatedModel,
    }
}

module.exports={
    paginateResponse
}