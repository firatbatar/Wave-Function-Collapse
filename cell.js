class Cell {
    constructor(i, j, options, w, h) {
        this.i = i; this.j = j;
        this.w = w; this.h = h;

        this.collapsed = false;
        this.options = options;
    }

    show(tiles) {
        if (this.collapsed) {
            image(tiles[this.options[0]].img, this.i*this.w, this.j*this.h, this.w, this.h);
        } else {
            stroke(0);
            rect(this.i*this.w, this.j*this.h, this.w, this.h);
        }
    }

    update(grid, tiles) {
        if (this.collapsed) return;

        let neighbours = [-1, -1, -1, -1];
        if (this.j > 0) neighbours[0] = this.i + (this.j-1)*DIM; // Up
        if (this.i < DIM-1) neighbours[1] = this.i+1 + this.j*DIM; // Right
        if (this.j < DIM-1) neighbours[2] = this.i + (this.j+1)*DIM; // Down
        if (this.i > 0) neighbours[3] = this.i-1 + this.j*DIM; // Left

        for (let dir = 0; dir < 4; dir++) {
            if (neighbours[dir] == -1) continue;

            let neighbour = grid[neighbours[dir]];
            let newOptions = [];
            for (let i = 0; i < neighbour.options.length; i++) {
                let neighbourTile = tiles[neighbour.options[i]];

                for (let j = 0; j < this.options.length; j++) {
                    let tile = tiles[this.options[j]];
                    if (tile.canConnect(neighbourTile, dir) && !newOptions.includes(this.options[j])) newOptions.push(this.options[j]);
                }
            }
            this.options = newOptions.slice();
        }
    }
}