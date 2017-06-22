export const apiUrl = 'https://unsplash.it/200/200?image=';

//images min max values(photo service parameters)
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
        pairFind: false
      };
    });
};

export const createCells = (cellsCount) => {
  let randomImagesArray = createImagesArray(cellsCount / 2);
  let copyArray = JSON.parse(JSON.stringify(randomImagesArray));
  let doubleArray = randomImagesArray.concat(copyArray);

  return [...new Array(cellsCount)].map(() => {
    let randomElem = Math.floor(Math.random() * doubleArray.length);
    return doubleArray.splice(randomElem, 1)[0];
  });
};

export const getBoardWidth = (size) => {
  if (size === 16) {
    return 'cells-4';
  } else if (size === 36) {
    return 'cells-6';
  } else if (size === 64) {
    return 'cells-8';
  }
};

export const checkWin = (array) => {
  return array.every((elem)=> elem.complete === true);
};
