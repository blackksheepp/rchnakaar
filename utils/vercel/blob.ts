import { put, del } from "@vercel/blob";

export const saveImage = async (name: string, file: File) => {
  const filename = `${name}.${file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)}` 
  const { url } = await put(filename, file, { access: "public" });
  return url;
};

export const delImage = async (url:string) => {
    await del(url);
}