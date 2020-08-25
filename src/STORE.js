// [color, size, shape, consistency]
// pink = 0 --- blue = 1
// large = 0 --- small = 1
// circle = 0 --- square = 1
// hollow = 0 --- solid = 1
const pieceAttributes = [
  [0, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 0, 1, 1],
  [0, 1, 0, 0],
  [0, 1, 0, 1],
  [0, 1, 1, 0],
  [0, 1, 1, 1],
  [1, 0, 0, 0],
  [1, 0, 0, 1],
  [1, 0, 1, 0],
  [1, 0, 1, 1],
  [1, 1, 0, 0],
  [1, 1, 0, 1],
  [1, 1, 1, 0],
  [1, 1, 1, 1],
];

const lines = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

const movesArr = [
  { placement: null, selection: 1 },
  { placement: 15, selection: 5 },
  { placement: 3, selection: 0 },
  { placement: 0, selection: 6 },
  { placement: 4, selection: 8 },
  { placement: 12, selection: 11 },
  { placement: 8, selection: 14 },
];

const guest = 'Toby';
const host = 'Terrence';
const currPlayer = undefined;

export { pieceAttributes, lines, movesArr, guest, host, currPlayer }
