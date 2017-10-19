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
  //var solution = undefined; //fixme
  return;
  
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  //debugger;
  // for each column of first row
    // call helper function
    
  // function to check rows below
    // for each column
      // toggle pieces
      // check for conflicts
      // if no conflict
        // if no more rows left
          // add solution count
          // untoggle
        // recursive call to check the following rows
      // untoggle pieces
  // var openColumns = [];
  // for (var i = 0; i < n; i++) {
  //   openColumns.push(i);
  // }
  var checkRowBelow = function(row) {
    //debugger;
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      //console.log(board.rows());
      if (!board.hasAnyRooksConflicts()) {
        if (row === n - 1) {
          solutionCount++;
          //console.log(JSON.stringify(board.rows()));
          //board.togglePiece(row, i);
        } else {
          checkRowBelow(row + 1);
        }
      } 
      board.togglePiece(row, i);  
    }
  };
  
  checkRowBelow(0);
  
  
  // var board = new Board({n: n});
  // var numRooks;
  // //for every row 
  // for (let i = 0; i < n; i++) {
  //   numRooks = 1;
  //   board.togglePiece(0, i);
  //   if (n === 1) {
  //     solutionCount++;
  //     break;
  //   }
  //   for (let k = 1; k < n; k++) {
  //     for (let l = 0; l < n; l++) {
  //       board.togglePiece(k, l);
  //       if (board.hasAnyRooksConflicts()) {
  //         board.togglePiece(k, l);
  //       } else {
  //         numRooks++;
  //         if (numRooks === n) {
  //           solutionCount++;
  //           console.log(board.rows());
  //         }
  //         break;
  //       }
  //     }
  //   }
  //   board.togglePiece(0, 1);
  //   //for every column - set first rook
  //     //for every row and column - set rest of the rooks
  //       //if n rooks placed exit & save solution
  // }
  //var solution = undefined; //fixme
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
