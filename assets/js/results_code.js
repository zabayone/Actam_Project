var types
var values
var cat

var exe_array = []
var day_array = []

var curr_exe
var curr_day

var curr_cat='exercise'

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

    let language = localStorage.getItem('language')

    var calendar_txt = ''
    if(category == 'exercise') {
        for (let i = 0; i < exe_array.length; i++) {
            var categ = exe_array[i].getCategory()
            var keys = exe_array[i].getKeys()
            var str1 = `<span data-translate="exercise">Exercise</span> ${parseInt(i+1)}` /* i modified it to work with the translation */
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
        vocal: 'Vocal Exercises Results',
        exercise: 'Last exercise results'
    };

    const titlesIt = {
        intervals: 'Risultati degli intervalli',
        chords: 'Risultati degli accordi',
        scales: 'Risultati delle scale',
        vocal: 'Risultati degli intervalli vocali',
        exercise: 'Ultimo esercizio',
    }
    if (language == 'it') {
        resultsTitle.textContent = titlesIt[category] || 'Risultati';
    } else {
        resultsTitle.textContent = titles[category] || 'Results';
    }
    // Create the correct blocks HTML dynamically based on the correctCount

    // Update the content dynamically (this can be replaced with actual data fetching logic)
    const content = {
        intervals: 'Here are the results for intervals for day',
        chords: 'Here are the results for chords for day',
        scales: 'Here are the results for scales for day',
        vocal: 'Here are the results for vocal exercises for day',
        exercise: 'Here are the results of the Exercise',
    };

    const contentIt = {
        intervals: 'Ecco i risultati degli intervalli per il giorno',
        chords: 'Ecco i risultati degli accordi per il giorno',
        scales: 'Ecco i risultati delle scale per il giorno',
        vocal: 'Ecco i risultati degli intervalli vocali per il giorno',
        exercise: 'Ecco i risultati dell\'esercizio',
    };
    
    // Add the correct blocks and total block HTML to the content
    let dyn_txt
    if (language === 'en'){
        dyn_txt = content[category];
    }
    if (language === 'it'){
        dyn_txt = contentIt[category];
    }
    if(dyn_txt){
        if (category == 'exercise') {
            dyn_txt += ' ' + parseInt(curr_exe + 1).toString() + '.'
        } else {
            //console.log(curr_day)
            dyn_txt += ' ' + day_array[curr_day].date + '.'
        }
    }
    let bars = await getBars(category)
    const dynamicContent = `<p>${ dyn_txt || 'No results available.'}</p>` + bars;

    resultsContent.innerHTML = dynamicContent;
}

async function getBars(category) {
    let out = ''
    let language = localStorage.getItem('language');
    //console.log(category)
    if (category == 'exercise') {
        let keys = exe_array[curr_exe].getKeys()
        let types_arr = exe_array[curr_exe].getTypes()
        let categ = exe_array[curr_exe].getCategory()
        categ = parseInt(categ)
        //console.log(keys)
        //console.log(types_arr)
        //console.log(categ)
        let idx = 0;
        let types = []
        for await (const t of types_arr){
            t_int = parseInt(t)
            if(t_int != 0){
                types.push(idx)
            }
            idx += 1
        }
        //console.log(types)
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
                                tp = language === 'it' ? 'ascendente' : 'ascending';
                                break;
                            case 1:
                                tp = language === 'it' ? 'discendente' : 'descending';
                                break;
                            case 2:
                                tp = language === 'it' ? 'unisono' : 'unison';
                                break;
                            default:
                                tp = "bosh";
                                break;
                        }
                        let name;
                        if (language === 'it'){
                            name = interval_text_it[parseInt(keys[key_i])] + ', ' + tp 
                        }
                        else {
                            name = interval_text[parseInt(keys[key_i])] + ', ' + tp 
                        }
                        out +=  `<div class="exerciseRow">
                                     <p class="exerciseType">${name}</p>
                                     <div class="bars">
                                         <div class="correct_blocks">
                                             ${correctBarsHTML}
                                         </div>
                                     </div>
                                     <p class="exercisePercentage">${pair[0]}/${pair[1]} | (${perc.toString()}%)</p>
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
                                tp = language === 'it' ? 'ascendente' : 'ascending';
                                break;
                            case 1:
                                tp = language === 'it' ? 'discendente' : 'descending';
                                break;
                            case 2:
                                tp = language === 'it' ? 'unisono' : 'unison';
                                break;
                            default:
                                tp = "bosh";
                                break;
                        }
                        let name; 
                        if (language === 'it'){
                            name = chord_text_it[parseInt(keys[key_i])] + ', ' + tp 
                        }
                        else{
                            name = chord_text[parseInt(keys[key_i])] + ', ' + tp 
                        }
                        out +=  `<div class="exerciseRow">
                                     <p class="exerciseType">${name}</p>
                                     <div class="bars">
                                         <div class="correct_blocks">
                                             ${correctBarsHTML}
                                         </div>
                                     </div>
                                     <p class="exercisePercentage">${pair[0]}/${pair[1]} | ${perc.toString()}%</p>
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
                                tp = language === 'it' ? 'ascendente' : 'ascending';
                                break;
                            case 1:
                                tp = language === 'it' ? 'discendente' : 'descending';
                                break;
                            case 2:
                                tp = language === 'it' ? 'unisono' : 'unison';
                                break;
                            default:
                                tp = "bosh";
                                break;
                        }
                        let name;
                        if (language === 'it'){
                            name = scale_text_it[parseInt(keys[key_i])] + ', ' + tp 
                        }
                        else {
                            name = scale_text[parseInt(keys[key_i])] + ', ' + tp 
                        }
                        out +=  `<div class="exerciseRow">
                                     <p class="exerciseType">${name}</p>
                                     <div class="bars">
                                         <div class="correct_blocks">
                                             ${correctBarsHTML}
                                         </div>
                                     </div>
                                     <p class="exercisePercentage">${pair[0]}/${pair[1]} | ${perc.toString()}%</p>
                                 </div>`
                    }
               } 
            break;
            case 3:
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
                                tp = language === 'it' ? 'ascendente' : 'ascending';
                                break;
                            case 1:
                                tp = language === 'it' ? 'discendente' : 'descending';
                                break;
                            default:
                            tp = "bosh"
                            break;
                        }
                        let name;
                        if (language === 'it'){
                            name = interval_text_it[parseInt(keys[key_i])] + ', ' + tp 
                        }
                        else {
                            name = interval_text[parseInt(keys[key_i])] + ', ' + tp 
                        }
                        out +=  `<div class="exerciseRow">
                                     <p class="exerciseType">${name}</p>
                                     <div class="bars">
                                         <div class="correct_blocks">
                                             ${correctBarsHTML}
                                         </div>
                                     </div>
                                     <p class="exercisePercentage">${pair[0]}/${pair[1]} | ${perc.toString()}%</p>
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
                            tp = language === 'it' ? 'ascendente' : 'ascending';
                            break;
                        case 1:
                            tp = language === 'it' ? 'discendente' : 'descending';
                            break;
                        case 2:
                            tp = language === 'it' ? 'unisono' : 'unison';
                            break;
                        default:
                            tp = "bosh";
                            break;
                    }
                    let name;
                        if (language === 'it'){
                            name = interval_text_it[key] + ', ' + tp 
                        }
                        else {
                            name = interval_text[key] + ', ' + tp 
                        }
                    out +=  `<div class="exerciseRow">
                                 <p class="exerciseType">${name}</p>
                                 <div class="bars">
                                     <div class="correct_blocks">
                                         ${correctBarsHTML}
                                     </div>
                                 </div>
                                 <p class="exercisePercentage">${pair[0]}/${pair[1]} | ${perc.toString()}%</p>
                             </div>`
                }
            }
            if(out == ''){
                out = 'No intervals played in this day.'
            }
            break;
            case 'chords':
            exe = 1;
            for (let key = 0; key < chord_text.length; key++) {
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
                            tp = language === 'it' ? 'ascendente' : 'ascending';
                            break;
                        case 1:
                            tp = language === 'it' ? 'discendente' : 'descending';
                            break;
                        case 2:
                            tp = language === 'it' ? 'unisono' : 'unison';
                            break;
                        default:
                            tp = "bosh";
                            break;
                    }
                    let name; 
                        if (language === 'it'){
                            name = chord_text_it[key] + ', ' + tp 
                        }
                        else{
                            name = chord_text[key] + ', ' + tp 
                        }
                    out +=  `<div class="exerciseRow">
                                 <p class="exerciseType">${name}</p>
                                 <div class="bars">
                                     <div class="correct_blocks">
                                         ${correctBarsHTML}
                                     </div>
                                 </div>
                                 <p class="exercisePercentage">${pair[0]}/${pair[1]} | ${perc.toString()}%</p>
                             </div>`
                }
            }
            if(out == ''){
                out = 'No chords played in this day.'
            }
            break;
            case 'scales':
            exe = 2;
            for (let key = 0; key < scale_text.length; key++) {
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
                                tp = language === 'it' ? 'ascendente' : 'ascending';
                                break;
                            case 1:
                                tp = language === 'it' ? 'discendente' : 'descending';
                                break;
                            case 2:
                                tp = language === 'it' ? 'unisono' : 'unison';
                                break;
                            default:
                                tp = "bosh";
                                break;
                        }
                        let name;
                        if (language === 'it'){
                            name = scale_text_it[key] + ', ' + tp 
                        }
                        else {
                            name = scale_text[key] + ', ' + tp 
                        }
                    out +=  `<div class="exerciseRow">
                                 <p class="exerciseType">${name}</p>
                                 <div class="bars">
                                     <div class="correct_blocks">
                                         ${correctBarsHTML}
                                     </div>
                                 </div>
                                 <p class="exercisePercentage">${pair[0]}/${pair[1]} | ${perc.toString()}%</p>
                             </div>`
                }
            }
            if(out == ''){
                out = 'No scales played in this day.'
            }
            break;
            case 'vocal':
            exe = 3;
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
                            tp = language === 'it' ? 'ascendente' : 'ascending';
                            break;
                        case 1:
                            tp = language === 'it' ? 'discendente' : 'descending';
                            break;
                        default:
                        tp = "bosh"
                        break;
                    }
                    let name;
                    if (language === 'it'){
                        name = interval_text_it[key] + ', ' + tp 
                    }
                    else {
                        name = interval_text[key] + ', ' + tp 
                    }
                    out +=  `<div class="exerciseRow">
                                 <p class="exerciseType">${name}</p>
                                 <div class="bars">
                                     <div class="correct_blocks">
                                         ${correctBarsHTML}
                                     </div>
                                 </div>
                                 <p class="exercisePercentage">${pair[0]}/${pair[1]} | ${perc.toString()}%</p>
                             </div>`
                }
            }
            if(out == ''){
                out = 'No vocal exercises played in this day.'
            }
            break;
            default:
                out = ""
            break;
        }
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
    switchCurrentExercise(exe_array.length-1)
    i = 0
    str = "Day-" + i.toString()
    item = localStorage.getItem(str)
    while(item){
        ////console.log(item)
        day_array.push(new DayContainer(i))
        let pair = day_array[day_array.length-1].calculateTotalCorrectResults()
        if(pair[1] == 0) day_array.pop()
        i = i+1
        str = "Day-" + i.toString()
        item = localStorage.getItem(str)
    }
    curr_day = i-1
    is_first = 0
}

const littleGuy=document.getElementById('boton');
let active=false;


function showMessage(){
    let cat = localStorage.getItem("category");
    let level = localStorage.getItem("level");
    const container =document.getElementById("tutorial");
    container.style.display="block"
    container.innerHTML = `
    <p>Here are your stats</p>
    <p>On exercise, you can check every exercise you did on your last sesion</p> 
    <p>On the other windows, you can check your detailed results for each day</p> 
    <p>On the right, you can select which day do you want to look at</p> 
`

}

littleGuy.addEventListener('click', () => {
    // Remove the 'active' class from all elements
    if(active){
        document.getElementById("tutorial").innerHTML='';
        tutorial.style.display='none';
    }else{
        showMessage();
    }
    active = !active
});

init()
