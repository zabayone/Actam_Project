class ThreeDArray {
    constructor(n,idx) {
        if (n <= 0) {
            throw new Error("The second dimension size (n) must be greater than 0.");
        }
                // Initialize the 3xnx2 array with null values
        this.array = Array.from({ length: 3 }, () => 
            Array.from({ length: n }, () => Array(2).fill(0))
        );
        if(idx === null){
            this.idx = 0
            str = "Container-" + toString(idx)
            while(localStorage.getItem(str) !== 'undefined') this.idx++;
            localStorage.setItem(str,this.idx)
            this.cat = localStorage.getItem("category")
            this.key = localStorage.getItem("key")
            this.type = localStorage.getItem("type")
            this.test = localStorage.getItem("test")
            this.localStore()
        } else {
            this.idx = idx
            this.localRetreive()
        }
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
    localStore(){
        localStorage.setItem(toString(this.idx)+"/category",this.cat)
        localStorage.setItem(toString(this.idx)+"/key",this.key)
        localStorage.setItem(toString(this.idx)+"/type",this.type)
        localStorage.setItem(toString(this.idx)+"/test",this.test)
        for (let i = 0; i < 3; i++) {
           for (let j = 0 ; j < this.array[0].length; j++) {
            let str = toString(this.idx) + '/' + toString(i) + '-' + toString(j)
            let item = toString(this.array[x][y][0]) + '-' + toString(this.array[x][y][1])
            localStorage.setItem(str, item)
           }      
        }
    }

    async localRetreive(){
        let str = "Container-" + toString(this.idx)
        if(localStorage.getItem(str) === 'undefined') {
            console.log(str + " not already stored")
            return
        }
        this.cat = localStorage.getItem(toString(this.idx)+"/category")
        this.key = localStorage.getItem(toString(this.idx)+"/key")
        this.type = localStorage.getItem(toString(this.idx)+"/type")
        this.test = localStorage.getItem(toString(this.idx)+"/test")
        for (let i = 0; i < 3; i++) {
           for (let j = 0 ; j < this.array[0].length; j++) {
            let str = toString(this.idx) + '/' + toString(i) + '-' + toString(j)
            let item = localStorage.getItem(str)
            let vals = item.split('-')
            this.array[i][j][0] = vals[0]
            this.array[i][j][1] = vals[1]
           }      
        }
    }
}