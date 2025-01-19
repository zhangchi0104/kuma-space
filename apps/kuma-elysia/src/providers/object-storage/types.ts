export type PutObjectResponse = {
  key: string;
  url: string;
};
export type CreatePresignedUrlResponse = {
  uploadUrl: string;
  fileUrl: string;
};
export interface IStorageBucket {
  putObject: (key: string, data: Buffer) => Promise<PutObjectResponse>;
  getObject: (key: string) => Promise<Buffer | null>;
  listObjects: (prefix?: string) => Promise<string[]>;
  deleteObject: (key: string) => Promise<void>;
  // linkObject: (key: string, targetKey: string) => Promise<void>;
  updateObject: (key: string, data: Buffer) => Promise<void>;
  createUploadPresignedUrl: (
    key: string,
    expiresIn?: number,
    contentType?: string,
  ) => Promise<CreatePresignedUrlResponse>;
  // copyObject: (key: string, targetKey: string) => Promise<void>;
}
