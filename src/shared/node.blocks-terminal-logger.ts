import { BlocksTerminalLogger } from './types/node.blocks-logger.types';

export const blocksTerminalLogger = ({ internalPackage, userApp, errorSource, suggestion, originalErrorMessage, processExit }: BlocksTerminalLogger) => {
  //-
  const messageListDisplay = ({ noNewLineAtEnd }: { noNewLineAtEnd?: boolean }) => {
    //-
    const messageList = suggestion?.messageList;
    if (!messageList) return;
    //-
    messageList.forEach((message, index) => {
      const isLastMessage = index === messageList.length - 1;
      const isAppendNewLineRequested = isLastMessage && !noNewLineAtEnd;
      console.error(`${message}${isAppendNewLineRequested ? '\n' : ''}`);
    });
  };
  //-
  try {
    const isInternalPackageErrorRequested = internalPackage?.fullName && internalPackage.errorMessage;
    const isUserAppErrorRequested = userApp?.fullName && userApp.errorMessage;
    const isSuggestionRequested = suggestion?.messageList?.length;
    //-
    const internalPackageNameText = `${internalPackage?.fullName} (internal)`;
    const suggestionSectionTitle = `Suggestion${suggestion?.blocksConfig?.showCurrentState ? ' (based on current blocks config state)' : ''}:`;
    //-
    if (isInternalPackageErrorRequested) {
      console.error('--------------------------');
      console.error('ERROR |', `${internalPackageNameText}:`);
      console.error('Type generation failed.');
    }
    //-
    if (isUserAppErrorRequested) {
      console.error('--------------------------');
      console.error('ERROR |', `${userApp?.fullName} (your app):`);
      console.error(userApp.errorMessage);
    }
    //-
    if (errorSource) {
      console.error('--------------------------');
      console.error(`ERROR SOURCE => ${internalPackageNameText}`);
    }
    //-
    if (isSuggestionRequested && !suggestion?.blocksConfig?.showCurrentState) {
      console.error('--------------------------');
      console.error(suggestionSectionTitle);
      messageListDisplay({});
    }
    //-
    if (isSuggestionRequested && suggestion?.blocksConfig?.showCurrentState) {
      console.error('--------------------------');
      console.error(`Your blocks config current state:`);
      console.error(suggestion?.blocksConfig.referenceMessage);
      console.error('--------------------------');
      console.error(suggestionSectionTitle);
      messageListDisplay({
        noNewLineAtEnd: true,
      });
    }
    //-
    if (originalErrorMessage) {
      console.error('--------------------------');
      console.error('ORIGINAL ERROR:\n', originalErrorMessage);
    }
  } catch (error) {
    console.error('--------------------------');
    console.error('ERROR |', `@build-in-blocks/dev.resources (internal):`);
    console.error('Error log failed.');
    console.error('--------------------------');
    console.error('ORIGINAL ERROR:\n', error);
  }
  //-
  if (processExit) {
    process.exit(1);
  }
};
