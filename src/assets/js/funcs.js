
const levelsConfig = {
    0: [ // Intervals
        { type: "separator", text: "Thirds" }, 
        { level: 1, params: [[2, 3], [1,1,0], 0] },
        { level: 2, params: [[2, 3], [1,0,0], 0] },
        { level: 3, params: [[2, 3], [1,0,0], 1] },
        { type: "separator", text: "Seconds" }, 
        { level: 4, params: [[0, 1], [1,0,0], 0] },
        { level: 5, params: [[0, 1], [1,0,0], 0] },
        { level: 6, params: [[0, 1], [1,0,0], 1] },
        { type: "separator", text: "Thrids and seconds" },  
        { level: 7, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 8, params: [[0, 1, 2, 3], [1,0,0], 1] },
        { level: 9, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 10, params: [[0, 1, 2, 3], [1,0,0], 1] },
        { type: "separator", text: "" }, 
    ],
    1: 
    [ //chords
        { type: "separator", text: "Triads" }, 
        { level: 1, params: [[0, 1], [1,1,0], 0] },
        { level: 1, params: [[0, 1], [0,0,1], 0] },
        { level: 2, params: [[0, 1, 2, 3], [1,1,0], 0] },
        { level: 2, params: [[0, 1, 2, 3], [0,0,1], 0] },
        { level: 3, params: [[0, 1, 2, 3], [0,0,1], 1] },
        { type: "separator", text: "Tetreads" }, 
        { level: 5, params: [[0, 1], [1,0,0], 0] },
        { level: 6, params: [[0, 1], [1,0,0], 1] },
        { type: "separator", text: "Extra Minor" },  
        { level: 7, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 8, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 9, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 10, params: [[0, 1, 2, 3], [1,0,0], 1] },
        { type: "separator", text: "Extra Major" },  
        { level: 7, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 8, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 9, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 10, params: [[0, 1, 2, 3], [1,0,0], 1] },
        { type: "separator", text: "" }, 
    ],
    2: 
    [ // scales
        { type: "separator", text: "Thirds" }, 
        { level: 1, params: [[2, 3], [1,0,0], 0] },
        { level: 2, params: [[2, 3], [1,0,0], 0] },
        { level: 3, params: [[2, 3], [1,0,0], 1] },
        { type: "separator", text: "Seconds" }, 
        { level: 4, params: [[0, 1], [1,0,0], 0] },
        { level: 5, params: [[0, 1], [1,0,0], 0] },
        { level: 6, params: [[0, 1], [1,0,0], 1] },
        { level: 7, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { type: "separator", text: "Thrids and seconds" }, 
        { level: 8, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 9, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 10, params: [[0, 1, 2, 3], [1,0,0], 1] },
        { type: "separator", text: "" }, 
    ]
  };



// Función para generar los botones con texto explicativo entre las filas
function generateLevelButtons(levelsConfig) {
    let rowsHTML = '';
    let currentRow = [];  // Contendrá los botones de la fila actual

    levelsConfig.forEach(item => {
        if (item.type === "separator") {
        // Si es un separador, generar la fila anterior y añadir un título
        if (currentRow.length > 0) {
            rowsHTML += `<div class="level-row">
                        ${currentRow.map(level => 
                            `<button class="level-btn ${level.params[2] === 1 ? 'test-btn' : ''}" data-level="${level.level}" 
                            onclick="selectLevel(${JSON.stringify(level.params[0])}, ${JSON.stringify(level.params[1])}, ${level.params[2]})">
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

function selectLevel(intervals, type, test){
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
    localStorage.setItem("key", int_string);
    localStorage.setItem("type", type_string);
    localStorage.setItem("test", test);
    document.location.href = '/ear-training/level.html'
}

function selectCategory(arg){
    localStorage.setItem("category", arg);
    if (arg == 4){
        document.location.href = '/ear-training/results.html'
    }
    else {
        document.location.href = '/ear-training/map.html'
    }
}

function loadLevels(){
    cat = parseInt(localStorage.getItem("category"));
    lvl_div = document.getElementById("levels");
    lvl_div.innerHTML = generateLevelButtons(levelsConfig[cat]);
}

function goHome(in_fun){
    //in_fun() to be tested
    //localStorage.clear()
    document.location.href = '/index.html'
}

function empty(){}

const levelDescription = document.getElementById('levelDescription');
//levelDescription.textContent = `Level ${whichever variable contains the level number}`; // Update the description
