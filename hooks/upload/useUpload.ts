import { useState, useEffect } from 'react';
import auth from '../../auth/auth';

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useUpload() {
  const [uploadProgress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [uploadResponse, setUploadResponse] = useState({});
  const [xhrObj, setXHR] = useState<XMLHttpRequest>();
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;

  // @ts-ignore: Unreachable code error
  const startUpload = (file, uploadPath) => {
    var data = new FormData();
    data.append('payLoad', file[0], file[0].path);
    data.append('isMulti', 'false');
    data.append('uploadLocation', uploadPath);

    var xhr = new XMLHttpRequest();
    setXHR(xhr);
    // listen for `upload.load` event
    xhr.upload.onload = () => {
      console.log(`The upload is completed: ${xhr.status} ${xhr.response}`);
    };

    // listen for `upload.error` event
    xhr.upload.onerror = () => {
      console.error('Upload failed.');
      setUploadError(true);
    };

    // listen for `upload.abort` event
    xhr.upload.onabort = () => {
      console.error('Upload cancelled.');
    };

    // listen for `progress` event
    xhr.upload.onprogress = (event) => {

      setProgress((event.loaded / event.total) * 100);
    };

    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        let img_upload = JSON.parse(this.responseText);
        if (img_upload.status) {
          setUploadResponse(img_upload.data[0]);
        }
      }
    });

    xhr.open('POST', `${process.env.API_URL}/upload`);
    xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);

    xhr.send(data);
  };
  const deleteUpload = () => { };
  const cancelUpload = (req: XMLHttpRequest) => {
    try {
      req.abort();
    } catch (e) { }
  };
  return [
    startUpload,
    cancelUpload,
    deleteUpload,
    uploadResponse,
    uploadProgress,
    uploadError,
    xhrObj,
  ];
}
