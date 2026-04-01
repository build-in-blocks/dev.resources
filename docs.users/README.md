
# User guide: Package installation, setup and usage

**@build-in-blocks/dev.resources** package contains preconfigured `webpack` setup for both development and production environment. After installation in your web project (and with very minimal intervention on your end), you just need to run `npm run dev` to generate a development mode bundle or `npm run build` to generate a well optimized production mode bundle.

#

### User installation instructions

User installation and setup instructions can in the [root README.md](https://github.com/build-in-blocks/dev.resources).

#

### Technical documentation

- **`BlocksConfig` (Interface)**

    The `BlocksConfig` interface defines the structure for a app's **@build-in-blocks** configuration object. It also allows developers to override default build behaviors, specifically for development environments.

    **Definition**

    ````
    export interface BlocksConfig {
        devBuild?: {
            srcFolderRoot?: string;
            entryFileName?: string;
        };
    }
    ````

    **Properties**

    |Property | Type| Required| Description|
    |:-- |:-- |:-- |:-- |
    |`devBuild` |`object` |No |A nested object containing settings specific to the development build process. |
    |`devBuild.srcFolderRoot` |`string` |No |The path to the source directory. Overrides the default `'src'`. |
    |`devBuild.entryFileName` |`string` |No | The name of the main entry file (without extension). Overrides the default `'index'`.|

    **Usage Example**

    **1. Defining a Custom Configuration**

    You can use the interface to type-check your configuration objects:

    ````
    import { BlocksConfig } from '@build-in-blocks/dev.resources';

    const myConfig: BlocksConfig = {
        devBuild: {
            srcFolderRoot: 'app',
            entryFileName: 'main'
        }
    };
    ````

    **2. Implementing default fallback**

    See `_default` docs below for how you can implement fallback to default blocks config values.

    #

- **`_default` (Configuration Object)**

    The `_default` object defines the fallback project structure and naming conventions for the **@build-in-blocks** framework. It is primarily used when explicit overrides are not provided by the user.

    **Properties**

    |Property | Type| Default| Description|
    |:-- |:-- |:-- |:-- |
    |`srcFolderRoot` |`string` |`'src'` |The name of the directory where source files are located. |
    |`entryFileName` |`string` |`'index'` |The base name of the main entry point file. |
    |`fileExtension` |`string` |`'.ts'` |The default file extension for the project (includes the leading dot). |

    **Usage Example**
    
    **1. Construct paths dynamically**
    
    You can use this object to construct paths dynamically while maintaining consistency with **@build-in-blocks** framework's expectations:

    ````
    import { _default } from '@build-in-blocks/dev.resources';

    /**
    * Example: Constructing the default entry path
    * Result: "src/index.ts"
    */

    const defaultEntryPoint = `${_default.srcFolderRoot}/${_default.entryFileName}${_default.fileExtension}`;

    console.log(`Looking for entry file at: ${defaultEntryPoint}`);
    ````

    **2. Implementing default fallback**

    Combine the usage example from `BlocksConfig` (Interface) docs with the code below:

    ````
    import { _default } from '@build-in-blocks/dev.resources';

    const root = myConfig.devBuild?.srcFolderRoot || _default.srcFolderRoot;
    console.log(`Starting build from: ${root}`);
    ````

    #

- **`getCurrentFolderContent`**

    Reads the contents of a specified directory synchronously. This function is a wrapper around Node’s `fs.readdirSync`, designed to handle errors through a provided callback function rather than throwing them directly.

    **Syntax**

    ````
    getCurrentFolderContent({ workingDirectory, errorFunc });
    ````

    **Parameters**

    The function accepts a single configuration object with the following properties:

    |Property | Type| Required| Description|
    |:-- |:-- |:-- |:-- |
    |`workingDirectory` |`string` |Yes | The absolute or relative path to the directory you want to read.|
    |`errorFunc` |`Function` |Yes |A callback triggered if the directory cannot be read (e.g., path not found, permission denied). |

    **The `errorFunc` Object:**
    
    The callback receives an object containing:

    - `error`: An `Error` object (if the error is an instance of `Error`) or `undefined`.

    **Return Value**
    
    - **Success:** Returns an array of strings (`string[]`), representing the names of the files and folders within the directory (excluding `.` and `..`).

    - **Failure:** Returns `undefined` after executing the `errorFunc` callback.

    **Usage Example**

    ````
    import { getCurrentFolderContent } from '@build-in-blocks/dev.resources';

    const folderContent = getCurrentFolderContent({
        workingDirectory: './src/components',
        errorFunc: ({ error }) => {
            console.error('Failed to access directory:', error?.message);
            // Handle your UI updates or logging here
        },
    });

    if (folderContent) {
        console.log('Directory contents:', folderContent);
    }
    ````
    
    #
