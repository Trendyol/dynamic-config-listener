import fs, { StatsListener } from 'fs';

export class FileSystemListener {
  private readonly listener: StatsListener;
  private isListening: boolean;

  constructor(listener: StatsListener) {
    this.listener = listener;
    this.isListening = false;
  }

  watch(filePath: string) {
    if (this.isListening) {
      return;
    }

    fs.watchFile(filePath, this.listener);
    this.isListening = true;
  }

  unWatch(filePath: string) {
    if (!this.isListening) {
      return;
    }

    fs.unwatchFile(filePath, this.listener);
    this.isListening = false;
  }
}