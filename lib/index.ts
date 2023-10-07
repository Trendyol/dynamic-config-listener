import { PATH } from './fileSystem/fileSystem.types';
import {
  SerializedData,
  SerializerType,
} from './serialization/serialization.types';
import { getAbsoluteFilePath, readFile } from './fileSystem';
import { getSerializer } from './serialization';
import { FileSystemListener } from './fileSystem/fileSystemListener';

export class DynamicConfig {
  dynamicConfig: SerializedData | undefined;
  absoluteFilePath: string;
  pathType: PATH;
  encoding: BufferEncoding;
  serialization: SerializerType;
  listener: FileSystemListener;
  onChangeDelegate: (newConfig: SerializedData) => void;
  onErrorDelegate: (
    e: Error,
    previousConfig: SerializedData | undefined,
  ) => void;

  constructor(
    filePath: string,
    onChange: (newConfig: object) => void = () => {},
    onError: (e: Error) => void = () => {},
    pathType = PATH.RELATIVE,
    encoding: BufferEncoding = 'utf-8',
    serialization = SerializerType.JSON,
  ) {
    this.absoluteFilePath =
      pathType === PATH.ABSOLUTE ? filePath : getAbsoluteFilePath(filePath);
    this.pathType = pathType;
    this.encoding = encoding;
    this.serialization = serialization;

    this.onChangeDelegate = onChange;
    this.onErrorDelegate = onError;

    this.getDynamicConfig = this.getDynamicConfig.bind(this);
    this.onFileChange = this.onFileChange.bind(this);

    this.listener = new FileSystemListener(
      async () => await this.onFileChange(),
    );
  }

  public async getDynamicConfig() {
    if (this.dynamicConfig) {
      // Already listened
      return this.dynamicConfig;
    }

    const readData = await readFile(this.absoluteFilePath);
    const firstConfigData = getSerializer(this.serialization).serialize(
      readData,
    );
    this.listener.watch(this.absoluteFilePath);

    this.dynamicConfig = firstConfigData;
    return this.dynamicConfig;
  }

  public unWatch() {
    this.listener.unWatch(this.absoluteFilePath);
    this.dynamicConfig = undefined;
  }

  private async onFileChange() {
    try {
      const readData = await readFile(this.absoluteFilePath);
      const updatedConfigData = getSerializer(this.serialization).serialize(
        readData,
      );
      this.dynamicConfig = updatedConfigData;
      this.onChangeDelegate(updatedConfigData);
    } catch (err) {
      this.onErrorDelegate(err as Error, this.dynamicConfig);
    }
  }
}
