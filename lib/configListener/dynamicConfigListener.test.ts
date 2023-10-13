import DynamicConfigListener from './dynamicConfigListener';
import { FileSystemListener } from '../helper/fileSystem/fileSystemListener';
import { SerializedData, SerializerType } from '../helper/serialization/serialization.types';
import { DynamicConfigOptions } from "../index.types";
import { FilePathType } from "../helper/fileSystem/fileSystem.types";
import * as fileSystem from '../helper/fileSystem/fileUtil';

// Mock fileSystemListener
jest.mock('../helper/fileSystem/fileSystemListener', () => {
    return {
        FileSystemListener: jest.fn().mockImplementation(() => ({
            start: jest.fn(),
            stop: jest.fn(),
        })),
    };
});

describe('DynamicConfigListener', () => {
    let dynamicConfigListener: DynamicConfigListener;

    const config: DynamicConfigOptions = {
        file: 'config.json',
        encoding: 'utf-8',
        pathType: FilePathType.RELATIVE,
        onChange: jest.fn(),
        onError: jest.fn(),
        serialization: SerializerType.JSON,
    };

    beforeEach(() => {
        dynamicConfigListener = new DynamicConfigListener(config);

        // Mock serializers
        jest.mock('../helper/serialization/serializers', () => {
            return {
                serializers: {
                    [SerializerType.JSON]: {
                        serialize: jest.fn(),
                    },
                },
            };
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a DynamicConfigListener instance', () => {
        expect(dynamicConfigListener).toBeInstanceOf(DynamicConfigListener);
    });

    it('should initialize FileSystemListener', () => {
        expect(FileSystemListener).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should get dynamic config when already exist', async () => {
        // Given
        const dynamicConfig = {serialized: {}, raw: ''};
        dynamicConfigListener.dynamicConfig = dynamicConfig;

        // When
        const result = await dynamicConfigListener.readData();

        // Then
        expect(result).toBe(dynamicConfig);
    });

    it('should get dynamic config', async () => {
        // Given
        const mockReadFileData = 'test data';
        const mockSerializedData: SerializedData = { serialized: { data: '123'}, raw: mockReadFileData };

        jest.spyOn(dynamicConfigListener, 'serialize').mockReturnValue(mockSerializedData);
        jest.spyOn(fileSystem, "readFile").mockReturnValue(Promise.resolve(mockReadFileData));

        // When
        const result = await dynamicConfigListener.readData();

        // Then
        expect(result).toBe(mockSerializedData);
        expect(dynamicConfigListener.serialize).toHaveBeenCalledWith(mockReadFileData);
        expect(dynamicConfigListener.listener.start).toHaveBeenCalledWith(config.file);
    });

    it('should unwatch listener', async () => {
        // When
        dynamicConfigListener.stop();

        // Then
        expect(dynamicConfigListener.listener.stop).toHaveBeenCalledWith(config.file);
    });

    it('should handle on file change', async () => {
        const mockReadFileData = 'test data';
        const mockSerializedData: SerializedData = { serialized: { data: '123'}, raw: mockReadFileData };

        jest.spyOn(fileSystem, "readFile").mockReturnValue(Promise.resolve(mockReadFileData));
        jest.spyOn(dynamicConfigListener, 'serialize').mockReturnValue(mockSerializedData);

        await dynamicConfigListener['onFileChange']()

        expect(config.onChange).toHaveBeenCalledWith(mockSerializedData);
        expect(dynamicConfigListener.dynamicConfig).toBe(mockSerializedData);
        expect(config.onError).not.toHaveBeenCalled();
    });

    it('should handle errors on file change', async () => {
        const mockError = new Error('File not found');
        jest.spyOn(fileSystem, "readFile").mockReturnValue(Promise.reject(new Error("File not found")));

        await dynamicConfigListener['onFileChange']()

        expect(config.onError).toHaveBeenCalledWith(mockError, undefined);
        expect(config.onChange).not.toHaveBeenCalled();
    });
});