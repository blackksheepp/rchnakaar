import { CollectionType } from "@/database/collections";
import { DelCollection } from "@/app/utils/db";
import { ObjectElement } from "../Common";
import Image from "next/image";
export interface CollectionElement extends ObjectElement {
  collection: CollectionType;
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
      className={`text-accent text-objt font-retro flex flex-row items-center justify-between border-accent border-b-[3px] h-objh px-4 ${
        isDragging ? "border-[3px] bg-black" : ""
      }`}
    >
      <div className="flex flex-row justify-between items-baseline w-full pr-4">
        <div className="flex flex-row gap-2 md:lg-1 lg:ml-2 items-center">
          <Image
            src="/img/drag.png"
            alt="show"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-drgb cursor-pointer"
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
            className="w-auto h-edtb cursor-pointer"
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
            className="w-edtb h-auto cursor-pointer"
            onClick={() => {
              DelCollection(collection.name);
              refresh();
            }}
          />
        </div>
      </div>
      <p className="box-border w-10 h-full max-h-max border-l-[3px] border-accent grid place-items-center pl-3">
        {collection?.items.length}
      </p>
    </div>
  );
};
