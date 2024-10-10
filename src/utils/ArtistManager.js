const fs = require('fs');
const path = require('path');

// Path to the JSON file containing artists
const artistsFilePath = path.join(__dirname, '../data/json/artists.json');

// Helper function to read the artists from the JSON file
const readArtistsFromFile = () => {
    const artistsData = fs.readFileSync(artistsFilePath, 'utf8');
    return JSON.parse(artistsData);
};

// Helper function to write updated artist data to the JSON file
const writeArtistsToFile = (artists) => {
    fs.writeFileSync(artistsFilePath, JSON.stringify(artists, null, 2), 'utf8');
};

// ArtistManager class that handles all artist-related operations
class ArtistManager {
    // Get all artists
    static getAllArtists() {
        return readArtistsFromFile();
    }

    // Get a single artist by ID
    static getArtistById(id) {
        const artists = readArtistsFromFile();
        return artists.find(a => a.id === id);
    }

    // Create a new artist
    static createArtist({ name, site }) {
        const artists = readArtistsFromFile();
        const lastArtist = artists[artists.length - 1];
        const newId = lastArtist ? parseInt(lastArtist.id, 10) + 1 : 1;

        const newArtist = {
            id: newId.toString(),
            name,
            site
        };

        artists.push(newArtist);
        writeArtistsToFile(artists);
        return newArtist;
    }

    // Update an existing artist by ID
    static updateArtist(id, { name, site }) {
        const artists = readArtistsFromFile();
        const artistIndex = artists.findIndex(a => a.id === id);

        if (artistIndex === -1) {
            return null;
        }

        if (name) artists[artistIndex].name = name;
        if (site) artists[artistIndex].site = site;

        writeArtistsToFile(artists);
        return artists[artistIndex];
    }

    // Delete an artist by ID
    static deleteArtist(id) {
        const artists = readArtistsFromFile();
        const artistIndex = artists.findIndex(a => a.id === id);

        if (artistIndex === -1) {
            return null;
        }

        const deletedArtist = artists.splice(artistIndex, 1);
        writeArtistsToFile(artists);
        return deletedArtist;
    }
}

module.exports = { ArtistManager };
