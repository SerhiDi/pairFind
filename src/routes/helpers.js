export const formatSeconds = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};


const IMAGE_MAX_INDEX = 50;

let createImagesArray = (arrayLength) => {
  const imagesIndexes = [...new Array(IMAGE_MAX_INDEX)].map((_, i) => {
    return i + 1;
  });

  return [...new Array(arrayLength)]
    .map(() => {
      let randomElem = Math.floor(Math.random() * imagesIndexes.length);
      return {
        index: imagesIndexes.splice(randomElem, 1)[0],
        show: false,
        complete: false,
        pairFind: false
      };
    });
};

export const createCellsArray = (cellsCount) => {
  let randomImagesArray = createImagesArray(cellsCount / 2);
  let copyArray = JSON.parse(JSON.stringify(randomImagesArray));
  let doubleArray = randomImagesArray.concat(copyArray);

  return [...new Array(cellsCount)].map(() => {
    let randomElem = Math.floor(Math.random() * doubleArray.length);
    return doubleArray.splice(randomElem, 1)[0];
  });
};
