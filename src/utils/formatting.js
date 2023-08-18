export const capitalize = (str) => {
  const words = str.split(" ");
  for (let w = 0; w < words.length; w++) {
    words[w] =
      words[w].charAt(0).toUpperCase() + words[w].slice(1).toLowerCase();
  }
  return words.join(" ");
};

export const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const dateFormat =
    date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
  return dateFormat;
};
