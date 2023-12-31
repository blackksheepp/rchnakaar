import { ObjectElement } from "../Common";
import { item } from "@/utils/vercel/kv";
import Image from "next/image";
import { delItem } from "@/utils/vercel/kv";

export interface ItemElement extends ObjectElement {
  item: item;
  setZoom: (imgUrl: string) => void;
}

export const Item: React.FC<ItemElement> = ({
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
