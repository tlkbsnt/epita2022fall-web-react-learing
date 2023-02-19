import fileDownload from 'js-file-download';

export class GeneralUtility {
  downloadFile = (fileData: Blob, nameOfFile: string) => {
    fileDownload(fileData, nameOfFile);
  };

  getTimeStampInSeconds = () => {
    return Math.floor(Date.now() / 1000);
  };
}

export default GeneralUtility;
