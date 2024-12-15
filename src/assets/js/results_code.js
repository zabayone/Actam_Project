var types
var values
var cat

// var storage

var res_array = []

async function init(){
    //let idx2 = localStorage.getItem("max_idx");
    //let idx1 = localStorage.getItem("min_idx");
    let i = 0
    //if (idx1) i = parseInt(idx1)
    let str = "Container-" + i.toString()
    let item
    while(item = localStorage.getItem(str)){
        console.log(str + " = " + item)
        res_array.push(new ExerciseContaner(null,i))
        i = i+1
        str = "Container-" + i.toString()
    }
}

init()