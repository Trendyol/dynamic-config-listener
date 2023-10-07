export type Serializer = {
  serialize: SerializeFunc,
}

export type SerializeFunc = (data: string) => SerializedData;

export type SerializedData = {
  raw: string;
  serialized: object | undefined;
};

export enum SerializerType {
  JSON,
  RAW,
}

