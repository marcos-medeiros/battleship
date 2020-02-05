import { shipFactory } from './ship';


const gameBoard = () => {

	// board creation
	const body = {};

	for (let i = 1; i <= 10; i++) {
		body[i] = {};
		for (let j = 1; j <= 10; j++) {
			body[i][j] = 'empty';
		}
	}

	//position check
	const checkPosition = (row, col) => {
    if (row === 0 || row > 10 || col === 0 || col > 10) {
      return undefined;
    };
		return body[row][col];
	}

	//ship storage
	let shipStorage = {
		1: {1: shipFactory(1), 2: shipFactory(1), 3: shipFactory(1), 4: shipFactory(1)},
		2: {1: shipFactory(2), 2: shipFactory(2), 3: shipFactory(2)},
		3: {1: shipFactory(3), 2: shipFactory(3)},
		4: {1: shipFactory(4)}
	}

	//ship selection
	let currentShip = {};

	const selectShip = (ship) => {
		currentShip = ship
	}




	const spaceAvailable = (ship, x, y) => {
		const shipSize = Object.keys(ship.body).length;

    if (((y - 1 + shipSize) > 10 && ship.direction === "horizontal") ||
        ((x - 1 + shipSize) > 10 && ship.direction === "vertical")) {
          return false;
    };

    if (checkPosition(x, y) === 'empty' && ship.direction === "horizontal") {
      for (let i = y-1; i <= (y + shipSize); i++) {
				if (checkPosition(x, i) !== 'empty' && checkPosition(x, i) !== undefined) {
					return false;
        }
        for (let j = x -1; j <= (x + 1); j+= 2) {
          if (checkPosition(j,i) !== 'empty' && checkPosition(j, i) !== undefined) {
            return false;
          }
        }
			}
      return true;

		} else if (checkPosition(x, y) === 'empty' && ship.direction === "vertical") {

      for (let i = x-1; i <= (x + shipSize); i++) {
				if (checkPosition(i, y) !== 'empty' && checkPosition(i, y) !== undefined) {
					return false;
        }
        for (let j = y -1; j <= (y + 1); j+= 2) {
          if (checkPosition(i,j) !== 'empty' && checkPosition(i, j) !== undefined) {
            return false;
          }
        }
      }
			return true;
		}
	}


	//ship placement
	const placeShip = (ship, x, y) => {
		const shipSize = Object.keys(ship.body).length;
    // evaluate the length of ship and direction
		let bodyCounter = 1;
		if (spaceAvailable(ship, x, y)) {
			if (ship.direction === "horizontal") {

        if (checkPosition(x,y-1) !== undefined) {body[x][y-1] = 'filled'};
        if (checkPosition(x,y+shipSize) !== undefined) {body[x][y+shipSize] = 'filled'};

				for (let i = y; i < (y + shipSize); i++) {
          body[x][i] = ship.body[bodyCounter];
					console.log("i = " + i);
					console.log(body[x][i]);
          if (checkPosition(x-1,i) !== undefined) {body[x-1][i] = 'filled'};
          if (checkPosition(x+1,i) !== undefined) {body[x+1][i] = 'filled'};
					bodyCounter++;
				}
			} else {
				console.log("xxxx");
        if (checkPosition(x-1,y) !== undefined) {body[x-1][y] = 'filled'};
        if (checkPosition(x+shipSize,y) !== undefined) {body[x+shipSize][y] = 'filled'};

				for (let i = x; i < (x + shipSize); i++) {
          body[i][y] = ship.body[bodyCounter];
          if (checkPosition(i,y+1) !== undefined) {body[i][y+1] = 'filled'};
          if (checkPosition(i,y-1) !== undefined) {body[i][y-1] = 'filled'};
					bodyCounter++;
				}
      }
		} else {
			alert("error, no space available")
		}

	}

	//received attack


	return { body, checkPosition, shipStorage, placeShip, selectShip, shipFactory,
		get currentShip() { return currentShip }, spaceAvailable }
}

let testBoard = gameBoard();
export { gameBoard };
