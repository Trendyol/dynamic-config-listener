import fs from "fs";
import { FileSystemListener } from "./fileSystemListener";

jest.mock('fs', () => ({
    watchFile: jest.fn(),
    unwatchFile: jest.fn()
}));

describe('FileSystemListener', () => {
    let listener: FileSystemListener;
    let statsListener: any;

    beforeEach(() => {
        statsListener = jest.fn();
        listener = new FileSystemListener(statsListener);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should watch file', () => {
        const filePath = 'testFile.txt';

        listener.start(filePath);

        expect(fs.watchFile).toHaveBeenCalledWith(filePath, statsListener);
        expect(listener['isListening']).toBe(true);
    });

    it('should not watch file if already listening', () => {
        const filePath = 'testFile.txt';

        listener.start(filePath);
        listener.start(filePath);

        expect(fs.watchFile).toHaveBeenCalledTimes(1);
        expect(listener['isListening']).toBe(true);
    });

    it('should unwatch file', () => {
        const filePath = 'testFile.txt';

        listener.start(filePath);
        listener.stop(filePath);

        expect(fs.unwatchFile).toHaveBeenCalledWith(filePath, statsListener);
        expect(listener['isListening']).toBe(false);
    });

    it('should not unwatch file if not listening', () => {
        const filePath = 'testFile.txt';

        listener.stop(filePath);

        expect(fs.unwatchFile).not.toHaveBeenCalled();
        expect(listener['isListening']).toBe(false);
    });
});