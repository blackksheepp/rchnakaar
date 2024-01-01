import React, { FC, FormEvent } from "react";

interface ItemFormElement {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  objectName: string;
  setObjectName: React.Dispatch<React.SetStateAction<string>>;
  objectDescription: string;
  setObjectDescription: React.Dispatch<React.SetStateAction<string>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  Rename: boolean;
}

export const ItemForm: FC<ItemFormElement> = ({
  onSubmit,
  objectName,
  setImageFile,
  objectDescription,
  setObjectDescription,
  setObjectName,
  Rename,
}) => {
  return (
    <form
      onSubmit={onSubmit}
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
            if (event.target.files) setImageFile(event.target.files[0]);
          }}
          className="file:bg-accent file:outline-none file:text-[10px] file:font-retro  bg-black border border-accent shadow-[3px_3px_0px_0px_rgba(70,70,70)] text-accent font-retro text-inpt outline-none px-1 py-1"
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
        className="bg-accent placeholder:text-gray-500 shadow-[3px_3px_0px_0px_rgba(70,70,70)] text-black font-retro text-inpt outline-none px-2 py-1"
      />
      <input
        type="text"
        placeholder="item description"
        value={objectDescription}
        onChange={(event) => {
          setObjectDescription(event.target.value);
        }}
        className={`bg-accent placeholder:text-gray-500 shadow-[3px_3px_0px_0px_rgba(70,70,70)] text-black font-retro text-inpt outline-none px-2 py-1 ${
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
  );
};
