//[options for the exercise(check on exercise_vars)],[unison, asc,  desc],test or not,
const levelsConfig = {
    0: [ // Intervals
        { type: "separator", text: "Thirds" }, 
        { level: 1, params: [[2, 3], [1,0,0], 0] },
        { level: 2, params: [[2, 3], [0,1,0], 0] },
        { level: 3, params: [[2, 3], [0,0,1], 0] },
        { level: 4, params: [[2, 3], [1,1,1], 1] },
        { type: "separator", text: "Seconds" }, 
        { level: 5, params: [[0, 1], [1,0,0], 0] },
        { level: 6, params: [[0, 1], [0,1,0], 0] },
        { level: 7, params: [[0, 1], [0,0,1], 0] },
        { level: 8, params: [[0, 1], [1,1,1], 1] },
        { type: "separator", text: "Thrids and seconds" },  
        { level: 9, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 10, params: [[0, 1, 2, 3], [0,1,0], 0] },
        { level: 11, params: [[0, 1, 2, 3], [0,0,1], 0] },
        { level: 12, params: [[0, 1, 2, 3], [1,1,1], 1] },
        { type: "separator", text: "Perfect chords \n (fifths, forths, octaves)"}, 
        { level: 13, params: [[4,6,11], [1,0,0], 0] },
        { level: 14, params: [[4,6,11], [0,1,0], 0] },
        { level: 15, params: [[4,6,11], [0,0,1], 0] },
        { level: 16, params: [[4,6,11], [1,1,1], 1] },
        { type: "separator", text: "Sixths"}, 
        { level: 17, params: [[7,8], [1,0,0], 0] },
        { level: 18, params: [[7,8], [0,1,0], 0] },
        { level: 19, params: [[7,8], [0,0,1], 0] },
        { level: 20, params: [[7,8], [1,1,1], 1] },
        { type: "separator", text: "Sevenths"}, 
        { level: 20, params: [[9,10], [1,0,0], 0] },
        { level: 21, params: [[9,10], [0,1,0], 0] },
        { level: 22, params: [[9,10], [0,0,1], 0] },
        { level: 23, params: [[9,10], [1,1,1], 1] },
        { type: "separator", text: "Sixths and sevenths"}, 
        { level: 24, params: [[7,8,9,10], [1,0,0], 0] },
        { level: 25, params: [[7,8,9,10], [0,1,0], 0] },
        { level: 26, params: [[7,8,9,10], [0,0,1], 0] },
        { level: 27, params: [[7,8,9,10], [1,1,1], 1] },
        { type: "separator", text: "Fifths, forths and tritones"}, 
        { level: 28, params: [[4,5,6], [1,0,0], 0] },
        { level: 29, params: [[4,5,6], [0,1,0], 0] },
        { level: 30, params: [[4,5,6], [0,0,1], 0] },
        { level: 31, params: [[4,5,6], [1,1,1], 1] },
        { type: "separator", text: "All major and minor intervals \n (seconds, thirds, sixths, sevenths)"}, 
        { level: 32, params: [[0,1,2,3,7,8,9,10], [1,0,0], 0] },
        { level: 33, params: [[0,1,2,3,7,8,9,10], [0,1,0], 0] },
        { level: 34, params: [[0,1,2,3,7,8,9,10], [0,0,1], 0] },
        { level: 35, params: [[0,1,2,3,7,8,9,10], [1,1,1], 1] },
        { type: "separator", text: "All intervals"}, 
        { level: 36, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [1,0,0], 0] },
        { level: 37, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [0,1,0], 0] },
        { level: 38, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [0,0,1], 0] },
        { level: 39, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [1,1,1], 1] },
        { type: "separator", text: "" }, 

    ],
    1: 
    [ //chords
        { type: "separator", text: "Major and minor triads" }, 
        { level: 1, params: [[0, 1], [1,0,0], 0] },
        { level: 2, params: [[0, 1], [0,1,0], 0] },
        { level: 3, params: [[0, 1], [0,0,1], 0] },
        { level: 4, params: [[0, 1], [0,1,1], 0] },
        { level: 5, params: [[0, 1], [1,1,1], 1] },
        { type: "separator", text: "Agmented and diminished triads" }, 
        { level: 6, params: [[2, 3], [1,0,0], 0] },
        { level: 7, params: [[2, 3], [0,1,0], 0] },
        { level: 8, params: [[2, 3], [0,0,1], 0] },
        { level: 9, params: [[2, 3], [0,1,1], 0] },
        { level: 10, params: [[2, 3], [1,1,1], 1] },
        { type: "separator", text: "All triads" },  
        { level: 11, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 12, params: [[0, 1, 2, 3], [0,1,0], 0] },
        { level: 13, params: [[0, 1, 2, 3], [0,0,1], 0] },
        { level: 14, params: [[0, 1, 2, 3], [0,1,1], 0] },
        { level: 15, params: [[0, 1, 2, 3], [1,1,1], 1] },
        { type: "separator", text: "Major and minor sevenths" },  
        { level: 16, params: [[4,5], [1,0,0], 0] },
        { level: 17, params: [[4,5], [0,1,0], 0] },
        { level: 18, params: [[4,5], [0,0,1], 0] },
        { level: 19, params: [[4,5], [0,1,1], 0] },
        { level: 20, params: [[4,5], [1,1,1], 1] },
        { type: "separator", text: "Major and dominant sevenths" },  
        { level: 21, params: [[5,6], [1,0,0], 0] },
        { level: 22, params: [[5,6], [0,1,0], 0] },
        { level: 23, params: [[5,6], [0,0,1], 0] },
        { level: 24, params: [[5,6], [0,1,1], 0] },
        { level: 25, params: [[5,6], [1,1,1], 1] },
        { type: "separator", text: "Minor, half diminished and diminished senvenths" },  
        { level: 26, params: [[4,7,10], [1,0,0], 0] },
        { level: 27, params: [[4,7,10], [0,1,0], 0] },
        { level: 28, params: [[4,7,10], [0,0,1], 0] },
        { level: 29, params: [[4,7,10], [0,1,1], 0] },
        { level: 30, params: [[4,7,10], [1,1,1], 1] },
        { type: "separator", text: "Minor, major, dominant, half diminished and diminished sevenths" },  
        { level: 31, params: [[4,5,6,7,10], [1,0,0], 0] },
        { level: 32, params: [[4,5,6,7,10], [0,1,0], 0] },
        { level: 33, params: [[4,5,6,7,10], [0,0,1], 0] },
        { level: 34, params: [[4,5,6,7,10], [0,1,1], 0] },
        { level: 35, params: [[4,5,6,7,10], [1,1,1], 1] },
        { type: "separator", text: "Minor major sevenths (normal and ♭5)" }, 
        { level: 36, params: [[8,9], [1,0,0], 0] },
        { level: 37, params: [[8,9], [0,1,0], 0] },
        { level: 38, params: [[8,9], [0,0,1], 0] },
        { level: 39, params: [[8,9], [0,1,1], 0] },
        { level: 40, params: [[8,9], [1,1,1], 1] },
        { type: "separator", text: "Major sevenths (normal and #5)" }, 
        { level: 41, params: [[5,11], [1,0,0], 0] },
        { level: 42, params: [[5,11], [0,1,0], 0] },
        { level: 43, params: [[5,11], [0,0,1], 0] },
        { level: 44, params: [[5,11], [0,1,1], 0] },
        { level: 45, params: [[5,11], [1,1,1], 1] },
        { type: "separator", text: "Dominant sevenths (normal, ♭5 and #5)" }, 
        { level: 46, params: [[6,12,13], [1,0,0], 0] },
        { level: 47, params: [[6,12,13], [0,1,0], 0] },
        { level: 48, params: [[6,12,13], [0,0,1], 0] },
        { level: 49, params: [[6,12,13], [0,1,1], 0] },
        { level: 50, params: [[6,12,13], [1,1,1], 1] },
        { type: "separator", text: "Major, dominant and minor major sevenths (just normal)" }, 
        { level: 51, params: [[5,6,8], [1,0,0], 0] },
        { level: 52, params: [[5,6,8], [0,1,0], 0] },
        { level: 53, params: [[5,6,8], [0,0,1], 0] },
        { level: 54, params: [[5,6,8], [0,1,1], 0] },
        { level: 55, params: [[5,6,8], [1,1,1], 1] },
        { type: "separator", text: "All tetrads" }, 
        { level: 56, params: [[4,5,6,7,8,9,10,11,12,13], [1,0,0], 0] },
        { level: 57, params: [[4,5,6,7,8,9,10,11,12,13], [0,1,0], 0] },
        { level: 58, params: [[4,5,6,7,8,9,10,11,12,13], [0,0,1], 0] },
        { level: 59, params: [[4,5,6,7,8,9,10,11,12,13], [0,1,1], 0] },
        { level: 60, params: [[4,5,6,7,8,9,10,11,12,13], [1,1,1], 1] },
        { type: "separator", text: "Sus triads" }, 
        { level: 61, params: [[14,15], [1,0,0], 0] },
        { level: 62, params: [[14,15], [0,1,0], 0] },
        { level: 63, params: [[14,15], [0,0,1], 0] },
        { level: 64, params: [[14,15], [0,1,1], 0] },
        { level: 65, params: [[14,15], [1,1,1], 1] },
        { type: "separator", text: "Modal triads" }, 
        { level: 66, params: [[16,17,18], [1,0,0], 0] },
        { level: 67, params: [[16,17,18], [0,1,0], 0] },
        { level: 68, params: [[16,17,18], [0,0,1], 0] },
        { level: 69, params: [[16,17,18], [0,1,1], 0] },
        { level: 70, params: [[16,17,18], [1,1,1], 1] },
        { type: "separator", text: "Sixth chords" }, 
        { level: 71, params: [[19,20], [1,0,0], 0] },
        { level: 72, params: [[19,20], [0,1,0], 0] },
        { level: 73, params: [[19,20], [0,0,1], 0] },
        { level: 74, params: [[19,20], [0,1,1], 0] },
        { level: 75, params: [[19,20], [1,1,1], 1] },
        { type: "separator", text: "" }, 
    ],
    2: 
    [ // scales
        { type: "separator", text: "Major (Ionian) and minor (Aeolian)" }, 
        { level: 1, params: [[0, 5], [0,1,0], 0] },
        { level: 2, params: [[0, 5], [0,0,1], 0] },
        { level: 3, params: [[0, 5], [0,1,1], 0] },
        { level: 4, params: [[0, 5], [0,1,1], 1] },
        { type: "separator", text: "Major modes (Lydian, Ionian, Mixolydian)" }, 
        { level: 5, params: [[0,3,4], [0,1,0], 0] },
        { level: 6, params: [[0,3,4], [0,0,1], 0] },
        { level: 7, params: [[0,3,4], [0,1,1], 0] },
        { level: 8, params: [[0,3,4], [0,1,1], 1] },
        { type: "separator", text: "Minor modes (Dorian, Aeolian, Phrygian)" }, 
        { level: 9, params: [[1,5,2], [0,1,0], 0] },
        { level: 10, params: [[1,5,2], [0,0,1], 0] },
        { level: 11, params: [[1,5,2], [0,1,1], 0] },
        { level: 12, params: [[1,5,2], [0,1,1], 1] },
        { type: "separator", text: "Phrygian and Locrian (diminished)" }, 
        { level: 9, params: [[2,6], [0,1,0], 0] },
        { level: 10, params: [[2,6], [0,0,1], 0] },
        { level: 11, params: [[2,6], [0,1,1], 0] },
        { level: 12, params: [[2,6], [0,1,1], 1] },
        { type: "separator", text: "All modes" }, 
        { level: 13, params: [[0,1,2,3,4,5,6], [0,1,0], 0] },
        { level: 14, params: [[0,1,2,3,4,5,6], [0,0,1], 0] },
        { level: 15, params: [[0,1,2,3,4,5,6], [0,1,1], 0] },
        { level: 16, params: [[0,1,2,3,4,5,6], [0,1,1], 1] },
        { type: "separator", text: "Minor, harmonic minor and melodic minor" }, 
        { level: 17, params: [[5,7,14], [0,1,0], 0] },
        { level: 18, params: [[5,7,14], [0,0,1], 0] },
        { level: 19, params: [[5,7,14], [0,1,1], 0] },
        { level: 20, params: [[5,7,14], [0,1,1], 1] },
        { type: "separator", text: "Aeolian (normal, ♭5 and dominant)" }, 
        { level: 21, params: [[5,18,19], [0,1,0], 0] },
        { level: 22, params: [[5,18,19], [0,0,1], 0] },
        { level: 23, params: [[5,18,19], [0,1,1], 0] },
        { level: 24, params: [[5,18,19], [0,1,1], 1] },
        { type: "separator", text: "Dorian (normal, #11 and ♭2)" }, 
        { level: 25, params: [[1,10,15], [0,1,0], 0] },
        { level: 26, params: [[1,10,15], [0,0,1], 0] },
        { level: 27, params: [[1,10,15], [0,1,1], 0] },
        { level: 28, params: [[1,10,15], [0,1,1], 1] },
        { type: "separator", text: "Phrygian (normal and dominant)" }, 
        { level: 29, params: [[2,11], [0,1,0], 0] },
        { level: 30, params: [[2,11], [0,0,1], 0] },
        { level: 31, params: [[2,11], [0,1,1], 0] },
        { level: 32, params: [[2,11], [0,1,1], 1] },
        { type: "separator", text: "Lydian (normal, #2, augmented and dominant)" }, 
        { level: 33, params: [[3,12,16,17], [0,1,0], 0] },
        { level: 34, params: [[3,12,16,17], [0,0,1], 0] },
        { level: 35, params: [[3,12,16,17], [0,1,1], 0] },
        { level: 36, params: [[3,12,16,17], [0,1,1], 1] },
        { type: "separator", text: "Locrian (normal, ♮6 and bb7)" }, 
        { level: 37, params: [[6,8,13], [0,1,0], 0] },
        { level: 38, params: [[6,8,13], [0,0,1], 0] },
        { level: 39, params: [[6,8,13], [0,1,1], 0] },
        { level: 40, params: [[6,8,13], [0,1,1], 1] },
        { type: "separator", text: "Escales without 7 notes" }, 
        { level: 41, params: [[21,22,23], [0,1,0], 0] },
        { level: 42, params: [[21,22,23], [0,0,1], 0] },
        { level: 43, params: [[21,22,23], [0,1,1], 0] },
        { level: 44, params: [[21,22,23], [0,1,1], 1] },
        { type: "separator", text: "" }, 

    ],
    3:  [ // Vocal Intervals
        { type: "separator", text: "Thirds" }, 
        { level: 1, params: [[2, 3], [1,0,0], 0] },
        { level: 2, params: [[2, 3], [0,1,0], 0] },
        { level: 3, params: [[2, 3], [0,0,1], 0] },
        { level: 4, params: [[2, 3], [1,1,1], 1] },
        { type: "separator", text: "Seconds" }, 
        { level: 5, params: [[0, 1], [1,0,0], 0] },
        { level: 6, params: [[0, 1], [0,1,0], 0] },
        { level: 7, params: [[0, 1], [0,0,1], 0] },
        { level: 8, params: [[0, 1], [1,1,1], 1] },
        { type: "separator", text: "Thrids and seconds" },  
        { level: 9, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 10, params: [[0, 1, 2, 3], [0,1,0], 0] },
        { level: 11, params: [[0, 1, 2, 3], [0,0,1], 0] },
        { level: 12, params: [[0, 1, 2, 3], [1,1,1], 1] },
        { type: "separator", text: "Perfect chords \n (fifths, forths, octaves)"}, 
        { level: 13, params: [[4,6,11], [1,0,0], 0] },
        { level: 14, params: [[4,6,11], [0,1,0], 0] },
        { level: 15, params: [[4,6,11], [0,0,1], 0] },
        { level: 16, params: [[4,6,11], [1,1,1], 1] },
        { type: "separator", text: "Sixths"}, 
        { level: 17, params: [[7,8], [1,0,0], 0] },
        { level: 18, params: [[7,8], [0,1,0], 0] },
        { level: 19, params: [[7,8], [0,0,1], 0] },
        { level: 20, params: [[7,8], [1,1,1], 1] },
        { type: "separator", text: "Sevenths"}, 
        { level: 20, params: [[9,10], [1,0,0], 0] },
        { level: 21, params: [[9,10], [0,1,0], 0] },
        { level: 22, params: [[9,10], [0,0,1], 0] },
        { level: 23, params: [[9,10], [1,1,1], 1] },
        { type: "separator", text: "Sixths and sevenths"}, 
        { level: 24, params: [[7,8,9,10], [1,0,0], 0] },
        { level: 25, params: [[7,8,9,10], [0,1,0], 0] },
        { level: 26, params: [[7,8,9,10], [0,0,1], 0] },
        { level: 27, params: [[7,8,9,10], [1,1,1], 1] },
        { type: "separator", text: "Fifths, forths and tritones"}, 
        { level: 28, params: [[4,5,6], [1,0,0], 0] },
        { level: 29, params: [[4,5,6], [0,1,0], 0] },
        { level: 30, params: [[4,5,6], [0,0,1], 0] },
        { level: 31, params: [[4,5,6], [1,1,1], 1] },
        { type: "separator", text: "All major and minor intervals \n (seconds, thirds, sixths, sevenths)"}, 
        { level: 32, params: [[0,1,2,3,7,8,9,10], [1,0,0], 0] },
        { level: 33, params: [[0,1,2,3,7,8,9,10], [0,1,0], 0] },
        { level: 34, params: [[0,1,2,3,7,8,9,10], [0,0,1], 0] },
        { level: 35, params: [[0,1,2,3,7,8,9,10], [1,1,1], 1] },
        { type: "separator", text: "All intervals"}, 
        { level: 36, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [1,0,0], 0] },
        { level: 37, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [0,1,0], 0] },
        { level: 38, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [0,0,1], 0] },
        { level: 39, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [1,1,1], 1] },
        { type: "separator", text: "" }, 
    ]
};



// Función para generar los botones con texto explicativo entre las filas

function generateLevelButtons(levelsConfig) {
    let rowsHTML = '';
    let currentRow = [];  // Contendrá los botones de la fila actual
    let lvl;
let cat=parseInt(localStorage.getItem("category"));
if(cat==0){lvl=localStorage.getItem("lvlInterval")}
else{if(cat==1){lvl=localStorage.getItem("lvlChord")}
    else{lvl=localStorage.getItem("lvlScale")}
}

    levelsConfig.forEach(item => {
        if (item.type === "separator") {
        // Si es un separador, generar la fila anterior y añadir un título
        if (currentRow.length > 0) {
            rowsHTML += `<div class="level-row" >
                        ${currentRow.map(level => 
                            `<button class="level-btn ${(lvl < level.level) ? 'locked' : ''} ${level.params[2] === 1 ? 'test-btn' : ''}" data-level="${level.level}" 
                            onclick="selectLevel(${level.level},${JSON.stringify(level.params[0])}, ${JSON.stringify(level.params[1])}, ${level.params[2]})">
                            Level ${level.level}</button>`
                        ).join('')}
                        </div>`;
        }
        
        // Agregar el texto del separador
        rowsHTML += `<div class="row-title">${item.text}</div>`;
        
        // Reiniciar la fila actual
        currentRow = [];
        } else {
        // Si es un nivel, lo añadimos a la fila actual
        currentRow.push(item);
        }
    });

    // Añadir la última fila, si existe
    if (currentRow.length > 0) {
        rowsHTML += `<div class="level-row">
                    ${currentRow.map(level => 
                        `<button class="level-btn" data-level="${level.level}" 
                        onclick="selectLevel(${JSON.stringify(level.params[0])}, ${level.params[1]}, ${level.params[2]})">
                        Level ${level.level}</button>`
                    ).join('')}
                    </div>`;
    }

    return rowsHTML;
}

function selectLevel(level,intervals, type, test){
    let int_string = '';
    intervals.forEach(interval => {
        int_string = int_string + interval.toString() + '-'
    })
    let type_string = '';
    type.forEach(interval => {
        type_string = type_string + interval.toString() + '-'
    })

    int_string = int_string.slice(0, -1);
    type_string = type_string.slice(0, -1);
    let cat = localStorage.getItem("category");
    localStorage.setItem("key", int_string);
    localStorage.setItem("type", type_string);
    localStorage.setItem("test", test);
    localStorage.setItem("level", level);
    if(parseInt(cat) == 3) document.location.href = '/vocal-training/level.html'
    document.location.href = '/ear-training/level.html'
}

function selectCategory(arg){
    localStorage.setItem("category", arg);
    console.log(arg)
    document.location.href = '/ear-training/map.html'
}

function loadLevels(){
    cat = parseInt(localStorage.getItem("category"));
    lvl_div = document.getElementById("levels");
    lvl_div.innerHTML = generateLevelButtons(levelsConfig[cat]);
}

function goHome(){
    //in_fun() to be tested
    let cat = localStorage.getItem("category");
    if(cat) localStorage.removeItem("category")
    document.location.href = '/'
}

function getUsedLocalStorageSpace(){
    var allStrings = '';
    for(var key in window.localStorage){
        if(window.localStorage.hasOwnProperty(key)){
            allStrings += window.localStorage[key];
        }
    }
    return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
};
 // Update the description
