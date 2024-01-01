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
      className={`text-accent font-retro flex flex-row items-center justify-between border-accent border-b-[3px] h-itmh px-itmg2 ${
        isDragging ? "border-[3px] bg-black" : ""
      }`}
    >
      <div className="flex flex-row justify-between items-baseline w-full">
        <div className="flex flex-row gap-itmg items-center">
          <Image
            src="/img/drag.png"
            alt="drag"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-drgb cursor-pointer"
            {...dragHandle}
          />

          <Image
            src={item?.image}
            alt=" "
            width={0}
            height={0}
            sizes="100vw"
            className="w-itmim h-auto cursor-pointer"
            onClick={() => {
              setZoom(item?.image);
            }}
          />
          <div className="flex flex-col gap-1 lg:gap-0">
            <p className="text-itmn">{item?.name}</p>
            <p className="text-itmd text-gray-400">{item?.description}</p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <Image
            src="/img/edit.png"
            alt="edit"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-edtb cursor-pointer"
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
            className="w-edtb h-auto cursor-pointer"
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
