//[options for the exercise(check on exercise_vars)],[unison, asc,  desc],test or not,
const levelsConfig = {
    0: [ // Intervals
        { type: "separator", text: "Thirds" , textIt: "Terze"}, 
        { level: 1, params: [[2, 3], [0,0,1], 0] },
        { level: 2, params: [[2, 3], [1,0,0], 0] },
        { level: 3, params: [[2, 3], [0,1,0], 0] },
        { level: 4, params: [[2, 3], [1,1,1], 1] },
        { type: "separator", text: "Seconds", textIt: "Seconde"}, 
        { level: 5, params: [[0, 1], [0,0,1], 0] },
        { level: 6, params: [[0, 1], [1,0,0], 0] },
        { level: 7, params: [[0, 1], [0,1,0], 0] },
        { level: 8, params: [[0, 1], [1,1,1], 1] },
        { type: "separator", text: "Thrids and seconds", textIt:"Terze e Seconde"},  
        { level: 9, params: [[0, 1, 2, 3], [0,0,1], 0] },
        { level: 10, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 11, params: [[0, 1, 2, 3], [0,1,0], 0] },
        { level: 12, params: [[0, 1, 2, 3], [1,1,1], 1] },
        { type: "separator", text: "Perfect chords \n (fifths, forths, octaves)", textIt:"Accordi Perfetti \n (quinte, quarte, ottave)"}, 
        { level: 13, params: [[4,6,11], [0,0,1], 0] },
        { level: 14, params: [[4,6,11], [1,0,0], 0] },
        { level: 15, params: [[4,6,11], [0,1,0], 0] },
        { level: 16, params: [[4,6,11], [1,1,1], 1] },
        { type: "separator", text: "Sixths", textIt: "Seste"}, 
        { level: 17, params: [[7,8], [0,0,1], 0] },
        { level: 18, params: [[7,8], [1,0,0], 0] },
        { level: 19, params: [[7,8], [0,1,0], 0] },
        { level: 20, params: [[7,8], [1,1,1], 1] },
        { type: "separator", text: "Sevenths", textIt: "Settime"}, 
        { level: 21, params: [[9,10], [0,0,1], 0] },
        { level: 22, params: [[9,10], [1,0,0], 0] },
        { level: 23, params: [[9,10], [0,1,0], 0] },
        { level: 24, params: [[9,10], [1,1,1], 1] },
        { type: "separator", text: "Sixths and sevenths", textIt: "Seste e Settime"}, 
        { level: 25, params: [[7,8,9,10], [0,0,1], 0] },
        { level: 26, params: [[7,8,9,10], [1,0,0], 0] },
        { level: 27, params: [[7,8,9,10], [0,1,0], 0] },
        { level: 28, params: [[7,8,9,10], [1,1,1], 1] },
        { type: "separator", text: "Fifths, forths and tritones", textIt: "Quinte, Quarte e tritoni"}, 
        { level: 29, params: [[4,5,6], [0,0,1], 0] },
        { level: 30, params: [[4,5,6], [1,0,0], 0] },
        { level: 31, params: [[4,5,6], [0,1,0], 0] },
        { level: 32, params: [[4,5,6], [1,1,1], 1] },
        { type: "separator", text: "All major and minor intervals \n (seconds, thirds, sixths, sevenths)", textIt: "Tutti gli intervalli maggiori e minori \n (seconde, terze, seste, settime)"}, 
        { level: 33, params: [[0,1,2,3,7,8,9,10], [0,0,1], 0] },
        { level: 34, params: [[0,1,2,3,7,8,9,10], [1,0,0], 0] },
        { level: 35, params: [[0,1,2,3,7,8,9,10], [0,1,0], 0] },
        { level: 36, params: [[0,1,2,3,7,8,9,10], [1,1,1], 1] },
        { type: "separator", text: "All intervals", textIt: "Tutti gli intervalli"}, 
        { level: 37, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [0,0,1], 0] },
        { level: 38, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [1,0,0], 0] },
        { level: 39, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [0,1,0], 0] },
        { level: 40, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [1,1,1], 1] },
        { type: "separator", text: "" , textIt: ""}, 

    ],
    1: 
    [ //chords
        { type: "separator", text: "Major and minor triads", textIt: "Triadi Maggiori e Minori" }, 
        { level: 1, params: [[0, 1], [0,0,1], 0] },
        { level: 2, params: [[0, 1], [1,0,0], 0] },
        { level: 3, params: [[0, 1], [0,1,0], 0] },
        { level: 4, params: [[0, 1], [1,1,1], 1] },
        { type: "separator", text: "Agmented and diminished triads", textIt: "Triadi Aumentate e Diminuite"}, 
        { level: 5, params: [[2, 3], [0,0,1], 0] },
        { level: 6, params: [[2, 3], [1,0,0], 0] },
        { level: 7, params: [[2, 3], [0,1,0], 0] },
        { level: 8, params: [[2, 3], [1,1,1], 1] },
        { type: "separator", text: "All triads", textIt: "Tutte le triadi"},  
        { level: 9, params: [[0, 1, 2, 3], [0,0,1], 0] },
        { level: 10, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 11, params: [[0, 1, 2, 3], [0,1,0], 0] },
        { level: 12, params: [[0, 1, 2, 3], [1,1,1], 1] },
        { type: "separator", text: "Major and minor sevenths", textIt: "Settime maggiori e minori"},  
        { level: 13, params: [[4,5], [0,0,1], 0] },
        { level: 14, params: [[4,5], [1,0,0], 0] },
        { level: 15, params: [[4,5], [0,1,0], 0] },
        { level: 16, params: [[4,5], [1,1,1], 1] },
        { type: "separator", text: "Major and dominant sevenths", textIt: "Settime maggiori e dominanti"},  
        { level: 17, params: [[5,6], [0,0,1], 0] },
        { level: 18, params: [[5,6], [1,0,0], 0] },
        { level: 18, params: [[5,6], [0,1,0], 0] },
        { level: 20, params: [[5,6], [1,1,1], 1] },
        { type: "separator", text: "Minor, half diminished and diminished senvenths", textIt: "Settime minori, mezze diminuite e diminuite"},  
        { level: 21, params: [[4,7,10], [0,0,1], 0] },
        { level: 22, params: [[4,7,10], [1,0,0], 0] },
        { level: 23, params: [[4,7,10], [0,1,0], 0] },
        { level: 24, params: [[4,7,10], [1,1,1], 1] },
        { type: "separator", text: "Minor, major, dominant, half diminished and diminished sevenths", textIt: "Settime minori, maggiori, dominanti, mezze diminuite e diminuite" },  
        { level: 25, params: [[4,5,6,7,10], [0,0,1], 0] },
        { level: 26, params: [[4,5,6,7,10], [1,0,0], 0] },
        { level: 27, params: [[4,5,6,7,10], [0,1,0], 0] },
        { level: 28, params: [[4,5,6,7,10], [1,1,1], 1] },
        { type: "separator", text: "Minor major sevenths (normal and ♭5)", textIt: "settime Minori-Maggiori (normali e ♭5)"}, 
        { level: 29, params: [[8,9], [0,0,1], 0] },
        { level: 30, params: [[8,9], [1,0,0], 0] },
        { level: 31, params: [[8,9], [0,1,0], 0] },
        { level: 32, params: [[8,9], [1,1,1], 1] },
        { type: "separator", text: "Major sevenths (normal and #5)", textIt: "Settime maggiori (normali e #5)" }, 
        { level: 33, params: [[5,11], [0,0,1], 0] },
        { level: 34, params: [[5,11], [1,0,0], 0] },
        { level: 35, params: [[5,11], [0,1,0], 0] },
        { level: 36, params: [[5,11], [1,1,1], 1] },
        { type: "separator", text: "Dominant sevenths (normal, ♭5 and #5)", textIt: "Settime dominanti (normali, ♭5 and #5)" }, 
        { level: 37, params: [[6,12,13], [0,0,1], 0] },
        { level: 38, params: [[6,12,13], [1,0,0], 0] },
        { level: 39, params: [[6,12,13], [0,1,0], 0] },
        { level: 40, params: [[6,12,13], [1,1,1], 1] },
        { type: "separator", text: "Major, dominant and minor major sevenths (just normal)" , textIt: "Settime maggiori, dominanti e minori-maggiori (solo normali)"}, 
        { level: 41, params: [[5,6,8], [0,0,1], 0] },
        { level: 42, params: [[5,6,8], [1,0,0], 0] },
        { level: 43, params: [[5,6,8], [0,1,0], 0] },
        { level: 44, params: [[5,6,8], [1,1,1], 1] },
        { type: "separator", text: "All tetrads" , textIt: "Tutte le tetradi"}, 
        { level: 45, params: [[4,5,6,7,8,9,10,11,12,13], [0,0,1], 0] },
        { level: 46, params: [[4,5,6,7,8,9,10,11,12,13], [1,0,0], 0] },
        { level: 47, params: [[4,5,6,7,8,9,10,11,12,13], [0,1,0], 0] },
        { level: 48, params: [[4,5,6,7,8,9,10,11,12,13], [1,1,1], 1] },
        { type: "separator", text: "Sus triads" , textIt: "Tetradi sospese"}, 
        { level: 49, params: [[14,15], [0,0,1], 0] },
        { level: 50, params: [[14,15], [1,0,0], 0] },
        { level: 51, params: [[14,15], [0,1,0], 0] },
        { level: 52, params: [[14,15], [1,1,1], 1] },
        { type: "separator", text: "Modal triads", textIt: "Triadi modali" }, 
        { level: 53, params: [[16,17,18], [0,0,1], 0] },
        { level: 54, params: [[16,17,18], [1,0,0], 0] },
        { level: 55, params: [[16,17,18], [0,1,0], 0] },
        { level: 56, params: [[16,17,18], [1,1,1], 1] },
        { type: "separator", text: "Sixth chords", textIt: "Accordi di sesta" }, 
        { level: 57, params: [[19,20], [0,0,1], 0] },
        { level: 58, params: [[19,20], [1,0,0], 0] },
        { level: 59, params: [[19,20], [0,1,0], 0] },
        { level: 60, params: [[19,20], [1,1,1], 1] },
        { type: "separator", text: "", textIt: ""}, 
    ],
    2: 
    [ // scales
        { type: "separator", text: "Major (Ionian) and minor (Aeolian)", textIt: "Maggiore (Ionica) e minore (Eolia)"}, 
        { level: 1, params: [[0, 5], [1,0,0], 0] },
        { level: 2, params: [[0, 5], [0,1,0], 0] },
        { level: 3, params: [[0, 5], [1,1,0], 0] },
        { level: 4, params: [[0, 5], [1,1,0], 1] },
        { type: "separator", text: "Major modes (Lydian, Ionian, Mixolydian)", textIt: "Modi maggiori (Lidia, Ionica, Misolidia)" }, 
        { level: 5, params: [[0,3,4], [1,0,0], 0] },
        { level: 6, params: [[0,3,4], [0,1,0], 0] },
        { level: 7, params: [[0,3,4], [1,1,0], 0] },
        { level: 8, params: [[0,3,4], [1,1,0], 1] },
        { type: "separator", text: "Minor modes (Dorian, Aeolian, Phrygian)", textIt: "Modi minori (Dorica, Eolia, Frigia)" }, 
        { level: 9, params: [[1,5,2], [1,0,0], 0] },
        { level: 10, params: [[1,5,2], [0,1,0], 0] },
        { level: 11, params: [[1,5,2], [1,1,0], 0] },
        { level: 12, params: [[1,5,2], [1,1,0], 1] },
        { type: "separator", text: "Phrygian and Locrian (diminished)", textIt: "Frigia e Locria" }, 
        { level: 9, params: [[2,6], [1,0,0], 0] },
        { level: 10, params: [[2,6], [0,1,0], 0] },
        { level: 11, params: [[2,6], [1,1,0], 0] },
        { level: 12, params: [[2,6], [1,1,0], 1] },
        { type: "separator", text: "All modes", textIt: "Tutti i mmodi" }, 
        { level: 13, params: [[0,1,2,3,4,5,6], [1,0,0], 0] },
        { level: 14, params: [[0,1,2,3,4,5,6], [0,1,0], 0] },
        { level: 15, params: [[0,1,2,3,4,5,6], [1,1,0], 0] },
        { level: 16, params: [[0,1,2,3,4,5,6], [1,1,0], 1] },
        { type: "separator", text: "Minor, harmonic minor and melodic minor", textIt: "Minore, Armonica minore e melodica minore" }, 
        { level: 17, params: [[5,7,14], [1,0,0], 0] },
        { level: 18, params: [[5,7,14], [0,1,0], 0] },
        { level: 19, params: [[5,7,14], [1,1,0], 0] },
        { level: 20, params: [[5,7,14], [1,1,0], 1] },
        { type: "separator", text: "Aeolian (normal, ♭5 and dominant)", textIt: "Eolia (normale, ♭5 e dominante)"}, 
        { level: 21, params: [[5,18,19], [1,0,0], 0] },
        { level: 22, params: [[5,18,19], [0,1,0], 0] },
        { level: 23, params: [[5,18,19], [1,1,0], 0] },
        { level: 24, params: [[5,18,19], [1,1,0], 1] },
        { type: "separator", text: "Dorian (normal, #11 and ♭2)", textIt: "Dorica (normale, #11 e ♭2)" }, 
        { level: 25, params: [[1,10,15], [1,0,0], 0] },
        { level: 26, params: [[1,10,15], [0,1,0], 0] },
        { level: 27, params: [[1,10,15], [1,1,0], 0] },
        { level: 28, params: [[1,10,15], [1,1,0], 1] },
        { type: "separator", text: "Phrygian (normal and dominant)", textIt: "Frigia (normale e dominante)" }, 
        { level: 29, params: [[2,11], [1,0,0], 0] },
        { level: 30, params: [[2,11], [0,1,0], 0] },
        { level: 31, params: [[2,11], [1,1,0], 0] },
        { level: 32, params: [[2,11], [1,1,0], 1] },
        { type: "separator", text: "Lydian (normal, #2, augmented and dominant)", textIt: "Lidia (normale, #2, aumentata e domiannte)" }, 
        { level: 33, params: [[3,12,16,17], [1,0,0], 0] },
        { level: 34, params: [[3,12,16,17], [0,1,0], 0] },
        { level: 35, params: [[3,12,16,17], [1,1,0], 0] },
        { level: 36, params: [[3,12,16,17], [1,1,0], 1] },
        { type: "separator", text: "Locrian (normal, ♮6 and bb7)", textIt: "Locria (normale, ♮6 e bb7)" }, 
        { level: 37, params: [[6,8,13], [1,0,0], 0] },
        { level: 38, params: [[6,8,13], [0,1,0], 0] },
        { level: 39, params: [[6,8,13], [1,1,0], 0] },
        { level: 40, params: [[6,8,13], [1,1,0], 1] },
        { type: "separator", text: "Scales without 7 notes", textIt: "Scale senza la settima" }, 
        { level: 41, params: [[21,22,23], [1,0,0], 0] },
        { level: 42, params: [[21,22,23], [0,1,0], 0] },
        { level: 43, params: [[21,22,23], [1,1,0], 0] },
        { level: 44, params: [[21,22,23], [1,1,0], 1] },
        { type: "separator", text: "" , textIt: ""}, 

    ],
    3:  [ // Vocal Intervals
        { type: "separator", text: "Thirds", textIt: "Terze" }, 
        { level: 1, params: [[2, 3], [1,0,0], 0] },
        { level: 2, params: [[2, 3], [0,1,0], 0] },
        { level: 3, params: [[2, 3], [1,1,0], 0] },
        { level: 4, params: [[2, 3], [1,1,1], 1] },
        { type: "separator", text: "Seconds", textIt: "Seconde" }, 
        { level: 5, params: [[0, 1], [1,0,0], 0] },
        { level: 6, params: [[0, 1], [0,1,0], 0] },
        { level: 7, params: [[0, 1], [1,1,0], 0] },
        { level: 8, params: [[0, 1], [1,1,1], 1] },
        { type: "separator", text: "Thrids and seconds", textIt: "Terze e Seconde" },  
        { level: 9, params: [[0, 1, 2, 3], [1,0,0], 0] },
        { level: 10, params: [[0, 1, 2, 3], [0,1,0], 0] },
        { level: 11, params: [[0, 1, 2, 3], [1,1,0], 0] },
        { level: 12, params: [[0, 1, 2, 3], [1,1,1], 1] },
        { type: "separator", text: "Perfect chords \n (fifths, forths, octaves)", textIt: "Accordi perfetti \n (quinte, quarte, ottave)"}, 
        { level: 13, params: [[4,6,11], [1,0,0], 0] },
        { level: 14, params: [[4,6,11], [0,1,0], 0] },
        { level: 15, params: [[4,6,11], [1,1,0], 0] },
        { level: 16, params: [[4,6,11], [1,1,1], 1] },
        { type: "separator", text: "Sixths", textIt: "Seste"}, 
        { level: 17, params: [[7,8], [1,0,0], 0] },
        { level: 18, params: [[7,8], [0,1,0], 0] },
        { level: 19, params: [[7,8], [1,1,0], 0] },
        { level: 20, params: [[7,8], [1,1,1], 1] },
        { type: "separator", text: "Sevenths", textIt: "Settime"}, 
        { level: 21, params: [[9,10], [1,0,0], 0] },
        { level: 22, params: [[9,10],[0,1,0], 0] },
        { level: 23, params: [[9,10], [1,1,0], 0] },
        { level: 24, params: [[9,10], [1,1,1], 1] },
        { type: "separator", text: "Sixths and sevenths", textIt: "Seste e Settime"}, 
        { level: 25, params: [[7,8,9,10],[1,0,0], 0] },
        { level: 26, params: [[7,8,9,10], [0,1,0], 0] },
        { level: 27, params: [[7,8,9,10], [1,1,0], 0] },
        { level: 28, params: [[7,8,9,10], [1,1,1], 1] },
        { type: "separator", text: "Fifths, forths and tritones", textIt: "Quinte, Quarte e Tritoni"}, 
        { level: 29, params: [[4,5,6], [1,0,0], 0] },
        { level: 30, params: [[4,5,6], [0,1,0], 0] },
        { level: 31, params: [[4,5,6], [1,1,0], 0] },
        { level: 32, params: [[4,5,6], [1,1,1], 1] },
        { type: "separator", text: "All major and minor intervals \n (seconds, thirds, sixths, sevenths)", textIt: "Tutti gli intervalli maggiori e minori \n (seconde, terze, seste, settime)"}, 
        { level: 33, params: [[0,1,2,3,7,8,9,10], [1,0,0], 0] },
        { level: 34, params: [[0,1,2,3,7,8,9,10], [0,1,0], 0] },
        { level: 35, params: [[0,1,2,3,7,8,9,10], [1,1,0], 0] },
        { level: 36, params: [[0,1,2,3,7,8,9,10], [1,1,1], 1] },
        { type: "separator", text: "All intervals", textIt: "Tutti gli intervalli"}, 
        { level: 37, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [1,0,0], 0] },
        { level: 38, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [0,1,0], 0] },
        { level: 39, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [1,1,0], 0] },
        { level: 40, params: [[0,1,2,3,4,5,6,7,8,9,10,11], [1,1,1], 1] },
        { type: "separator", text: "" , textIt: ""}, 
     
    ]
};



// Función para generar los botones con texto explicativo entre las filas

function generateLevelButtons(levelsConfig) {
    let rowsHTML = '';
    let currentRow = [];  // Contendrá los botones de la fila actual
    let lvl;
    language = localStorage.getItem("language");
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
                            `<button class="level-btn ${(lvl*4 < (level.level)) ? 'locked' : ''} ${level.params[2] === 1 ? 'test-btn' : ''}" data-level="${level.level}" 
                            onclick="selectLevel(${level.level},${JSON.stringify(level.params[0])}, ${JSON.stringify(level.params[1])}, ${level.params[2]})" data-translate="level">
                            Level ${level.level}</button>`
                        ).join('')}
                        </div>`;
        }
        
        // Agregar el texto del separador
        if (language==='it'){
            rowsHTML += `<div class="row-title">${item.textIt}</div>`;
        }
        else {
        rowsHTML += `<div class="row-title">${item.text}</div>`;
        }
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
                        onclick="selectLevel(${JSON.stringify(level.params[0])}, ${level.params[1]}, ${level.params[2]})" data-translate="level">
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
    if(parseInt(cat) == 3) {
        document.location.href = '/vocal-training/level.html'
    } else document.location.href = '/ear-training/level.html'
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
    setLanguage(language);
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


 function handleGuessTheNoteClick() {
    // Guardar una variable en el localStorage
    localStorage.setItem('selectedGuessTheNote', 'true');
    localStorage.setItem('selectedGuitar', 'false');
    console.log("guess")
}

function handleGuitarClick() {
    // Guardar una variable en el localStorage
    localStorage.setItem('selectedGuessTheNote', 'false');
    localStorage.setItem('selectedGuitar', 'true');
    console.log("guitar")
}