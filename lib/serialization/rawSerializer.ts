import { SerializedData, Serializer } from './serialization.types';

export class RawSerializer implements Serializer {
  serialize(data: string): SerializedData {
    return { raw: data, serialized: undefined };
  }
}
