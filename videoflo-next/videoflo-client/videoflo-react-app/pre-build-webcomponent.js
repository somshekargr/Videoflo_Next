const fsExtra = require("fs-extra");
const fs = require("fs");

const webComponentSrc = "../videoflo-webcomponent/src/";

async function copyFiles() {
  try {
    await fsExtra.copy("./src/assets/", webComponentSrc + "assets");
    await fsExtra.copy("./src/components/", webComponentSrc + "components");
    await fsExtra.copy("./src/constants/", webComponentSrc + "constants");
    await fsExtra.copy("./src/layout/", webComponentSrc + "layout");
    await fsExtra.copy("./src/models/", webComponentSrc + "models");
    await fsExtra.copy("./src/services/", webComponentSrc + "services");
    await fsExtra.copy("./src/store/", webComponentSrc + "store"); 
    await fsExtra.copy("./src/app.js", webComponentSrc + "app.js");
    await fsExtra.copy("./src/appConfig.js", webComponentSrc + "appConfig.js");
    await fsExtra.copy("./src/index.css", webComponentSrc + "index.css");
    console.log("File Copying to Web-Component is completed"); 
  } catch (err) {
    console.error(
      "Error executing copy function in webComponentPath-copy.js",
      err
    );
  }
}

copyFiles();
