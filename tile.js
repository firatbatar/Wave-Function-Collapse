function intersection(arr1, arr2) {
    let newArr = [];
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) newArr.push(arr1[i]);
    }

    return newArr;
}

class Tile {
    constructor(img, connectors) {
        this.img = img;
        this.connectors = connectors;
    }

    canConnect(tile, direction) {
        let otherDir;
        otherDir = direction <= 1 ? direction+2 : direction-2;

        if (intersection(this.connectors[direction], tile.connectors[otherDir]).length > 0) return true;
        return false; 
    }
}