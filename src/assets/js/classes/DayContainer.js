class DayContainer {
    constructor(index){
        this.intervals = Array.from({ length: 3 }, () => 
            Array.from({ length: interval_text.length }, () => Array(2).fill(0))
        );
        this.chords = Array.from({ length: 3 }, () => 
            Array.from({ length: chord_text.length }, () => Array(2).fill(0))
        );
        this.scales = Array.from({ length: 3 }, () => 
            Array.from({ length: scale_text.length }, () => Array(2).fill(0))
        );
        if(index === null){
            let found = false
            this.idx = 0
            var d = new Date()
            this.date = d.toLocaleDateString()
            let str = "Day-"+this.idx.toString()
            let item = localStorage.getItem(str)
            while(item){
                if(item == this.date){
                    found = true
                    break;
                }
                this.idx = this.idx + 1
                str = "Day-"+this.idx.toString()
                item = localStorage.getItem(str)
            }
            if(found) this.localRetreive()
            else {
                localStorage.setItem(str,this.date)
                this.localStore()
            }
        } else {
            this.idx = index
            let str = "Day-"+this.idx.toString()
            this.date = localStorage.getItem(str)
            if(this.date) this.localRetreive()
            else throw new Error("Wrong index value, non existent structure for that date")
            this.printArray()

        }
    }

    getValuePair(x, y, type) {
        switch(type){
            case 0:
            if (x < 0 || x >= 3 || y < 0 || y >= this.intervals[0].length) {
                throw new Error("Index out of bounds.");
            }
            return this.intervals[x][y];
            case 1:
            if (x < 0 || x >= 3 || y < 0 || y >= this.chords[0].length) {
                throw new Error("Index out of bounds.");
            }
            return this.chords[x][y];
            case 2:
            if (x < 0 || x >= 3 || y < 0 || y >= this.scales[0].length) {
                throw new Error("Index out of bounds.");
            }
            return this.scales[x][y];
            default:
            break;
        }

    }
    
    printArray() {
        console.log("Day-"+this.idx+" = " + this.date)
        console.log("--- intervals ---")
        for (let x = 0; x < 3; x++) {
            console.log(`Layer ${x}:`);
            for (let y = 0; y < this.intervals[x].length; y++) {
                console.log(this.intervals[x][y]);
            }
        }
        console.log("--- chords ---")
        for (let x = 0; x < 3; x++) {
            console.log(`Layer ${x}:`);
            for (let y = 0; y < this.chords[x].length; y++) {
                console.log(this.chords[x][y]);
            }
        }
        console.log("--- scales ---")
        for (let x = 0; x < 3; x++) {
            console.log(`Layer ${x}:`);
            for (let y = 0; y < this.scales[x].length; y++) {
                console.log(this.scales[x][y]);
            }
        }
    }
    calculateTotalCorrectResults() {
        let total = [0, 0];
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.intervals[x].length; y++) {
                total[0] += this.intervals[x][y][0]
                total[1] += this.intervals[x][y][1]
            }
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.chords[x].length; y++) {
                total[0] += this.chords[x][y][0]
                total[1] += this.chords[x][y][1]
            }
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.scales[x].length; y++) {
                total[0] += this.scales[x][y][0]
                total[1] += this.scales[x][y][1]
            }
        }
        return total;
    }

    calculateTotalCorrectResultsForType(type) {
        let total = [0, 0];
        switch(type){
            case 0:
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < this.intervals[x].length; y++) {
                    total[0] += this.intervals[x][y][0]
                    total[1] += this.intervals[x][y][1]
                }
            }
            break;
            case 1:
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < this.chords[x].length; y++) {
                    total[0] += this.chords[x][y][0]
                    total[1] += this.chords[x][y][1]
                }
            }
            break;
            case 2:
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < this.scales[x].length; y++) {
                    total[0] += this.scales[x][y][0]
                    total[1] += this.scales[x][y][1]
                }
            }
            break;
            default:
            break;                
        }
        return total;
    }

    addExercise(exe){
        let keys = exe.getKeys()
        let cat = parseInt(exe.cat)
        switch (cat) {
            case 0:
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < keys.length; y++) { 
                    let res = exe.getValuePair(x,y) 
                    this.intervals[x][keys[y]][0] += parseInt(res[0])
                    this.intervals[x][keys[y]][1] += parseInt(res[1])
                }
            } 
            break;
            case 1:
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < keys.length; y++) { 
                    let res = exe.getValuePair(x,y) 
                    this.chords[x][keys[y]][0] += parseInt(res[0])
                    this.chords[x][keys[y]][1] += parseInt(res[1])
                }
            } 
            break;
            case 2:
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < keys.length; y++) { 
                    let res = exe.getValuePair(x,y) 
                    this.scales[x][keys[y]][0] += parseInt(res[0])
                    this.scales[x][keys[y]][1] += parseInt(res[1])
                }
            } 
            break;
            default:
            break;
        }
        this.localStore()
    }

    localStore(){
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.intervals[x].length; y++) {
                let str = this.idx + '/int/' + x.toString() + '-' + y.toString()
                let item = this.intervals[x][y][0].toString() + '-' + this.intervals[x][y][1].toString()
                localStorage.setItem(str, item)
            }
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.chords[x].length; y++) {
                let str = this.idx + '/arr/' + x.toString() + '-' + y.toString()
                let item = this.chords[x][y][0].toString() + '-' + this.chords[x][y][1].toString()
                localStorage.setItem(str, item)
            }
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.scales[x].length; y++) {
                let str = this.idx + '/scal/' + x.toString() + '-' + y.toString()
                let item = this.scales[x][y][0].toString() + '-' + this.scales[x][y][1].toString()
                localStorage.setItem(str, item)
            }
        }
    }

    async localRetreive(){
        let str = "Day-" + this.idx
        this.date = localStorage.getItem(str)
        if(!this.date) {
            let d = new Date()
            this.date = d.toLocaleDateString()
            localStorage.setItem(str, this.date)
            console.log(str + " not already stored")
            this.localStore()
            return
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.intervals[x].length; y++) {
                let str = this.idx + '/int/' + x.toString() + '-' + y.toString()
                let item = localStorage.getItem(str)
                let vals = item.split('-')
                this.intervals[x][y][0] = parseInt(vals[0])
                this.intervals[x][y][1] = parseInt(vals[1])
            }
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.chords[x].length; y++) {
                let str = this.idx + '/arr/' + x.toString() + '-' + y.toString()
                let item = localStorage.getItem(str)
                let vals = item.split('-')
                this.chords[x][y][0] = parseInt(vals[0])
                this.chords[x][y][1] = parseInt(vals[1])
            }
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.scales[x].length; y++) {
                let str = this.idx + '/scal/' + x.toString() + '-' + y.toString()
                let item = localStorage.getItem(str)
                let vals = item.split('-')
                this.scales[x][y][0] = parseInt(vals[0])
                this.scales[x][y][1] = parseInt(vals[1])
            }
        }
    }
}