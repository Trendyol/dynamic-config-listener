import { serializers } from './serializers';
import { SerializerType } from "./serialization.types";

describe('getSerializer', () => {
  it('should return the correct serializer for JSON', () => {
    // When
    const jsonSerializer = serializers[SerializerType.JSON];

    // Then
    expect(jsonSerializer.serialize).toEqual(require('./jsonSerializer').serialize);
  });

  it('should return the correct serializer for RAW', () => {
    // When
    const jsonSerializer = serializers[SerializerType.RAW];

    // Then
    expect(jsonSerializer.serialize).toEqual(require('./rawSerializer').serialize);
  });
});