var types
var values
var cat

var storage

var res_array = []

async function init(){
    cat = localStorage.getItem("category")
    let key = localStorage.getItem("key")
    let type = localStorage.getItem("type")
    test = localStorage.getItem("test")
    values = key.split('-')
    types = type.split('-')
    let i = 0;
    str = "Container-" + toString(i)
    while(localStorage.getItem(str) !== 'undefined'){
        let app_array = new ThreeDArray(values.length,i)
        await app_array.localRetreive()
        res_array.push(app_array)
        i++
        str = "Container-" + toString(i)
    }
}

init()