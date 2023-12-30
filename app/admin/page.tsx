"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import {
  collection,
  item,
  getCollections,
  delCollection,
  reOrderCollection,
  createCollection,
  renameCollection,
  createItem,
  getItems,
  delItem,
  renameItem,
} from "@/utils/vercel/kv";
import withAuth from "./Components/WithAuth";
import { FitTexture } from "../Components/TextureOverlay";
import { saveImage } from "@/utils/vercel/blob";

interface ObjectElement {
  key: string;
  refresh: () => void;
  rename: (oldCollectionName: string) => void;
  isDragging: boolean;
  dragHandle: DraggableProvidedDragHandleProps | null | undefined;
}

interface CollectionElement extends ObjectElement {
  collection: collection;
  loadItems: (collection: string) => void;
}

interface ItemElement extends ObjectElement {
  item: item;
  setZoom: (imgUrl: string) => void;
}

const Collection: React.FC<CollectionElement> = ({
  collection,
  refresh,
  rename,
  loadItems,
  isDragging,
  dragHandle,
}) => {
  return (
    <div
      className={`text-accent font-retro flex flex-row items-center justify-between border-accent border-b-[3px] h-[50px] px-4 ${
        isDragging ? "border-[3px] bg-black" : ""
      }`}
    >
      <div className="flex flex-row justify-between items-baseline w-full pr-4">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src="/img/drag.png"
            alt="show"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-[15px] cursor-pointer"
            {...dragHandle}
          />
          <p
            onClick={() => {
              loadItems(collection?.name);
            }}
            className="cursor-pointer"
          >
            {collection?.name}
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Image
            src="/img/edit.png"
            alt="show"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-[18px] cursor-pointer"
            onClick={() => {
              rename(collection?.name);
            }}
          />
          <Image
            src="/img/trash.svg"
            alt="show"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[18px] h-auto cursor-pointer"
            onClick={() => {
              delCollection(collection);
              refresh();
            }}
          />
        </div>
      </div>
      <p className="border-l-[3px] border-accent pl-[14px] py-3">
        {collection?.items}
      </p>
    </div>
  );
};

const Item: React.FC<ItemElement> = ({
  item,
  refresh,
  rename,
  isDragging,
  dragHandle,
  setZoom,
}) => {
  return (
    <div
      className={`text-accent font-retro flex flex-row items-center justify-between border-accent border-b-[3px] h-[80px] px-4 ${
        isDragging ? "border-[3px] bg-black" : ""
      }`}
    >
      <div className="flex flex-row justify-between items-baseline w-full">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src="/img/drag.png"
            alt="drag"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-[15px] cursor-pointer"
            {...dragHandle}
          />

          <Image
            src={item?.image}
            alt="itemimg"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[50px] h-auto cursor-pointer"
            onClick={() => {
              setZoom(item?.image);
            }}
          />
          <div className="flex flex-col gap-1">
            <p className="text-[14px]">{item?.name}</p>
            <p className="text-[11px] text-gray-400">{item?.description}</p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <Image
            src="/img/edit.png"
            alt="edit"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-[18px] cursor-pointer"
            onClick={() => {
              rename(item?.name);
            }}
          />
          <Image
            src="/img/trash.svg"
            alt="trash"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[18px] h-auto cursor-pointer"
            onClick={() => {
              if (item) delItem(item);
              refresh();
            }}
          />
        </div>
      </div>
    </div>
  );
};

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
                <p className="text-sm flex items-center pt-1" onClick={() => {setCollectionName("");}}>Back</p>
                
              </div>
            ) : (
              <></>
            )}
            {haveObjects ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="collections">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {objectElement?.map((item, index) => (
                        <Draggable
                          key={item.key}
                          draggableId={item.key}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              {showCollections() ? (
                                <Collection
                                  key={item.key}
                                  collection={
                                    (item as CollectionElement).collection
                                  }
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
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
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
          showCollections() ? (
            <div className="absolute w-full h-screen z-30 grid place-items-center">
              <div className="absolute w-[80%] h-[19%] border-accent border-4 shadow-[6px_6px_0px_0px_rgba(70,70,70)]">
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

                <form
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
                  className="flex flex-col gap-5 items-center justify-center"
                >
                  <input
                    type="text"
                    placeholder="collection name"
                    value={objectName}
                    onChange={(event) => {
                      setObjectName(event.target.value);
                    }}
                    className="bg-accent placeholder:text-gray-500 shadow-[3px_3px_0px_0px_rgba(70,70,70)] text-black font-retro text-[15px] outline-none px-2 py-1"
                    required // Added the required attribute
                  />
                  <button
                    type="submit"
                    className="btn w-auto h-auto font-retro text-black flex flex-row gap-1 px-3 py-[4px] mx-auto items-center justify-center"
                  >
                    {Rename ? "Rename" : "Create"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
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
                <form
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
                  className="flex flex-col gap-5 items-center justify-center"
                >
                  <div
                    className={`flex flex-col gap-1 justify-center items-center ${
                      Rename ? "hidden" : "vissible"
                    }`}
                  >
                    <label className="font-retro text-accent text-xs">
                      Select Item Image
                    </label>
                    <input
                      type="file"
                      onChange={(event) => {
                        if (event.target.files)
                          setImageFile(event.target.files[0]);
                      }}
                      className="file:bg-accent file:outline-none file:text-[10px] file:font-retro  bg-black border border-accent shadow-[3px_3px_0px_0px_rgba(70,70,70)] text-accent font-retro text-[13px] outline-none px-1 py-1"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="item name"
                    value={objectName}
                    onChange={(event) => {
                      setObjectName(event.target.value);
                    }}
                    required
                    className="bg-accent placeholder:text-gray-500 shadow-[3px_3px_0px_0px_rgba(70,70,70)] text-black font-retro text-[15px] outline-none px-2 py-1"
                  />
                  <input
                    type="text"
                    placeholder="item description"
                    value={objectDescription}
                    onChange={(event) => {
                      setObjectDescription(event.target.value);
                    }}
                    className={`bg-accent placeholder:text-gray-500 shadow-[3px_3px_0px_0px_rgba(70,70,70)] text-black font-retro text-[15px] outline-none px-2 py-1 ${
                      Rename ? "hidden" : "vissible"
                    }`}
                  />
                  <button
                    type="submit"
                    className="btn w-auto h-auto font-retro text-black flex flex-row gap-1 px-3 py-[4px] mx-auto mb-4 items-center justify-center"
                  >
                    {Rename ? "Rename" : "Create"}
                  </button>
                </form>
              </div>
            </div>
          )
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
