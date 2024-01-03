import prisma from "@/lib/prisma";
import { del } from "@/lib/tebi";
export interface CollectionType {
  name: string;
  items: ItemType[];
}

export interface ItemType {
  title: string;
  details: string;
  image: string;
}

export const createCollection = async (name: string) => {
  try {
    await prisma.collections.create({
      data: {
        name: name,
        items: [],
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getCollections = async () => {
  try {
    return await prisma.collections.findMany({});
  } catch (error) {
    return null;
  }
};

export const delCollection = async (name: string) => {
  try {
    await prisma.collections.delete({
      where: {
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const renameCollection = async (
  oldCollectionName: string,
  newCollectionName: string
) => {
  try {
    await prisma.collections.update({
      where: {
        name: oldCollectionName,
      },
      data: {
        name: newCollectionName,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const reOrderCollections = async (collections: CollectionType[]) => {
  try {
    await prisma.collections.deleteMany({});
    await prisma.collections.createMany({
      data: [...collections],
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createItem = async (
  title: string,
  details: string,
  image: string,
  collection: string
) => {
  try {
    await prisma.collections.update({
      where: {
        name: collection,
      },
      data: {
        items: {
          push: [
            {
              title: title,
              details: details,
              image: image,
            },
          ],
        },
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getItems = async (collection: string) => {
  try {
    const c = await prisma.collections.findFirst({
      where: {
        name: collection,
      },
    });
    return c ? c.items : null;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const delItem = async (collection: string, title: string) => {
  try {
    const items = (
      await prisma.collections.findFirst({
        where: {
          name: collection,
        },
      })
    )?.items;
    
    const item = (items?.filter((item) => item.title == title))![0]

    await prisma.collections.update({
      where: {
        name: collection,
      },
      data: {
        items: {
          set: items?.filter((item) => item.title != title),
        },
      },
    });
    await del(item.image.split("/").at(-1)!)
  } catch (error) {
    console.log(error);
  }
};

export const renameItem = async (
  collection: string,
  oldItemTitle: string,
  newItemTitle: string
) => {
  try {
    var items = (
      await prisma.collections.findFirst({
        where: {
          name: collection,
        },
      })
    )?.items;
    items = items?.map((item) => {
      return item.title != oldItemTitle
        ? item
        : { title: newItemTitle, details: item.details, image: item.image };
    });
    await prisma.collections.update({
      where: {
        name: collection,
      },
      data: {
        items: {
          set: items,
        },
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const reOrderItem = async (
  collection: string,
    items: ItemType[]
  ) => {
  try {
    
    await prisma.collections.update({
      where: {
        name: collection,
      },
      data: {
        items: {
          set: items,
        },
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const reOrder = async (objects: (CollectionType | ItemType)[], collection: string | false) => {
    if (collection) {
        return await reOrderItem(collection, objects as ItemType[])
    } else {
        return await reOrderCollections(objects as CollectionType[])
    }
} 