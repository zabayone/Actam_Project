class ThreeDArray {
    constructor(n) {
        if (n <= 0) {
            throw new Error("The second dimension size (n) must be greater than 0.");
        }

        // Initialize the 3xnx2 array with null values
        this.array = Array.from({ length: 3 }, () => 
            Array.from({ length: n }, () => Array(2).fill(null))
        );
    }

    // Method to get a value from a specific position
    getValuePair(x, y) {
        if (x < 0 || x >= 3 || y < 0 || y >= this.array[0].length) {
            throw new Error("Index out of bounds.");
        }
        return this.array[x][y];
    }

    // Method to print the entire 3D array
    printArray() {
        for (let x = 0; x < 3; x++) {
            console.log(`Layer ${x}:`);
            for (let y = 0; y < this.array[x].length; y++) {
                console.log(this.array[x][y]);
            }
        }
    }

    // Method to get the entire array
    getArray() {
        return this.array;
    }

    // Method to calculate the total number of correct results (sum of all cells)
    calculateTotalCorrectResults() {
        let total = [0, 0];
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.array[x].length; y++) {
                total[0] += this.array[x][y][0]
                total[1] += this.array[x][y][1]
            }
        }
        return total;
    }
    setCorrect(x, y){
        if (x < 0 || x >= 3 || y < 0 || y >= this.array[0].length) {
            throw new Error("Index out of bounds.");
        }
        this.array[x][y][0] += 1;
        this.array[x][y][1] += 1;
    }
    setIncorrect(x, y){
        if (x < 0 || x >= 3 || y < 0 || y >= this.array[0].length) {
            throw new Error("Index out of bounds.");
        }
        this.array[x][y][1] += 1;
    }
}