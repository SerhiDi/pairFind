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
  return 'cells-' + Math.sqrt(size);
};

export const checkWin = (array) => {
  return array.every((elem) => elem.complete === true);
};
