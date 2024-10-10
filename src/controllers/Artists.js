const { ArtistManager } = require('../utils/ArtistManager.js');

module.exports = {
  async getArtists(request, response) {
    try {
      const artists = ArtistManager.getAllArtists();

      if (!artists) return response.status(204).send();

      const paginatedData = response.paginate(artists);
      const { totalModel, paginatedModel, ...rest } = paginatedData;

      response.status(200).json({
        ...rest,
        totalArtists: totalModel,
        paginatedArtists: paginatedModel
      });


    } catch (error) {
      console.error('Error reading artists:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  },

  async getArtist(request, response) {
    try {
      const artist = ArtistManager.getArtistById(request.params.id);

      if (!artist) {
        return response.status(404).json({ message: 'Artist not found' });
      }

      response.status(200).json(artist);
    } catch (error) {
      console.error('Error reading artist:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  },

  async createArtist(request, response) {
    try {
      const { name, site } = request.body;

      if (!name || !site) {
        return response.status(400).json({ message: 'Missing required fields' });
      }

      const newArtist = ArtistManager.createArtist({ name, site });
      response.status(201).json({ message: 'Artist created successfully', artist: newArtist });
    } catch (error) {
      console.error('Error creating artist:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateArtist(request, response) {
    try {
      const { name, site } = request.body;
      const updatedArtist = ArtistManager.updateArtist(request.params.id, { name, site });

      if (!updatedArtist) {
        return response.status(404).json({ message: 'Artist not found' });
      }

      response.status(200).json({ message: 'Artist updated successfully', artist: updatedArtist });
    } catch (error) {
      console.error('Error updating artist:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteArtist(request, response) {
    try {
      const deletedArtist = ArtistManager.deleteArtist(request.params.id);

      if (!deletedArtist) {
        return response.status(404).json({ message: 'Artist not found' });
      }

      response.status(200).json({ message: 'Artist deleted successfully', artist: deletedArtist });
    } catch (error) {
      console.error('Error deleting artist:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
};
