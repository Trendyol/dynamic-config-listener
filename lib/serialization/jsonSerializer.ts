import { SerializedData, Serializer } from './serialization.types';

export class JsonSerializer implements Serializer {
  serialize(data: string): SerializedData {
    return { raw: data, serialized: JSON.parse(data) };
  }
}
