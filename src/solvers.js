/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //create new board
  var board = new Board({n: n});
  var numRooks;
  //for every row 
  for (let i = 0; i < n; i++) {
    numRooks = 1;
    board.togglePiece(0, i);
    if (n === 1) {
      var solution = board.rows();
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
      return solution;
    }
    for (let k = 1; k < n; k++) {
      for (let l = 0; l < n; l++) {
        board.togglePiece(k, l);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(k, l);
        } else {
          numRooks++;
          if (numRooks === n) {
            var solution = board.rows();
            console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
            return solution;
          }
          break;
        }
      }
    }
    board.togglePiece(0, i);
    //for every column - set first rook
      //for every row and column - set rest of the rooks
        //if n rooks placed exit & save solution
  }
  return;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  
  
  // available columns
  var openColumns = {};
  for (var i = 0; i < n; i++) {
    openColumns[i] = i;
  }
  
  // function to check rows below
  var checkRowBelow = function(row) {
    // for each column
    for (var i in openColumns) {
      // toggle pieces
      // update available columns
      board.togglePiece(row, i);
      delete openColumns[i];
      // if no conflict
        // if no more rows left
          // add solution count
        // recursive call to check the following rows
      if (!board.hasAnyRooksConflicts()) {
        if (row === n - 1) {
          // returns solutionCount for one column
          count++;
        } else {
          checkRowBelow(row + 1);
        }
      } 
      // untoggle pieces
      // update available columns
      board.togglePiece(row, i);
      openColumns[i] = i;  
    }
  };
  
  // use symmetry to compute solutions for half of the board
  for (let i = 0; i < Math.ceil(n / 2); i++) {
    board.togglePiece(0, i);
    delete openColumns[i];
    var count = 0;
    if (n === 1) {
      count++;
    }
    checkRowBelow(1);
    if (n % 2 === 0) {
      solutionCount += 2 * count;
    } else if (n % 2 !== 0 && i !== Math.floor(n / 2)) {
      solutionCount += 2 * count;
    } else {
      solutionCount += count;
    }
    board.togglePiece(0, i);
    openColumns[i] = i;
  }  
  
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();
  var openColumns = {};
  for (let i = 0; i < n; i++) {
    openColumns[i] = i;
  }
  
  var checkRowBelow = function(row) {
    for (let i in openColumns) {
      board.togglePiece(row, i);
      delete openColumns[i];
      if (!board.hasAnyQueensConflicts()) {
        if (row === n - 1) {
          return board.rows();
        } else {
          var matrix = checkRowBelow(row + 1);
        }
      }
      if (matrix) {
        return matrix;
      }
      board.togglePiece(row, i);
      openColumns[i] = i;
    }
  };
  solution = checkRowBelow(0);
  
  if (!solution) {
    solution = board.rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  
  var openColumns = {};
  
  for (let i = 0; i < n; i++) {
    openColumns[i] = {};
    for (let j = 0; j < n; j++) {
      if (j !== i && j !== i - 1 && j !== i + 1) {
        openColumns[i][j] = j;
      }
    }
  }
  var checkRowBelow = function(row, index) {
    for (let i in index) {
      board.togglePiece(row, i);
      var temp = openColumns[i];
      delete openColumns[i];
      if (!board.hasAnyQueensConflicts()) {
        if (row === n - 1) {
          count++;
        } else {
          checkRowBelow(row + 1, temp);
        }
      }
      board.togglePiece(row, i);
      openColumns[i] = temp;
    }
  };
  
  for (let i = 0; i < Math.ceil(n / 2); i++) {
    board.togglePiece(0, i);
    var temp = openColumns[i];
    delete openColumns[i];
    var count = 0;
    if (n === 1) {
      count++;
    }
    checkRowBelow(1, temp);
    if (n % 2 === 0) {
      solutionCount += 2 * count;
    } else if (n % 2 !== 0 && i !== Math.floor(n / 2)) {
      solutionCount += 2 * count;
    } else {
      solutionCount += count;
    }
    board.togglePiece(0, i);
    openColumns[i] = temp;
  }

  if (n === 0) {
    solutionCount = 1;
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
