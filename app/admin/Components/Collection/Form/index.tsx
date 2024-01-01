import React, { FC, FormEvent } from "react";

interface CollectionFormElement {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  objectName: string,
  setObjectName: React.Dispatch<React.SetStateAction<string>>;
  Rename: boolean;
}

export const CollectionForm: FC<CollectionFormElement> = ({ onSubmit, objectName, setObjectName, Rename }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 items-center justify-center"
    >
      <input
        type="text"
        placeholder="collection name"
        value={objectName}
        onChange={(event) => {
          setObjectName(event.target.value);
        }}
        className="bg-accent placeholder:text-gray-500 shadow-[3px_3px_0px_0px_rgba(70,70,70)] text-black font-retro text-inpt outline-none px-2 py-1"
        required // Added the required attribute
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
