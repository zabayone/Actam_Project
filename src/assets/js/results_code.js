var types
var values
var cat

var exe_array = []
var day_array = []

var curr_exe
var curr_day

var curr_cat

var is_first = 1

async function switchCurrentDay(curr) {
    curr_day = curr;
    showCategory(curr_cat);
}
async function switchCurrentExercise(curr) {
    curr_exe = curr;
    showCategory(curr_cat);
}
// Function to update the results based on the selected category
async function showCategory(category) {
    curr_cat = category;
    //correctCount = storage.calculateTotalCorrectResults;
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsContent = document.getElementById('resultsContent');
    const sliderElements = document.querySelectorAll('.slider_element');
    const calendar = document.getElementById('calendar')

    var calendar_txt = ''
    if(category == 'exercise') {
        for (let i = 0; i < exe_array.length; i++) {
            var categ = exe_array[i].getCategory()
            var keys = exe_array[i].getKeys()
            var str1 = 'Exercise ' + parseInt(i+1)
            // switch (parseInt(categ)) {
            //     case 0:
            //         for (let j = 0; j < keys.length; j++) {
            //             str1 += interval_text[parseInt(keys[i])] + ', '
            //         }
            //         str1 += str1.substring(0,str1.length - 2)
            //     break;
            //     case 1:
            //         for (let j = 0; j < keys.length; j++) {
            //             str1 += chord_text[parseInt(keys[i])] + ', '
            //         }
            //         str1 += str1.substring(0,str1.length - 2)
            //     break;
            //     case 2:
            //         for (let j = 0; j < keys.length; j++) {
            //             str1 += scale_text[parseInt(keys[i])] + ', '
            //         }
            //         str1 += str1.substring(0,str1.length - 2)
            //     break;
            //     default:
            //     break;
            // }
            var correct = exe_array[i].calculateTotalCorrectResults()
            var perc = parseInt((correct[0]/correct[1]) * 100)
            var str2 = correct[0].toString() + '/' + correct[1].toString() + ' | ' + perc.toString() + '%'
            calendar_txt +=  `<button class="day" onclick="switchCurrentExercise(${i.toString()})">
            <span>  ${str1} </span> 
            <span>  ${str2}  </span> 
            </button>`
       }
       calendar.innerHTML = calendar_txt;
    } else {
        for (let i = 0; i < day_array.length; i++) {
            var str1 = day_array[i].date
            var correct = day_array[i].calculateTotalCorrectResults()
            var perc = parseInt((correct[0]/correct[1]) * 100)
            var str2 = correct[0].toString() + '/' + correct[1].toString() + ' | ' + perc.toString() + '%'
            calendar_txt +=  `<button class="day" onclick="switchCurrentDay(${i.toString()})">
            <span>  ${str1} </span> 
            <span>  ${str2}  </span> 
            </button>`
        }
        calendar.innerHTML = calendar_txt;
    }

    sliderElements.forEach(element => {

        if(is_first){
        // Remove active class from all elements
        element.classList.remove('active');
        
        // Add active class to the exercise category by default
        document.getElementById('defaultCategory').classList.add('active');
        }
        // Add click handler
        element.addEventListener('click', () => {
            // Remove the 'active' class from all elements
            sliderElements.forEach(el => el.classList.remove('active'));

            // Add the 'active' class to the clicked element
            element.classList.add('active');
        });
    });

    // Update the title based on the category
    const titles = {
        intervals: 'Intervals Results',
        chords: 'Chords Results',
        scales: 'Scales Results',
        exercise: 'Last exercise results',
    };

    resultsTitle.textContent = titles[category] || 'Results';

    // Create the correct blocks HTML dynamically based on the correctCount

    // Update the content dynamically (this can be replaced with actual data fetching logic)
    const content = {
        intervals: 'Here are the results for intervals for day',
        chords: 'Here are the results for chords for day',
        scales: 'Here are the results for scales for day',
        exercise: 'Here are the results of the Exercise',
    };

    // Add the correct blocks and total block HTML to the content
    let dyn_txt = content[category];
    if(dyn_txt){
        if (category == 'exercise') {
            dyn_txt += ' ' + parseInt(curr_exe + 1).toString() + '.'
        } else {
            console.log(curr_day)
            dyn_txt += ' ' + day_array[curr_day].date + '.'
        }
    }
    let bars = await getBars(category)
    //dimanic content for the bar, the percentage and the type are hardcoded for now, it should be something like ${percentage} and ${type}
    const dynamicContent = `<p>${ dyn_txt || 'No results available.'}</p>` + bars;

    resultsContent.innerHTML = dynamicContent;
}

async function getBars(category) {
    let out = ''
    console.log(category)
    if (category == 'exercise') {
        let keys = exe_array[curr_exe].getKeys()
        let types_arr = exe_array[curr_exe].getTypes()
        let categ = exe_array[curr_exe].getCategory()
        categ = parseInt(categ)
        console.log(keys)
        console.log(types_arr)
        console.log(categ)
        let idx = 0;
        let types = []
        for await (const t of types_arr){
            t_int = parseInt(t)
            if(t_int != 0){
                types.push(idx)
            }
            idx += 1
        }
        console.log(types)
        switch (categ) {
            case 0:
               for (let key_i = 0; key_i < keys.length; key_i++) {
                    for await (const type of types) {
                        let pair = exe_array[curr_exe].getValuePair(parseInt(type),parseInt(key_i))
                        if (pair[1] == 0) continue;
                        var perc = parseInt((pair[0]/pair[1]) * 100)
                        var perc10 = parseInt((pair[0]/pair[1]) * 10)
                        let correctBarsHTML = '';
                        for (let i = 0; i < perc10; i++) {
                            correctBarsHTML += '<a class="correct_bar"></a>';
                        }
                        let tp;
                        switch (type) {
                            case 0:
                            tp = 'ascending'
                            break;
                            case 1:
                            tp = 'descending'
                            break;
                            case 2:
                            tp = 'unison'
                            break;
                            default:
                            tp = "bosh"
                            break;
                        }
                        let name = interval_text[parseInt(keys[key_i])] + ', ' + tp 
                        out +=  `<div class="exerciseRow">
                                     <p class="exerciseType">${name}</p>
                                     <div class="bars">
                                         <div class="correct_blocks">
                                             ${correctBarsHTML}
                                         </div>
                                     </div>
                                     <p class="exercisePercentage">${pair[0]}/${pair[1]} (${perc.toString()}%)</p>
                                 </div>`
                    }
               } 
            break;
            case 1:
                for (let key_i = 0; key_i < keys.length; key_i++) {
                    for await (const type of types) {
                        let pair = exe_array[curr_exe].getValuePair(parseInt(type),parseInt(key_i))
                        if (pair[1] == 0) continue;
                        var perc = parseInt((pair[0]/pair[1]) * 100)
                        var perc10 = parseInt((pair[0]/pair[1]) * 10)
                        let correctBarsHTML = '';
                        for (let i = 0; i < perc10; i++) {
                            correctBarsHTML += '<a class="correct_bar"></a>';
                        }
                        let tp;
                        switch (type) {
                            case 0:
                            tp = 'ascending'
                            break;
                            case 1:
                            tp = 'descending'
                            break;
                            case 2:
                            tp = 'unison'
                            break;
                            default:
                            tp = "bosh"
                            break;
                        }
                        let name = chord_text[parseInt(keys[key_i])] + ', ' + tp 
                        out +=  `<div class="exerciseRow">
                                     <p class="exerciseType">${name}</p>
                                     <div class="bars">
                                         <div class="correct_blocks">
                                             ${correctBarsHTML}
                                         </div>
                                     </div>
                                     <p class="exercisePercentage">${pair[0]}/${pair[1]} ${perc.toString()}%</p>
                                 </div>`
                    }
               } 
            break;
            case 2:
                for (let key_i = 0; key_i < keys.length; key_i++) {
                    for await (const type of types) {
                        let pair = exe_array[curr_exe].getValuePair(parseInt(type),parseInt(key_i))
                        if (pair[1] == 0) continue;
                        var perc = parseInt((pair[0]/pair[1]) * 100)
                        var perc10 = parseInt((pair[0]/pair[1]) * 10)
                        let correctBarsHTML = '';
                        for (let i = 0; i < perc10; i++) {
                            correctBarsHTML += '<a class="correct_bar"></a>';
                        }
                        let tp;
                        switch (type) {
                            case 0:
                            tp = 'ascending'
                            break;
                            case 1:
                            tp = 'descending'
                            break;
                            case 2:
                            tp = 'unison'
                            break;
                            default:
                            tp = "bosh"
                            break;
                        }
                        let name = scale_text[parseInt(keys[key_i])] + ', ' + tp 
                        out +=  `<div class="exerciseRow">
                                     <p class="exerciseType">${name}</p>
                                     <div class="bars">
                                         <div class="correct_blocks">
                                             ${correctBarsHTML}
                                         </div>
                                     </div>
                                     <p class="exercisePercentage">${pair[0]}/${pair[1]} ${perc.toString()}%</p>
                                 </div>`
                    }
               } 
            break;
            default:
            break;
        }

    } else {
        let exe;
        switch (category) {
            case 'intervals':
            exe = 0;
            for (let key = 0; key < interval_text.length; key++) {
                for (let type = 0; type < 3; type++) {
                    let pair = day_array[curr_day].getValuePair(type,key, exe)
                    if(pair[1] == 0) continue;
                    var perc = parseInt((pair[0]/pair[1]) * 100)
                    var perc10 = parseInt((pair[0]/pair[1]) * 10)
                    let correctBarsHTML = '';
                    for (let i = 0; i < perc10; i++) {
                        correctBarsHTML += '<a class="correct_bar"></a>';
                    }
                    let tp;
                    switch (type) {
                        case 0:
                        tp = 'ascending'
                        break;
                        case 1:
                        tp = 'descending'
                        break;
                        case 2:
                        tp = 'unison'
                        break;
                        default:
                        tp = "bosh"
                        break;
                    }
                    let name = interval_text[key] + ', ' + tp 
                    out +=  `<div class="exerciseRow">
                                 <p class="exerciseType">${name}</p>
                                 <div class="bars">
                                     <div class="correct_blocks">
                                         ${correctBarsHTML}
                                     </div>
                                 </div>
                                 <p class="exercisePercentage">${pair[0]}/${pair[1]} ${perc.toString()}%</p>
                             </div>`
                }
            }
            if(out == ''){
                out = 'No intervals played in this day.'
            }
            break;
            case 'chords':
            exe = 1;
            for (let key = 0; key < interval_text.length; key++) {
                for (let type = 0; type < 3; type++) {
                    let pair = day_array[curr_day].getValuePair(type,key, exe)
                    if(pair[1] == 0) continue;
                    var perc = parseInt((pair[0]/pair[1]) * 100)
                    var perc10 = parseInt((pair[0]/pair[1]) * 10)
                    let correctBarsHTML = '';
                    for (let i = 0; i < perc10; i++) {
                        correctBarsHTML += '<a class="correct_bar"></a>';
                    }
                    let tp;
                    switch (type) {
                        case 0:
                        tp = 'ascending'
                        break;
                        case 1:
                        tp = 'descending'
                        break;
                        case 2:
                        tp = 'unison'
                        break;
                        default:
                        tp = "bosh"
                        break;
                    }
                    let name = chord_text[key] + ', ' + tp 
                    out +=  `<div class="exerciseRow">
                                 <p class="exerciseType">${name}</p>
                                 <div class="bars">
                                     <div class="correct_blocks">
                                         ${correctBarsHTML}
                                     </div>
                                 </div>
                                 <p class="exercisePercentage">${pair[0]}/${pair[1]} ${perc.toString()}%</p>
                             </div>`
                }
            }
            if(out == ''){
                out = 'No chords played in this day.'
            }
            break;
            case 'scales':
            exe = 2;
            for (let key = 0; key < interval_text.length; key++) {
                for (let type = 0; type < 3; type++) {
                    let pair = day_array[curr_day].getValuePair(type,key, exe)
                    if(pair[1] == 0) continue;
                    var perc = parseInt((pair[0]/pair[1]) * 100)
                    var perc10 = parseInt((pair[0]/pair[1]) * 10)
                    let correctBarsHTML = '';
                    for (let i = 0; i < perc10; i++) {
                        correctBarsHTML += '<a class="correct_bar"></a>';
                    }
                    let tp;
                    switch (type) {
                        case 0:
                        tp = 'ascending'
                        break;
                        case 1:
                        tp = 'descending'
                        break;
                        case 2:
                        tp = 'unison'
                        break;
                        default:
                        tp = "bosh"
                        break;
                    }
                    let name = scale_text[key] + ', ' + tp 
                    out +=  `<div class="exerciseRow">
                                 <p class="exerciseType">${name}</p>
                                 <div class="bars">
                                     <div class="correct_blocks">
                                         ${correctBarsHTML}
                                     </div>
                                 </div>
                                 <p class="exercisePercentage">${pair[0]}/${pair[1]} ${perc.toString()}%</p>
                             </div>`
                }
            }
            break;
            default:
                out = "elefante"
            break;
        }
    }
    if(out == ''){
        out = 'No scales played in this day.'
    }
    return out  
}

async function init(){
    let i = 0
    let str = "Container-" + i.toString()
    let item
    while(item = localStorage.getItem(str)){
        exe_array.push(new ExerciseContainer(null,i))
        let pair = exe_array[exe_array.length-1].calculateTotalCorrectResults()
        if(pair[1] == 0) exe_array.pop()
        i = i+1
        str = "Container-" + i.toString()
    }
    curr_exe = i-1
    i = 0
    str = "Day-" + i.toString()
    item = localStorage.getItem(str)
    while(item){
        //console.log(item)
        day_array.push(new DayContainer(i))
        let pair = day_array[day_array.length-1].calculateTotalCorrectResults()
        if(pair[1] == 0) day_array.pop()
        i = i+1
        str = "Day-" + i.toString()
        item = localStorage.getItem(str)
    }
    curr_day = i-1
    showCategory('exercise')
    is_first = 0
    console.log(day_array.length)
    console.log(exe_array.length)
}

init()