const express = require('express');

const {
    getArtists
    , getArtist
    , createArtist
    , updateArtist
    , deleteArtist } = require('./controllers/Artists.js');

const DebutsController = require('./controllers/Debuts.js');
const CharactersController = require('./controllers/Characters.js');
const ClassesController = require('./controllers/Classes.js');
const { getCuriosities } = require('./controllers/Curiosities.js');

const { paginationMiddleware } = require('./middlewares/paginationMiddleware.js');

const routes = express.Router();

// Artists

routes.get('/artists', paginationMiddleware, getArtists);
routes.get('/artist/:id', getArtist);
routes.post('/artist/create', createArtist);
routes.put('/artist/:id', updateArtist);
routes.delete('/artist/:id', deleteArtist);


routes.get('/debuts', paginationMiddleware, DebutsController.getDebuts);

routes.get('/debut/:id', DebutsController.getDebut);

routes.get('/characters', paginationMiddleware, CharactersController.getCharacters);

routes.get('/character/:id', CharactersController.getCharacter);

routes.get('/curiosities', paginationMiddleware, getCuriosities);

routes.get('/all-classes', ClassesController.getAllClasses);

routes.get('/:class', ClassesController.getClassSaints);

routes.get('/:class/:id', ClassesController.getSaint);

routes.get('/classes/debut/:id', ClassesController.getClassesByDebut);

routes.get('/classes/artist/:id', ClassesController.getClassesByArtist);

module.exports = routes;
