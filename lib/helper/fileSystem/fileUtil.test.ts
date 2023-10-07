import { readFile, getAbsoluteFilePath } from './fileUtil';
import fs from 'fs';
import path from 'path';
import * as process from 'process';

// @ts-ignore
jest.spyOn(fs, 'readFile').mockImplementation((file: string, config: object, callback: any) => {
    callback(null, 'Test data');
});

describe('readFile', () => {
    it('should read a file and return its content', async () => {
        // When
        const content = await readFile('test.txt');

        // Then
        expect(content).toBe('Test data');
        expect(fs.readFile).toHaveBeenCalledWith('test.txt', {"encoding": "utf8"}, expect.any(Function));
    });

    it('should read a file with specified encoding', async () => {
        // When
        const content = await readFile('test.txt', 'utf-8');

        // Then
        expect(content).toBe('Test data');
        expect(fs.readFile).toHaveBeenCalledWith('test.txt', {"encoding": "utf-8"}, expect.any(Function));
    });

    it('should handle errors when reading a file', async () => {
        // Given
        // @ts-ignore
        jest.spyOn(fs, 'readFile').mockImplementationOnce((file: string, config: object, callback: any) => {
            callback(new Error('File not found'), {} as Buffer);
        });

        try {
            // When
            await readFile('nonexistent.txt');
        } catch (error) {
            // Then
            expect(error).toEqual(new Error('File not found'));
        }
    });
});

describe('getAbsoluteFilePath', () => {
    it('should return the absolute file path', () => {
        // Given
        const filePath = 'test.txt';
        const expectedPath = path.join(process.cwd(), filePath);

        // When
        const absolutePath = getAbsoluteFilePath(filePath);

        // Then
        expect(absolutePath).toBe(expectedPath);
    });
});