import { FilePathType } from "./helper/fileSystem/fileSystem.types";
import { SerializedData, SerializerType } from "./helper/serialization/serialization.types";

export interface DynamicConfigOptions {
    file: string;
    pathType: FilePathType;
    encoding: BufferEncoding;
    serialization: SerializerType;
    onChange: (newConfig: object) => void;
    onError: (e: Error, previousConfig: SerializedData | undefined) => void;
}