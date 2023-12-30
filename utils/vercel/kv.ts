import { kv } from "@vercel/kv";
import { delImage } from "./blob";

const COLLECTIONS = "Collections";

export interface collection {
  name: string;
  items: number;
}

export interface item {
  image: string;
  name: string;
  description: string;
  collection: string;
}

export const createCollection = async (collectionName: string) => {
  try {
    const collections = await getCollections();
    var isDuplicate = false;
    collections?.forEach((collection) => {
      if (collection.name == collectionName) {
        isDuplicate = true;
      }
    });

    if (!isDuplicate) {
      const newCollection: collection = { name: collectionName, items: 0 };
      await kv.rpush(COLLECTIONS, newCollection);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
};


export const createItem = async (item: item) => {
  try {
    const items = await getItems(item.name);
    var isDuplicate = false;
    items?.forEach((it) => {
      if (it.name == item.name) {
        isDuplicate = true;
      }
    });

    if (!isDuplicate) {
      await kv.rpush(item.collection, item);
      await updateItems(item.collection);

      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
};

export const getCollections = async () => {
  try {
    return await kv.lrange<collection>(COLLECTIONS, 0, -1);
  } catch (error) {
    return null;
  }
};

export const updateItems = async (
  collectionName: string,
) => {
  try {
    const collections = await getCollections();

    if (collections) {
      for (const collection of collections) {
        if (collection.name === collectionName) {
          const position = await kv.lpos(COLLECTIONS, collection);
          await kv.lset(COLLECTIONS, position, {
            name: collectionName,
            items: collection.items + 1,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getItems = async (collection: string) => {
  try {
    return await kv.lrange<item>(collection, 0, -1);
  } catch (error) {
    console.log(error);
  }
};


export const delCollection = async (collection: collection) => {
  try {
    await kv.lrem(COLLECTIONS, -1, collection);
  } catch (error) {
    console.log(error);
  }
};

export const delItem = async (item: item) => {
  try {
    await kv.lrem(item.collection, -1, item);
    await delImage(item.image);
  } catch (error) {
    console.log(error);
  }
};

export const renameCollection = async (
  oldCollectionName: string,
  newCollectionName: string
) => {
  try {
    var v = false;
    const collections = await getCollections();

    if (collections) {
      for (const collection of collections) {
        if (collection.name === oldCollectionName) {
          const position = await kv.lpos(COLLECTIONS, collection);
          const result = await kv.lset(COLLECTIONS, position, {
            name: newCollectionName,
            items: collection.items,
          });

          v = result === "OK";
        }
      }
    }

    return v;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const renameItem = async (
  collection: string,
  oldItemName: string,
  newItemName: string
) => {
  try {
    var v = false;
    const items = await getItems(collection);

    if (items) {
      for (const item of items) {
        if (item.name === oldItemName) {
          const position = await kv.lpos(collection, item);
          
          item.name = newItemName
          const result = await kv.lset(collection, position, item);

          v = result === "OK";
        }
      }
    }

    return v;
  } catch (error) {
    console.log(error);
  }
};

export const reOrderCollection = async (
  collection?: string | undefined,
  objects?: (collection | item)[]
) => {
  try {
    return (await kv.ltrim(collection ? collection : COLLECTIONS, 999, 0)) ==
      "OK"
      ? (await kv.rpush(collection ? collection : COLLECTIONS, ...objects!)) > 0
      : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
