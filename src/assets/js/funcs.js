const level_buttons = [ // buttons for intervals
                       '<button class="level-btn" data-level="1" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 1</button>'+
                       '<button class="level-btn" data-level="2" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 2</button>'+
                       '<button class="level-btn" data-level="3" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 3</button>'+
                       '<button class="level-btn" data-level="4" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 4</button>'+
                       '<button class="level-btn" data-level="5" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 5</button>'+
                       '<button class="level-btn" data-level="6" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 6</button>'+
                       '<button class="level-btn" data-level="7" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 7</button>'+
                       '<button class="level-btn" data-level="8" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 8</button>'+
                       '<button class="level-btn" data-level="9" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 9</button>',
                        // buttons for chords
                       '<button class="level-btn" data-level="1" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 1</button>'+
                       '<button class="level-btn" data-level="2" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 2</button>'+
                       '<button class="level-btn" data-level="3" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 3</button>'+
                       '<button class="level-btn" data-level="4" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 4</button>'+
                       '<button class="level-btn" data-level="5" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 5</button>'+
                       '<button class="level-btn" data-level="6" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 6</button>'+
                       '<button class="level-btn" data-level="7" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 7</button>'+
                       '<button class="level-btn" data-level="8" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 8</button>'+
                       '<button class="level-btn" data-level="9" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 9</button>',
                        // buttons for scales
                       '<button class="level-btn" data-level="1" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 1</button>'+
                       '<button class="level-btn" data-level="2" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 2</button>'+
                       '<button class="level-btn" data-level="3" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 3</button>'+
                       '<button class="level-btn" data-level="4" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 4</button>'+
                       '<button class="level-btn" data-level="5" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 5</button>'+
                       '<button class="level-btn" data-level="6" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 6</button>'+
                       '<button class="level-btn" data-level="7" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 7</button>'+
                       '<button class="level-btn" data-level="8" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 8</button>'+
                       '<button class="level-btn" data-level="9" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 9</button>',
                        // buttons for sandbox
                       '<button class="level-btn" data-level="1" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 1</button>'+
                       '<button class="level-btn" data-level="2" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 2</button>'+
                       '<button class="level-btn" data-level="3" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 3</button>'+
                       '<button class="level-btn" data-level="4" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 4</button>'+
                       '<button class="level-btn" data-level="5" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 5</button>'+
                       '<button class="level-btn" data-level="6" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 6</button>'+
                       '<button class="level-btn" data-level="7" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 7</button>'+
                       '<button class="level-btn" data-level="8" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 8</button>'+
                       '<button class="level-btn" data-level="9" data-translate="level" onclick = "selectLevel([1,2,3],[1,0,1],0)">Level 9</button>',
]
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
    document.location.href = 'level.html'
}

function selectCategory(arg){
    localStorage.setItem("category", arg);
    document.location.href = 'map.html'
}

function loadLevels(){
    cat = localStorage.getItem("category");
    lvl_div = document.getElementById("levels");
    lvl_div.innerHTML = level_buttons[parseInt(cat)]
}