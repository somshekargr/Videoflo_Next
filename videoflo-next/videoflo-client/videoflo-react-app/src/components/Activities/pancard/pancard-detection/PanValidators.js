export const panValidator = (pan) => {
  if (!pan) {
    return "PAN is required";
  } else if (!new RegExp(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/).test(pan)) {
    return "Incorrect PAN format";
  }
  return "";
};

export const nameValidator = (name) => {
  if (!name) {
    return "Name is required";
  }
  return "";
};
