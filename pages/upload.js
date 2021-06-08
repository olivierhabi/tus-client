import React from "react";
import ReactDOM from "react-dom";
// import Uppy from "@uppy/core";
// import "@uppy/core/dist/style.css";
// import "@uppy/dashboard/dist/style.css";
// import "@uppy/status-bar/dist/style.css";
// import { Dashboard, GoogleDrive, StatusBar } from "@uppy/react";
import Pupload from "../Components/Upload";
// const AwsS3 = require("@uppy/aws-s3");

const Upload = () => {
  // const uppy = Uppy({
  //   id: "studioPhotos",
  //   autoProceed: false,
  //   debug: true,
  //   restrictions: { minNumberOfFiles: 1, allowedFileTypes: ["image/*"] },
  // });
  // const uppy = new Uppy();

  // uppy.use(AwsS3, {
  //   limit: 2,
  //   // timeout: ms("1 minute"),
  //   companionUrl: "https://uppy-companion.myapp.com/",
  // });
  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pupload />
          {/* <Dashboard inline={true} height={420} uppy={uppy} /> */}
          {/* <StatusBar inline={true} height={420} uppy={uppy} /> */}
        </div>
        <div>hello</div>
      </div>
    </>
  );
};

export default Upload;
