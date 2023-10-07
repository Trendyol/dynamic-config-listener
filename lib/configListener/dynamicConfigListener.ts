import { SerializedData, SerializeFunc } from '../helper/serialization/serialization.types';
import { readFile } from '../helper/fileSystem/fileUtil';
import { serializers } from "../helper/serialization/serializers";
import { DynamicConfigOptions } from "../index.types";
import { FileSystemListener } from "../helper/fileSystem/fileSystemListener";

export default class DynamicConfigListener {
  dynamicConfig: SerializedData | undefined;
  config: DynamicConfigOptions;
  listener: FileSystemListener;
  serialize: SerializeFunc;

  constructor(config: DynamicConfigOptions) {
    this.config = config;
    this.listener = new FileSystemListener(async () => await this.onFileChange());
    this.serialize = serializers[this.config.serialization].serialize;
  }

  public async getDynamicConfig() {
    if (this.dynamicConfig) {
      return this.dynamicConfig;
    }

    const readData = await readFile(this.config.file);
    const firstConfigData = this.serialize(readData);
    this.listener.watch(this.config.file);

    this.dynamicConfig = firstConfigData;
    return this.dynamicConfig;
  }

  public unWatch() {
    this.listener.unWatch(this.config.file);
    this.dynamicConfig = undefined;
  }

  private async onFileChange() {
    const { file, onChange, onError } = this.config;

    try {
      const readData = await readFile(file);
      const updatedConfigData = this.serialize(readData);

      this.dynamicConfig = updatedConfigData;
      onChange(updatedConfigData);
    } catch (err) {
      onError(err as Error, this.dynamicConfig);
    }
  }
}
