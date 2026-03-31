import fs from 'fs';

const getCurrentFolderContent = ({ workingDirectory, errorFunc }: { workingDirectory: string; errorFunc: ({ error }: { error?: Error }) => void }) => {
  try {
    const rootDirContent = fs.readdirSync(workingDirectory);
    return rootDirContent;
  } catch (error) {
    // comment out to prevent from showing to user for now...
    // console.log(`Action: GET; Directory path: ${workingDirectory}\n`, '', err);
    //
    errorFunc({ error: error instanceof Error ? error : undefined });
  }
};

export { getCurrentFolderContent };
