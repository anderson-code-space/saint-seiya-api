const Content = require('../models/Content.js');

function groupSaints(collection, group) {
  try {
    const filteredCollection = collection.filter(saint => saint.group.includes(group));

    const groupedCollection = Object.entries(
      filteredCollection.reduce((acc, saint) => {
        const className = saint?.class?.name;
        if (className) {
          acc[className] = acc[className] || [];
          acc[className].push(saint);
        } else {
          console.error('Invalid entry:', saint);
        }
        return acc;
      }, {})
    ).map(([name, saints]) => ({
      name,
      saints: saints.sort((a, b) => a.name.localeCompare(b.name))
    }));

    return groupedCollection.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.error('Error grouping saints:', err);
    return [];
  }
}

function getRestOfTheCollection(collection, collectionName, collections) {
  const newCollection = [];
  const collectionsObjects = collections.find(item => item.collectionPath === collectionName);

  if (collectionsObjects) {
    collectionsObjects.collection.forEach(item => {
      const group = `${item.group}-${item.id}`;
      if (!collection.some(saint => saint.group === group)) {
        newCollection.push({ ...item, saints: [] });
      }
    });
  } else {
    console.error(`Collection "${collectionName}" not found in collections`);
  }

  return newCollection.sort((a, b) => a.name.localeCompare(b.name));
}

function orderGroups(groups, order) {
  const orderedGroups = order.flatMap(key =>
    groups.filter(group => group.name.toLowerCase().includes(key))
  );
  return orderedGroups;
}

module.exports = {
  async getAllClasses(req, res) {
    try {
      const collections = await Content.getColletions();
      const saints = collections.find(col => col.collectionPath === 'saints')?.collection || [];
      res.json(res.paginate(saints));
    } catch (err) {
      console.error('Error fetching classes:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getClassSaints(req, res) {
    try {
      const collections = await Content.getColletions();
      const collection = collections.find(col => col.collectionPath === 'saints')?.collection || [];

      if (req.params.class === 'saints') {
        const saints = groupSaints(collection, 'athena-saints');
        const unknownSaintsCounter = saints.reduce((count, group) => count + (group.saints.length > 0 ? 1 : 0), 0);

        res.json([
          { title: 'Gods', items: groupSaints(collection, 'athena-gods') },
          {
            title: `88 Athena Saints (${unknownSaintsCounter} appeared)`,
            items: [...saints, ...getRestOfTheCollection(collection, 'constellations', collections)]
          },
          { title: 'Saints with former constellations', items: groupSaints(collection, 'athena-former-saints') },
          { title: 'Saints with Hindu constellations', items: groupSaints(collection, 'athena-hindu-saints') },
          { title: 'Saints with Chinese constellations', items: groupSaints(collection, 'athena-chinese-saints') },
          { title: 'Saints without constellation', items: groupSaints(collection, 'athena-unknown-saints') },
          { title: 'Soldiers Saints', items: groupSaints(collection, 'athena-soldiers') }
        ]);
      } else if (req.params.class === 'specters') {
        const specters = groupSaints(collection, 'ial-star');
        const unknownSpectersCounter = specters.reduce((count, group) => count + (group.saints.length > 0 ? 1 : 0), 0);

        res.json([
          { title: 'Gods', items: groupSaints(collection, 'hades-gods') },
          { title: 'Hades Representative', items: groupSaints(collection, 'hades-representative') },
          {
            title: `108 Hades Specters (${unknownSpectersCounter} appeared)`,
            items: [...specters, ...getRestOfTheCollection(collection, 'evil-stars', collections)]
          },
          { title: 'Other Specters', items: groupSaints(collection, 'hades-other-specters') },
          { title: 'Skeleton soldiers', items: groupSaints(collection, 'hades-skeleton') },
          { title: 'Pluto Faceless', items: groupSaints(collection, 'hades-faceless') }
        ]);
      } else {
        // Handle other cases similarly...
        res.status(404).json({ message: `${req.params.class} not found in Classes Controller` });
      }
    } catch (err) {
      console.error('Error fetching class saints:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getClassesByArtist(req, res) {
    try {
      const collections = await Content.getColletions();
      const saints = collections.find(col => col.collectionPath === 'saints')?.collection || [];
      const artists = collections.find(col => col.collectionPath === 'artists')?.collection || [];

      if (req.params.id === '0') {
        res.json(saints.filter(saint => !saint.artistSaint || !saint.artistCloth));
      } else {
        const artist = artists.find(artist => artist.id === req.params.id);
        if (artist) {
          res.json(saints.filter(saint => saint.artistSaint === artist.id || saint.artistCloth === artist.id));
        } else {
          res.status(404).json({ message: 'Artist not found' });
        }
      }
    } catch (err) {
      console.error('Error fetching classes by artist:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getClassesByDebut(req, res) {
    try {
      const collections = await Content.getColletions();
      const saints = collections.find(col => col.collectionPath === 'saints')?.collection || [];
      const debuts = collections.find(col => col.collectionPath === 'debuts')?.collection || [];

      if (req.params.id === '0') {
        res.json(saints.filter(saint => !saint.debut));
      } else {
        const debut = debuts.find(debut => debut.id === req.params.id);
        if (debut) {
          res.json(saints.filter(saint => saint.debut === debut.name && saint.midia === debut.midia));
        } else {
          res.status(404).json({ message: 'Debut not found' });
        }
      }
    } catch (err) {
      console.error('Error fetching classes by debut:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getSaint(req, res) {
    try {
      const collections = await Content.getColletions();
      const saints = collections.find(col => col.collectionPath === 'saints')?.collection || [];
      const saint = saints.find(saint => saint.id === req.params.id);

      if (saint) {
        res.json(saint);
      } else {
        res.status(404).json({ message: 'Saint not found' });
      }
    } catch (err) {
      console.error('Error fetching saint:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
