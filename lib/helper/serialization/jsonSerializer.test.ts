import { serialize as jsonSerialize } from "./jsonSerializer";

describe("Json Serializer", () => {
    it("serialize", () => {
        // Given
        const serializeData = {
            field: 123,
        }
        const raw = JSON.stringify(serializeData);

        // When
        const result = jsonSerialize(raw);

        // Then
        expect(result.raw).toEqual(raw);
        expect(result.serialized).toEqual(serializeData);
    });
});