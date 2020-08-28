// import * as testData from '';

const initialBankOfPiecesArr = { current: [ 3, 4, 8, 10, 2, 5, 0, 15, 13, 11, 1, 12, 7, 6, 9, 12, 14 ]};
const placedPieces = [ 3, 5, 8];
const selectedPiece =  13;
const activeBank = true;
const boardArr = [ null, null, 5, null, null, 3, null, null, null, null, null, null, null, 8, null, null ];
const lastPlaced = 13;
const winner = { isCurrPlayer: null, line: null };
const activeBoard = false;
const host = "player1"
const guest = "player2"
const directionString = 'Your friend is selecting...';
const myTurn = true;
const phase = 'selection';
const isCurrPlayer = true;
const draw = false;


export { 
  initialBankOfPiecesArr,
  placedPieces,
  selectedPiece, 
  activeBank,
  boardArr,
  lastPlaced,
  winner,
  activeBoard,
  host,
  guest,
  directionString,
  myTurn,
  phase,
  isCurrPlayer,
  draw
}