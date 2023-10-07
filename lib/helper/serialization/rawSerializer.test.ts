import { serialize as rawSerialize } from "./rawSerializer";

describe("Raw Serializer", () => {
    it("serialize", () => {
        // Given
        const serializeData = {
            field: 123,
        }
        const raw = JSON.stringify(serializeData);

        // When
        const result = rawSerialize(raw);

        // Then
        expect(result.raw).toEqual(raw);
        expect(result.serialized).toBeUndefined();
    });
});