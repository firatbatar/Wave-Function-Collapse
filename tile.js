function intersection(arr1, arr2) {
    let newArr = [];
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) newArr.push(arr1[i]);
    }

    return newArr;
}

class Tile {
    constructor(img, connectors, rotation) {
        this.img = img;
        this.connectors = [];
        const len = connectors.length;
        for (let i = 0; i < len; i++) {
            this.connectors[i] = connectors[(i-rotation + len) % len];
        }
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
}