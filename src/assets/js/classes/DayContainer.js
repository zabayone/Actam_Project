class DayContainer {
    constructor(date){
        this.intervals = Array.from({ length: 3 }, () => 
            Array.from({ length: interval_text.length }, () => Array(2).fill(0))
        );
        this.chords = Array.from({ length: 3 }, () => 
            Array.from({ length: chord_text.length }, () => Array(2).fill(0))
        );
        this.scales = Array.from({ length: 3 }, () => 
            Array.from({ length: scale_text.length }, () => Array(2).fill(0))
        );
        if(date === null){
            var d = new Date()
            this.date = d.toLocaleDateString()
            let str = "Day-"+this.date
            if(localStorage.getItem(this.date)) this.localRetreive()
            else {
                localStorage.setItem(str,this.date)
                this.localStore()
            }
        } else {
            this.date = date;
            if(localStorage.getItem(this.date)) this.localRetreive()
            else throw new Error("Wrong date value, non existent structure for that date")
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
                    this.intervals[x][keys[y]][0] += res[0]
                    this.intervals[x][keys[y]][1] += res[1]
                }
            } 
            break;
            case 1:
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < keys.length; y++) { 
                    let res = exe.getValuePair(x,y) 
                    this.chords[x][keys[y]][0] += res[0]
                    this.chords[x][keys[y]][1] += res[1]
                }
            } 
            break;
            case 2:
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < keys.length; y++) { 
                    let res = exe.getValuePair(x,y) 
                    this.scales[x][keys[y]][0] += res[0]
                    this.scales[x][keys[y]][1] += res[1]
                }
            } 
            break;
            default:
            break;
        }
    }

    localStore(){
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.intervals[x].length; y++) {
                let str = this.date + '/int/' + x.toString() + '-' + y.toString()
                let item = this.intervals[x][y][0].toString() + '-' + this.intervals[x][y][1].toString()
                localStorage.setItem(str, item)
            }
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.chords[x].length; y++) {
                let str = this.date + '/arr/' + x.toString() + '-' + y.toString()
                let item = this.chords[x][y][0].toString() + '-' + this.chords[x][y][1].toString()
                localStorage.setItem(str, item)
            }
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.scales[x].length; y++) {
                let str = this.date + '/scal/' + x.toString() + '-' + y.toString()
                let item = this.scales[x][y][0].toString() + '-' + this.scales[x][y][1].toString()
                localStorage.setItem(str, item)
            }
        }
    }

    async localRetreive(){
        let str = "Day-" + this.date
        if(!localStorage.getItem(str)) {
            console.log(str + " not already stored")
            this.localStore()
            return
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.intervals[x].length; y++) {
                let str = this.date + '/int/' + x.toString() + '-' + y.toString()
                let item = localStorage.getItem(str)
                let vals = item.split('-')
                this.intervals[x][y][0] = vals[0]
                this.intervals[x][y][1] = vals[1]
            }
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.chords[x].length; y++) {
                let str = this.date + '/arr/' + x.toString() + '-' + y.toString()
                let item = localStorage.getItem(str)
                let vals = item.split('-')
                this.chords[x][y][0] = vals[0]
                this.chords[x][y][1] = vals[1]
            }
        }
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < this.scales[x].length; y++) {
                let str = this.date + '/scal/' + x.toString() + '-' + y.toString()
                let item = localStorage.getItem(str)
                let vals = item.split('-')
                this.scales[x][y][0] = vals[0]
                this.scales[x][y][1] = vals[1]
            }
        }
    }
}