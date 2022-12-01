let tiles = [];

let grid = [];
const DIM = 30;

function preload() {
  // Import tile images and create sperate Tile objects
  tiles[0] = new Tile(loadImage("tiles/demo/blank.png"), [[0], [0], [0], [0]], 0);
  tiles[1] = new Tile(loadImage("tiles/demo/up.png"), [[1], [1], [0], [1]], 0);
  tiles[2] = new Tile(loadImage("tiles/demo/up.png"), [[1], [1], [0], [1]], 1);
  tiles[3] = new Tile(loadImage("tiles/demo/up.png"), [[1], [1], [0], [1]], 2);
  tiles[4] = new Tile(loadImage("tiles/demo/up.png"), [[1], [1], [0], [1]], 3);
  tiles[5] = new Tile(loadImage("tiles/demo/full.png"), [[1], [1], [1], [1]], 0);
}

function setup() {
  createCanvas(1500, 1500);

  let w = width / DIM; let h = width / DIM;
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      grid[i + j*DIM] = new Cell(i, j, [...Array(tiles.length).keys()], w, h);
    }
  }
}

function draw() {
  background(220);

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i].show(tiles);
  }

  // Find the cell with minimum 'entropy' (# of possible tiles)
  let gridCopy = grid.slice().filter(cell => !cell.collapsed); // Copy the grid so that the order of the tiles won't change
  
  if (gridCopy.length == 0) {
    noLoop();
    return;
  }
  
  gridCopy = gridCopy
  .sort((a, b) => a.options.length - b.options.length)
  .filter(cell => cell.options.length == gridCopy[0].options.length);
 
  // Pick a random cell from min 'entropy' and pick a random state from the available options
  let pick = random(gridCopy);
  pick.collapsed = true;
  pick.options = [random(pick.options)]; 

  // In case of an no available option sitution, chose a random one
  if (pick.options[0] == undefined) {
    pick.options = [random([...Array(tiles.length).keys()])];
    console.log("An impossible position occured!");
  }

  // Update all the cells
  for (let i = 0; i < grid.length; i++) {
    grid[i].update(grid, tiles);
  }
}