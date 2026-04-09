export interface BlocksTerminalLogger {
  startLoggerMessageOnNewLine?: boolean;
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
  originalErrorMessage?: Error; // TODO: Check that this error type is correct later
  processExit?: boolean;
}
