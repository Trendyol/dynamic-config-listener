# Dynamic Config Listener

`dynamic-config-listener` is a Node.js library designed to streamline the process of monitoring changes 
in configuration files within the file system. Through the use of an `onChange` callback, users can receive instantaneous 
notifications whenever alterations are made to the configuration. Then, it serialized the up-to-date config to specified 
serialization type. 

Moreover, for situations where direct callback listening might not be preferable, the library offers a `readData` 
feature that allows for seamless retrieval of the most up-to-date configuration with optimal performance. 
This dual functionality ensures that users have the flexibility to choose the method that best suits their specific 
needs, enhancing the overall adaptability and efficiency of the library.

## Installation

You can install **dynamic-config-listener** via npm:

```bash
npm install dynamic-config-listener
```

## Usage

```
import ListenerBuilder, { FilePathType, SerializerType } from 'dynamic-config-listener';

const configListener = ListenerBuilder.builder('path/to/config.json')
  .setPathType(FilePathType.RELATIVE) // Set path type (optional, default is 'RELATIVE')
  .setEncoding('utf-8') // Set encoding (optional, default is 'utf-8')
  .setSerialization(SerializerType.JSON) // Set serialization type (optional, default is 'JSON')
  .setOnError((error, previousConfig) => {
    console.error('Error:', error);
    if (previousConfig) {
      console.log('Previous config:', previousConfig);
    }
  }) // Set error handler (optional)
  .build();

// Read the most-up-to-date data and start listening for config changes. 
// Retriggering of this method won't effect the performance since it use previous listener if exist
const data = await configListener.readData();

// To stop listening of config changes
configListener.stop();
```

## API Reference

### `ListenerBuilder`

#### `builder(file: string)`: Static method that creates a new instance of `ListenerBuilder`.
- `file`: Path to the configuration file.

#### `setPathType(pathType: FilePathType): ListenerBuilder`: Sets the type of file path (absolute or relative).
- `pathType`: One of `FilePathType.ABSOLUTE` or `FilePathType.RELATIVE`.

#### `setEncoding(encoding: BufferEncoding): ListenerBuilder`: Sets the encoding for reading the configuration file. Default is `'utf-8'`.

- `encoding`: The encoding type (e.g., `'utf-8'`, `'ascii'`, etc.).

#### `setSerialization(serialization: SerializerType): ListenerBuilder`: Sets the serialization type for the configuration data. Default is `SerializerType.JSON`.

- `serialization`: One of `SerializerType.JSON` or `SerializerType.RAW`.

#### `setOnError(onError: (e: Error, previousConfig: SerializedData | undefined) => void): ListenerBuilder`: Sets the error handler for any encountered errors.

- `onError`: Callback function to handle errors.

#### `build(): DynamicConfigListener`: Builds the `DynamicConfigListener` instance with the specified options.

### `DynamicConfigListener`

#### `readData(): Promise<SerializedData>`: Read and serialize data. Also starts listening for configuration changes.

#### `stop(): void`: Stops listening for configuration changes.

## Types

### `DynamicConfigOptions`

Options for configuring the `DynamicConfigListener`.

- `file`: Path to the configuration file.
- `pathType`: Type of file path (absolute or relative).
- `encoding`: Encoding for reading the configuration file.
- `serialization`: Serialization type for the configuration data.
- `onChange`: Callback function to be executed when the configuration changes.
- `onError`: Callback function to handle errors.

### `FilePathType`

Enum for specifying the type of file path.

- `ABSOLUTE`: Absolute file path.
- `RELATIVE`: Relative file path.

### `SerializedData`

Data structure containing both the raw and serialized representation of the configuration.

- `raw`: Raw string data from the file.
- `serialized`: Serialized object (if applicable).

### `SerializerType`

Enum for specifying the type of serialization.

- `JSON`: JSON serialization.
- `RAW`: Raw serialization.

## Contributing
Feel free to contribute by opening issues or pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/BahadirYurdakul/dynamic-config-listener/blob/main/LICENSE) file for details.
