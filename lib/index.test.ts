import ListenerBuilder from './index';
import DynamicConfigListener from './configListener/dynamicConfigListener';
import { FilePathType } from './helper/fileSystem/fileSystem.types';
import { SerializerType } from './helper/serialization/serialization.types';

jest.mock('./configListener/dynamicConfigListener');

describe('ListenerBuilder', () => {
    it('should build a DynamicConfigListener with default options', () => {
        const onChange = jest.fn();
        const builder = new ListenerBuilder('config.json', onChange);
        const listener = builder.build();

        expect(DynamicConfigListener).toHaveBeenCalledWith({
            file: 'config.json',
            onChange: expect.any(Function),
            pathType: FilePathType.RELATIVE,
            encoding: 'utf-8',
            serialization: SerializerType.JSON,
            onError: expect.any(Function),
        });
        expect(listener).toBeInstanceOf(DynamicConfigListener);
    });

    it('should build a DynamicConfigListener with custom options', () => {
        const onChange = jest.fn();
        const builder = new ListenerBuilder('config.json', onChange)
            .setPathType(FilePathType.ABSOLUTE)
            .setEncoding('base64')
            .setSerialization(SerializerType.RAW)
            .setOnError(() => {});

        const listener = builder.build();

        expect(DynamicConfigListener).toHaveBeenCalledWith({
            file: expect.any(String),
            onChange: expect.any(Function),
            pathType: FilePathType.ABSOLUTE,
            encoding: 'base64',
            serialization: SerializerType.RAW,
            onError: expect.any(Function),
        });
        expect(listener).toBeInstanceOf(DynamicConfigListener);
    });
});