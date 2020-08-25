function whosTurn(moves, guest, host) {
  if (moves.length === 0) return host;
  if (
    moves.length % 2 === 1 &&
    moves[moves.length - 1].selection !== undefined
  ) {
    return guest;
  }
  if (moves.length % 2 === 0 && moves[moves.length - 1].selection === undefined) {
    return guest;
  }
  return host;
}

// phase
function getPhase(moves) {
  if (moves.length === 0) return 'selection';
  if (moves[moves.length - 1].selection === undefined) return 'selection';
  return 'placement';
}

// selectedPiece
function getSelectedPiece(moves) {
  if (moves.length === 0) return null;
  if (moves[moves.length - 1].selection === undefined) return null;
  return moves[moves.length - 1].selection;
}

// boardArr
function deriveBoardArr(moves) {
  const boardArr = new Array(16).fill(null);
  for (let i = 1; i < moves.length; i++) {
    const selectedPiece = moves[i - 1].selection;
    const boardLocation = moves[i].placement;
    boardArr[boardLocation] = selectedPiece;
  }
  return boardArr;
}

// lastPlaced
function getLastPlaced(moves) {
  if (moves.length === 0) return null;
  return moves[moves.length - 1].placement;
}

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function randomizeArray(inputArr) {
  function getRandomIndex() {
    return Math.floor(Math.random() * Math.floor(inputArr.length - 1));
  }

  for (let i = 0; i < inputArr.length; i++) {
    const randomIndex = getRandomIndex();
    swap(inputArr, i, randomIndex);
  }

  return inputArr;
}

// initialBankOfPiecesArr
function getRandomizedBankOfPiecesArr() {
  return randomizeArray([...Array(16).keys()]);
}

// bankOfPieces
function derivePlacedPieces(moves) {
  const placedPieces = [];
  moves.forEach(move => {
    placedPieces.push(move.selection);
  });
  return placedPieces.slice(0, placedPieces.length - 1);
}

// createDirectionString
function createDirectionString(turn, phase, currPlayer, guest) {
  if (!guest) return 'Waiting for your friend to join...';

  const myTurn = turn === currPlayer;

  if (!myTurn && phase === 'selection') return 'Your friend is selecting...';

  if (!myTurn && phase === 'placement') return 'Your friend is placing...';

  if (phase === 'selection') return 'SELECT a piece for your opponent';

  return 'PLACE the selected piece on the board';
}

// determine if winner - returns winning line
function checkForWinningLine(boardArr, lines, pieceAttributes) {
  // find lines that are full of pieces
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    // map values from pieces onto boardArr @ lineIndex
    const lineWithPieces = lines[lineIndex].map(boardIndex => {
      const currPieceIndex = boardArr[boardIndex];
      return pieceAttributes[currPieceIndex];
    });

    // check for empty square in line -> if so, skip on to next line
    if (lineWithPieces.includes(undefined)) continue;

    // test if line has winner
    for (let attributeIndex = 0; attributeIndex < 4; attributeIndex++) {
      // sum all similar attributes of line. If sum is 0 or 4 then you have a winner.
      let sumOfAttributeValues = 0;
      for (let pieceIndex = 0; pieceIndex < 4; pieceIndex++) {
        sumOfAttributeValues += lineWithPieces[pieceIndex][attributeIndex];
      }
      if (sumOfAttributeValues === 0 || sumOfAttributeValues === 4) {
        return lines[lineIndex];
      }
    }
  }

  return null;
}

export { 
  whosTurn, 
  getPhase,
  getSelectedPiece, 
  deriveBoardArr, 
  getRandomizedBankOfPiecesArr,
  getLastPlaced,
  derivePlacedPieces,
  createDirectionString, 
  checkForWinningLine,
}
