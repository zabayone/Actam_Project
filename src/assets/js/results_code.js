var types
var values
var cat

var exe_array = []
var day_array = []

var curr_exe
var curr_day

var curr_cat

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
        switch (category) {
            case 'intervals': 
                break;
            case 'chords': 
                break;
            case 'scales': 
                break;
            default:
                break;
        }
    }

    sliderElements.forEach(element => {
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
    let correctBarsHTML = '';
    for (let i = 0; i < 10/*for testing*/; i++) {
        correctBarsHTML += '<a class="correct_bar"></a>';
    }

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
    //dimanic content for the bar, the percentage and the type are hardcoded for now, it should be something like ${percentage} and ${type}
    const dynamicContent = `
        <p>${ dyn_txt || 'No results available.'}</p>
        <div class="exerciseRow">
            <p class="exerciseType">Exercise type</p>
            <div class="bars">
                <div class="correct_blocks">
                    ${correctBarsHTML}
                </div>
            </div>
            <p class="exercisePercentage">12%</p>
        </div>    
    `;

    resultsContent.innerHTML = dynamicContent;
}

async function init(){
    let i = 0
    let str = "Container-" + i.toString()
    let item
    while(item = localStorage.getItem(str)){
        exe_array.push(new ExerciseContainer(null,i))
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
        i = i+1
        str = "Day-" + i.toString()
        item = localStorage.getItem(str)
    }
    curr_day = i-1
    showCategory('exercise')
    console.log(day_array.length)
    console.log(exe_array.length)
}

init()