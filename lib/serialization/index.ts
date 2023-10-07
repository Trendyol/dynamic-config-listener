import { Serializer, SerializerType } from './serialization.types';
import { JsonSerializer } from './jsonSerializer';
import { RawSerializer } from './rawSerializer';

const serializers = {
  [SerializerType.JSON]: new JsonSerializer(),
  [SerializerType.RAW]: new RawSerializer(),
};

export function getSerializer(serialization: SerializerType): Serializer {
  return serializers[serialization];
}
