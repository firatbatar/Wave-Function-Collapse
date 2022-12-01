function intersection(arr1, arr2) {
    let newArr = [];
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) newArr.push(arr1[i]);
    }

    return newArr;
}

class Tile {
    constructor(img, connectors, rotation=0) {
        this.img = img;
        this.connectors = connectors;
        this.rotation = rotation;
    }

    canConnect(tile, direction) {
        let otherDir;
        otherDir = direction <= 1 ? direction+2 : direction-2;

        if (intersection(this.connectors[direction], tile.connectors[otherDir]).length > 0) return true;
        return false; 
    }

    show(i, j, w, h) {
        push();
        imageMode(CENTER);
        translate(i*w + w/2, j*h + h/2);
        rotate(HALF_PI * this.rotation);
        image(this.img, 0, 0, w, h);
        pop();
    }

    rotate(rotation) {
        const len = this.connectors.length;
        let rotatedConnectors = [];
        for (let i = 0; i < len; i++) {
            rotatedConnectors[i] = this.connectors[(i-rotation + len) % len];
        }
        
        return new Tile(this.img, rotatedConnectors, rotation);
    }
}