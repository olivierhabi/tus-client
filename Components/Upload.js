// import { Meta } from '@storybook/react';
import { useCallback, useMemo, useRef, useState } from "react";
import { ProgressBar } from "./ProgressBar";

import { useTus, TusClientProvider } from "use-tus";
import { BasicButton } from "./BasicButton";
import { defaultOptions } from "./ProgressBar/constants";

const Basic = () => (
  <TusClientProvider>
    <Uploader />
  </TusClientProvider>
);

const Uploader = () => {
  const inputRef = useRef(null);
  const { upload, setUpload, isSuccess } = useTus({
    autoStart: true,
  });
  const [progress, setProgress] = useState(0);
  const uploadedUrl = useMemo(() => isSuccess && upload?.url, [
    upload,
    isSuccess,
  ]);

  const handleOnSelectFile = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
  };

  const handleOnSetUpload = useCallback(
    (event) => {
      const file = event.target.files.item(0);

      if (!file) {
        return;
      }

      setUpload(file, {
        ...defaultOptions,
        chunkSize: 20000,
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        onError: function (error) {
          console.log("Failed because: " + error);
        },
        onProgress: (bytesSent, bytesTotal) => {
          setProgress(Number(((bytesSent / bytesTotal) * 100).toFixed(2)));
        },
        onSuccess: function () {
          console.log("Download %s from %s", upload.file.name, upload.url);
        },
      });
    },
    [setUpload]
  );

  const handleOnStart = useCallback(() => {
    if (!upload) {
      return;
    }

    upload.start();
  }, [upload]);

  const handleOnAbort = useCallback(async () => {
    if (!upload) {
      return;
    }

    await upload.abort();
  }, [upload]);

  const fileName = inputRef.current?.files?.item(0)?.name;

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ margin: 0 }}>use-tus</p>
        <p style={{ margin: 0 }}>File: {fileName || "no selected"}</p>
        <input hidden type="file" onChange={handleOnSetUpload} ref={inputRef} />
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <BasicButton
            title="Select an image"
            styleColor="basic"
            onClick={handleOnSelectFile}
          />
          <BasicButton
            title="Resume"
            styleColor="primary"
            onClick={handleOnStart}
            disabled={!upload?.abort}
          />
          <BasicButton
            title="Abort"
            styleColor="error"
            onClick={handleOnAbort}
            disabled={!upload}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ProgressBar value={progress} />
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {uploadedUrl && (
          <img
            src={uploadedUrl}
            alt="upload"
            style={{
              display: "inline-block",
              width: "400px",
              height: "400px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Basic;
