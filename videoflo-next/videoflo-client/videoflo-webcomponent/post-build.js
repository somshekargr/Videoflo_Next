const mergeFiles = require("merge-files");
const fs = require("fs-extra");
//1. Merge JS and store in output directory
const outputPath = __dirname + "/output/videoflo-webcomponent.js";
var inputPathList = fs
  .readdirSync(__dirname + "/build/static/js/")
  .filter((file) => {
    return file.match(/.js$/i);
  })
  .map((filename) => __dirname + "/build/static/js/" + filename);

async function merge() {
  try {
    const status = await mergeFiles(inputPathList, outputPath); 
    if(status) console.log(`success: [${outputPath}]`);
  } catch (error) {
    console.error("Error executing merge function", error);
  }
}
merge();

//2. Copy Css File to Output Directory
var cssFilePath = fs
  .readdirSync(__dirname + "/build/static/css/")
  .filter((file) => {
    return file.match(/chunk[a-z]*.css$/i);
  })
  .map((filename) => __dirname + "/build/static/css/" + filename);
cssFilePath.forEach((css_file, i) => {
  const fileName =
    i == 0 ? "videoflo-webcomponent" : `videoflo-webcomponent-${i}`;
  fs.copyFile(css_file, __dirname + `/output/${fileName}.css`, (err) => {
    if (err) throw err;
    console.log(`success: [${fileName}.css]`);
  });
});

 