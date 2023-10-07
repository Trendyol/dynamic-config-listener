import { SerializerType} from './serialization.types';
import { serialize as jsonSerialize } from './jsonSerializer';
import { serialize as rawSerialize } from './rawSerializer';

export const serializers = {
  [SerializerType.JSON]: {
    serialize: jsonSerialize
  },
  [SerializerType.RAW]: {
    serialize: rawSerialize
  },
};
