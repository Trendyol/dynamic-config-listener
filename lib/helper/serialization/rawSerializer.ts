import { SerializedData } from './serialization.types';

export function serialize(data: string): SerializedData {
  return { raw: data, serialized: undefined };
}
