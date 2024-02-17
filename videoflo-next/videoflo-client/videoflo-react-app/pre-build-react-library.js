const fs = require('fs-extra');

const libraryPath = '../library/src/lib/';

async function copyFiles() {

  try { 
    await fs.copy('./src/assets/', libraryPath + 'assets');
    await fs.copy('./src/components/', libraryPath + 'components');
    await fs.copy('./src/constants/', libraryPath + 'constants');
    await fs.copy('./src/layout/', libraryPath + 'layout');
    await fs.copy('./src/models/', libraryPath + 'models');
    await fs.copy('./src/services/', libraryPath + 'services');
    await fs.copy('./src/store/', libraryPath + 'store');
    await fs.copy('./src/app.js', libraryPath + '../app.js');

  } catch (err) {
    console.error('Error executing copy function in library-copy.js', err);
  }
}

copyFiles();


