
# User guide: Package installation, setup and usage

**@build-in-blocks/dev.resources** package contains preconfigured `webpack` setup for both development and production environment. After installation in your web project (and with very minimal intervention on your end), you just need to run `npm run dev` to generate a development mode bundle or `npm run build` to generate a well optimized production mode bundle.

#

### User installation instructions

User installation and setup instructions can in the [root README.md](https://github.com/build-in-blocks/dev.resources).

#

### Technical documentation

- **`blocksTerminalLogger` (Utility & Interface)**

    A specialized terminal logging utility for the `@build-in-blocks` ecosystem. It provides standardized error formatting, separates internal framework issues from user application errors, and can provide contextual suggestions before optionally terminating the process.

    **Syntax**

    ````
    blocksTerminalLogger({ ...options });
    ````

    **Interface definition**

    ````
    export interface BlocksTerminalLogger {
        internalPackage?: {
            fullName?: string;
            errorMessage?: string;
        };
        userApp?: {
            fullName?: string;
            errorMessage?: string;
        };
        errorSource?: boolean;
        suggestion?: {
            blocksConfig?: {
                showCurrentState?: boolean;
                referenceMessage?: string;
            };
            messageList?: string[];
        };
        originalErrorMessage?: Error;
        processExit?: boolean;
    }
    ````

    **Parameters / Properties**

    |Property | Type| Required| Description|
    |:-- |:-- |:-- |:-- |
    |`internalPackage` |`object` |No |Has optional properties `fullName` and `errorMessage`, useful for logging a custom internal framework error.|
    |`userApp` |`object` |No |Has optional properties `fullName` and `errorMessage`, useful for logging a custom message for a blocks web app.|
    |`errorSource` |`boolean` |No |If `true`, explicitly prints the source of the error pointing to the internal package.|
    |`suggestion` |`object` |No |Provides info helpful for troubleshooting. Has optional properties: `messageList` of strings to be printed as individual lines (and `blocksConfig` which is for helping users to track the state of their wep app's blocks config file).|
    |`originalErrorMessage` |`Error` |No |Prints the raw JavaScript Error object/stack trace for deep debugging.|
    |`processExit` |`boolean` |No |If `true`, executes `process.exit(1)` immediately after logging.|

    **Usage Example**

    ````
    import { blocksTerminalLogger } from '@build-in-blocks/dev.resources';
    try {
        // Some internal logic...
    } catch (err) {
       blocksTerminalLogger({
            userApp: {
                fullName: 'my-web-app',
                errorMessage: 'Could not find the entry file "main.ts".'
            },
            suggestion: {
                messageList: [
                    'Ensure "main.ts" exists in your src folder.',
                    'Update your BlocksConfig to match your file name.'
                ]
            },
            processExit: true // Stops the build process
        }); 
    }
    ````

    #

- **`BlocksConfig` (Interface)**

    The `BlocksConfig` interface defines the structure for a web app or web lobrary's **@build-in-blocks** configuration object. It also allows developers to override default build behaviors, specifically for development environments.

    **Definition**

    ````
    export interface BlocksConfig {
        devBuild?: {
            srcCodeFolder?: string;
            entryFileName?: string;
            devServer?: {
                port?: number;
                open?: boolean;
            };
        };
    }
    ````

    **Properties**

    |Property | Type| Required| Description|
    |:-- |:-- |:-- |:-- |
    |`devBuild` |`object` |No |Settings for the development build process.|
    |`devBuild.srcCodeFolder` |`string` |No |The path to the source directory. Overrides the default 'src'.|
    |`devBuild.entryFileName` |`string` |No |The name of the main entry file (without extension). Overrides the default 'index'.|
    |`devBuild.devServer` |`object` |No |Configuration for the local development server.|
    |`devBuild.devServer.port` |`number` |No |The port the dev server should run on. Overrides the default `3000`.|
    |`devBuild.devServer.open` |`boolean` |No |Whether to automatically open the browser on start. Set to `true`, to override the default.|

    **Usage Example**

    **1. Defining a Custom Configuration**

    You can use the interface to type-check your configuration objects:

    ````
    import { BlocksConfig } from '@build-in-blocks/dev.resources';

    const myConfig: BlocksConfig = {
        devBuild: {
            srcCodeFolder: 'app',
            entryFileName: 'main',
            devServer: {
                port: 5800,
                open: true,
            },
        },
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
    |`srcCodeFolder` |`string` |`'src'` |The name of the directory where source files are located. |
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

    const defaultEntryPoint = `${_default.srcCodeFolder}/${_default.entryFileName}${_default.fileExtension}`;

    console.log(`Looking for entry file at: ${defaultEntryPoint}`);
    ````

    **2. Implementing default fallback**

    Combine the usage example from `BlocksConfig` (Interface) docs with the code below:

    ````
    import { _default } from '@build-in-blocks/dev.resources';

    const root = myConfig.devBuild?.srcCodeFolder || _default.srcCodeFolder;
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
