import { ObjectElement } from "../Common";
import { collection } from "@/utils/vercel/kv";
import Image from "next/image";
import { delCollection } from "@/utils/vercel/kv";
export interface CollectionElement extends ObjectElement {
  collection: collection;
  loadItems: (collection: string) => void;
}

export const Collection: React.FC<CollectionElement> = ({
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