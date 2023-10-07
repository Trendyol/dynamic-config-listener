export type Serializer = {
  serialize: (data: string) => SerializedData;
};

export type SerializedData = {
  raw: string;
  serialized: object | undefined;
};

export enum SerializerType {
  JSON,
  RAW,
}
