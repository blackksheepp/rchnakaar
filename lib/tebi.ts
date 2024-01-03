import * as AWS from "@aws-sdk/client-s3";

const credentials = {
  accessKeyId: process.env.TEBI_ACCESS_KEY,
  secretAccessKey: process.env.TEBI_ACCESS_SECRET,
};

const blob = new AWS.S3({
  endpoint: "https://s3.tebi.io",
  credentials: credentials,
  region: "global",
});

export const put = async (filename: string, file: Buffer, length: number) => {
  await blob.putObject({
    Bucket: "rchna",
    Key: filename,
    Body: file,
    ContentLength: length,
  });
  
  const url = `https://s3.tebi.io/rchna/${filename}`;
  return url;
};

export const del = async (filename: string) => {
  await blob.deleteObject({
    Bucket: "rchna",
    Key: filename,
  });
};
