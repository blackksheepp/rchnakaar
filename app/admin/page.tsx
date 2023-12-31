"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  getCollections,
  reOrderCollection,
  createCollection,
  renameCollection,
  createItem,
  getItems,
  renameItem,
} from "@/utils/vercel/kv";
import { saveImage } from "@/utils/vercel/blob";

import withAuth from "./Components/WithAuth";
import { FitTexture } from "../Components/TextureOverlay";

import { ObjectElement } from "./Components/Common";
import { CollectionElement, Collection } from "./Components/Collection";
import { ItemElement, Item } from "./Components/Item";

import { CollectionForm } from "./Components/Collection/Form";
import { ItemForm } from "./Components/Item/Form";
import { DNDList } from "./Components/DNDList";
import { DropResult, Draggable } from "react-beautiful-dnd";

const Admin = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [objectName, setObjectName] = useState<string>("");
  const [objectDescription, setObjectDescription] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [objectImage, setObjectImage] = useState<string>("");
  const [zoom, setZoom] = useState<boolean>(false);

  const [haveObjects, setHaveObjects] = useState<boolean>(true);
  const [objectElement, setObjectElement] = useState<
    CollectionElement[] | ObjectElement[] | ItemElement[] | null
  >(null);

  const [Rename, setRename] = useState(false);
  const [oldObjectName, setOldObjectName] = useState("");

  const [collectionName, setCollectionName] = useState("");
  const showCollections = () => {
    return collectionName == "";
  };

  const loadItems = (collection: string) => {
    setCollectionName(collection);
  };

  useEffect(() => {
    renderObjects(true);
  }, [collectionName]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedObjects = Array.from(objectElement!);
    const [removed] = reorderedObjects.splice(result.source.index, 1);
    reorderedObjects.splice(result.destination.index, 0, removed);

    setObjectElement(reorderedObjects);
    await renderObjects(
      await reOrderCollection(
        collectionName,
        reorderedObjects.map((object) => {
          if ((object as CollectionElement).collection) {
            return (object as CollectionElement).collection;
          }
          return (object as ItemElement).item;
        })
      )
    );
  };

  const renderObjects = async (show: boolean | undefined) => {
    if (!show) return;

    const objects =
      collectionName == ""
        ? await getCollections()
        : await getItems(collectionName!);
    setHaveObjects(objects ? objects.length > 0 : false);

    var objectElements: ObjectElement[] | null = null;
    if (showCollections()) {
      objectElements =
        (objects?.map((c, i) => ({
          key: i.toString(),
          collection: c,
        })) as CollectionElement[]) || null;
    } else {
      objectElements =
        (objects?.map((c, i) => ({
          key: i.toString(),
          item: c,
        })) as ItemElement[]) || null;
    }

    if (objectElements) {
      setObjectElement(objectElements);
    }
  };

  const createNewObject = async () => {
    await renderObjects(
      showCollections()
        ? await createCollection(objectName)
        : await createItem({
            name: objectName,
            description: objectDescription,
            image: await saveImage(objectName, imageFile!),
            collection: collectionName!,
          })
    );
    setObjectName("");
    setObjectDescription("");
  };

  const renameOldObject = async () => {
    var newObjectName = objectName;

    const k = showCollections()
      ? await renameCollection(oldObjectName, newObjectName)
      : await renameItem(collectionName, oldObjectName, newObjectName);

    console.log(k);
    await renderObjects(k);
    setObjectName("");
  };

  const refresh = () => {
    renderObjects(true);
  };

  const rename = (oldObjectName: string) => {
    setOldObjectName(oldObjectName);
    setShowForm(true);
    setRename(true);
  };

  const handleZoom = (imgUrl: string) => {
    setZoom(!zoom);
    setObjectImage(imgUrl);
  };
  return (
    <div>
      <div className={`${zoom ? "z-0 blur-lg" : ""}`}>
        <div
          className={`absolute w-full h-screen flex items-center justify-center flex-col gap-3 ${
            showForm ? "blur-sm" : "blur-0"
          }`}
        >
          <p className="font-retro text-accent text-[35px] dropshadow ">
            Manage Store
          </p>

          <div className="shadow-[6px_6px_0px_0px_rgba(70,70,70)] w-[80%] h-[80%] border-accent border-4 mb-10">
            {collectionName ? (
              <div className="font-retro text-accent text-2xl py-3 border-b-[3px] flex flex-row justify-between pl-5 pr-7">
                <p>{collectionName}</p>
                <p
                  className="text-sm flex items-center pt-1"
                  onClick={() => {
                    setCollectionName("");
                  }}
                >
                  Back
                </p>
              </div>
            ) : (
              <></>
            )}
            {haveObjects ? (
              <DNDList onDragEnd={onDragEnd}>
                {objectElement?.map((item, index) => (
                  <Draggable
                    key={item.key}
                    draggableId={item.key}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        {showCollections() ? (
                          <Collection
                            key={item.key}
                            collection={(item as CollectionElement).collection}
                            refresh={refresh}
                            rename={rename}
                            loadItems={loadItems}
                            isDragging={snapshot.isDragging}
                            dragHandle={provided.dragHandleProps}
                          />
                        ) : (
                          <Item
                            key={item.key}
                            item={(item as ItemElement).item}
                            refresh={refresh}
                            rename={rename}
                            isDragging={snapshot.isDragging}
                            dragHandle={provided.dragHandleProps}
                            setZoom={handleZoom}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
              </DNDList>
            ) : (
              <div className="w-full">
                <p className="font-retro italic text-gray-300 text-xs max-w-max mx-auto mt-4">
                  No Collections Yet...
                </p>
              </div>
            )}
            {/* Create Collection Button */}
            <button
              className="btn w-auto h-auto font-retro text-black flex flex-row gap-1 px-4 py-3 mx-auto mt-4 items-center justify-center"
              onClick={() => {
                setShowForm(!showForm);
              }}
            >
              <Image
                src="/img/add.svg"
                alt="show"
                width={0}
                height={0}
                sizes="100vw"
                className="w-[18px] h-auto"
              />
              <p className="font-retro text-black text-[15px]">
                {collectionName ? "Add Items" : "Create New Collection"}
              </p>
            </button>
          </div>
        </div>

        {showForm ? (
          <div className="absolute w-full h-screen z-30 grid place-items-center">
            <div className="absolute w-[80%] overflow-y-visible border-accent border-4 shadow-[6px_6px_0px_0px_rgba(70,70,70)]">
              <FitTexture />
              <div
                className="w-full max-w-max ml-auto mr-2 mt-3 mb-5 cursor-pointer"
                style={{ filter: "drop-shadow(1.5px 1.5px rgb(70, 70, 70))" }}
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                <Image
                  src="/img/close.svg"
                  alt="show"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[15px] h-auto"
                />
              </div>
              {showCollections() ? (
                <CollectionForm
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (Rename) {
                      renameOldObject();
                      setRename(false);
                    } else {
                      createNewObject();
                    }
                    setShowForm(!showForm);
                  }}
                  objectName={objectName}
                  setObjectName={setObjectName}
                  Rename={Rename}
                />
              ) : (
                <ItemForm
                  onSubmit={(event) => {
                    event.preventDefault(); // Prevents the default form submission behavior
                    if (Rename) {
                      renameOldObject();
                      setRename(false);
                    } else {
                      createNewObject();
                    }
                    setShowForm(!showForm);
                  }}
                  setImageFile={setImageFile}
                  objectName={objectName}
                  setObjectName={setObjectName}
                  objectDescription={objectDescription}
                  setObjectDescription={setObjectDescription}
                  Rename={Rename}
                />
              )}{" "}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {zoom ? (
        <div
          className="absolute z-40 w-full h-screen"
          onClick={() => {
            setZoom(false);
          }}
        >
          <div className="h-full max-h-max flex items-center justify-center">
            <Image
              src={objectImage}
              alt="itemimg"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[250px] h-auto cursor-pointer"
              onClick={() => {}}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default withAuth(Admin);
