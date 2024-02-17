export const shuffleArray = (array = []) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const delay = (milliseconds = 100) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

export const saveResponseAsJson = (response, fileName = "JsonFile") => {
  let str =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(response));
  let dl = document.createElement("a");
  dl.setAttribute("href", str);
  dl.setAttribute("download", fileName + ".json");
  dl.click();
};

//Names to be change
export const isClient = (props, sessionInfo) => {
  return props?.activityData?.activity?.gatherFrom?.includes(sessionInfo.role);
};

//Names to be change
export const isAgent = (props, sessionInfo) => {
  return props?.activityData?.activity?.displayTo?.includes(sessionInfo.role);
};
