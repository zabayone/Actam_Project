class ExerciseContainer {
    constructor(n, idx) {
        if ((n <= 0 & idx === null) | (idx !== null & n !== null)) {
            throw new Error("Incorrect constructor call for ThreeDArray class");
        }
                // Initialize the 3xnx2 array with null values

        if(idx === null){
            this.idx = 0
            let str = "Container-" + this.idx.toString()
            let item = localStorage.getItem(str) 
            while(item){
                //console.log(this.idx)
                //console.log(str + " = " + item)
                this.idx++;
                str = "Container-" + this.idx.toString()
                item = localStorage.getItem(str) 
            }
            // let idx = localStorage.getItem("max_idx")
            // if(idx) this.idx = parseInt(idx) + 1 
            localStorage.setItem(str,this.idx)
            this.cat = localStorage.getItem("category")
            this.key = localStorage.getItem("key")
            this.type = localStorage.getItem("type")
            this.test = localStorage.getItem("test")
            this.level = localStorage.getItem("level")
/*
            localStorage.removeItem("category")
            localStorage.removeItem("key")
            localStorage.removeItem("type")
            localStorage.removeItem("test")
            localStorage.removeItem("level")*/

            console.log(this.cat + " - " + this.key + " - " + this.type + " - " + this.test + " - ")
            this.array = Array.from({ length: 3 }, () => 
                Array.from({ length: n }, () => Array(2).fill(0))
            );
            //localStorage.setItem("max_idx"
            // , this.idx)
            this.localStore()
        } else {
            this.idx = idx
            let key = localStorage.getItem(this.idx.toString()+"/key")
            console.log(key)
            let keys = key.split('-')
            this.array = Array.from({ length: 3 }, () => 
                Array.from({ length: keys.length }, () => Array(2).fill(0))
            );
            this.localRetreive()
            //this.printArray()
        }
    }

    // Method to get a value from a specific position
    getValuePair(x, y) {
        if (x < 0 || x >= 3 || y < 0 || y >= this.array[0].length) {
            throw new Error("Index out of bounds.");
        }
        return this.array[x][y];
    }

    getKeys() {
        return this.key.split("-")
    }

    getCategory() {
        return this.cat
    }

    getTypes() {
        return this.type.split("-")
    }

    // Method to print the entire 3D array
    printArray() {
        console.log("category = " + this.cat)
        console.log("key = " + this.getKeys())
        console.log("type = " + this.getTypes())
        console.log("test = " + this.test)
        console.log("idx = " + this.idx)
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
        console.log("x = " + x + "\ny = " + y)
        if (x < 0 || x >= 3 || y < 0 || y >= this.array[0].length) {
            throw new Error("Index out of bounds.");
        }
        this.array[x][y][1] += 1;
    }

    localStore(){
        let cat_str = this.idx.toString()+"/category"
        let key_str = this.idx.toString()+"/key"
        let type_str = this.idx.toString()+"/type"
        let test_str = this.idx.toString()+"/test"
        localStorage.setItem(cat_str,this.cat)
        localStorage.setItem(key_str,this.key)
        localStorage.setItem(type_str,this.type)
        localStorage.setItem(test_str,this.test)
        for (let i = 0; i < 3; i++) {
           for (let j = 0 ; j < this.array[0].length; j++) {
            let str = this.idx.toString() + '/' + i.toString() + '-' + j.toString()
            let item = this.array[i][j][0].toString() + '-' + this.array[i][j][1].toString()
            localStorage.setItem(str, item)
           }      
        }
    }

    async localRetreive(){
        let str = "Container-" + this.idx.toString()
        if(!localStorage.getItem(str)) {
            console.log(str + " not already stored")
            this.localStore()
            return
        }
        this.cat = localStorage.getItem(this.idx.toString()+"/category")
        this.key = localStorage.getItem(this.idx.toString()+"/key")
        this.type = localStorage.getItem(this.idx.toString()+"/type")
        this.test = localStorage.getItem(this.idx.toString()+"/test")
        for (let i = 0; i < 3; i++) {
           for (let j = 0 ; j < this.array[0].length; j++) {
        
            let str = this.idx.toString() + '/' + i.toString() + '-' + j.toString()
            let item = localStorage.getItem(str)
            let vals = item.split('-')
            this.array[i][j][0] = parseInt(vals[0])
            this.array[i][j][1] = parseInt(vals[1])
           }      
        }
    }
}

function visualizeArray(arrayObj) {
    const container = document.getElementById('table-container');
    container.innerHTML = ''; // Clear any existing tables

    for (let x = 0; x < 3; x++) {
        const table = document.createElement('table');
        const caption = document.createElement('caption');
        caption.textContent = `Layer ${x}`;
        table.appendChild(caption);

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>Index</th><th>Correct</th><th>Incorrect</th>';
        table.appendChild(headerRow);

        for (let y = 0; y < arrayObj.array[x].length; y++) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${y}</td>
                <td>${arrayObj.array[x][y][0]}</td>
                <td>${arrayObj.array[x][y][1]}</td>
            `;
            table.appendChild(row);
        }

        container.appendChild(table);
    }
}