"use server";

import {
  CollectionType,
  ItemType,
  createCollection,
  createItem,
  getCollections,
  getItems,
  reOrder,
  renameCollection,
  renameItem,
  delCollection,
  delItem,
} from "@/database/collections";

import { put } from "@/lib/tebi";
export const CreateCollection = async (name: string) => {
  return await createCollection(name);
};

export const CreateItem = async (
  title: string,
  details: string,
  image: string,
  collection: string
) => {
  return await createItem(title, details, image, collection);
};

export const GetCollections = async () => {
  return await getCollections();
};
export const GetItems = async (name: string) => {
  return await getItems(name);
};

export const ReOrder = async (
  objects: (CollectionType | ItemType)[],
  collection: string | false
) => {
  return await reOrder(objects, collection);
};
export const RenameCollection = async (
  oldCollectionName: string,
  newCollectionName: string
) => {
  return await renameCollection(oldCollectionName, newCollectionName);
};

export const RenameItem = async (
  collection: string,
  oldItemTitle: string,
  newItemTitle: string
) => {
  return await renameItem(collection, oldItemTitle, newItemTitle);
};

export const DelCollection = async (name: string) => {
  return await delCollection(name);
};

export const DelItem = async (collection: string, title: string) => {
  return await delItem(collection, title);
};

export const SaveImage = async (filename: string, file: string, length: number) => {
  const fileBuffer = JSON.parse(file);
  const url = await put(filename, fileBuffer, length);
  return url;
};