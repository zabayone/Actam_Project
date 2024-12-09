var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

// text for the interval buttons
var interval_text = ['Minor Second',        //  0
                     'Major Second',        //  1
                     'Minor Third',         //  2
                     'Major Third',         //  3
                     'Perfect Forth',       //  4
                     'Tritone',             //  5
                     'Perfect Fifth',       //  6
                     'Minor Sixth',         //  7
                     'Major Sixth',         //  8
                     'Minor Seventh',       //  9
                     'Major Seventh',       // 10
                     'Octave']              // 11
// text for the chord buttons
var chord_text = ['Minor Triad',            //  0
                  'Major Triad',            //  1
                  'Diminished Triad',       //  2
                  'Augmented Triad',        //  3
                  'Minor Seventh',          //  4
                  'Major Seventh',          //  5
                  'Dominant Seventh',       //  6 
                  'Half Deminished',        //  7
                  'Minor Major 7th',        //  8
                  'Minor Major 7th (b5)',   //  9
                  'Diminished Seventh',     // 10
                  'Major Seventh (#5)',     // 11
                  'Dominant Seventh (#5)',  // 12
                  'Dominant Seventh (b5)',  // 13
                  'Sus2 Triad',             // 14
                  'Sus4 Triad',             // 15
                  'Lydian Triad',           // 16
                  'Phrygian Triad',         // 17
                  'Locrian Triad',          // 18
                  'Minor Sixth',            // 19
                  'Major Sixth'             // 20
                  ]           

var chord_codes = ['3 7',                   //  0
                   '4 7',                   //  1
                   '3 6',                   //  2
                   '4 8',                   //  3
                   '3 7 10',                //  4
                   '4 7 11',                //  5
                   '4 7 10',                //  6
                   '3 6 10',                //  7
                   '3 7 11',                //  8
                   '3 6 11',                //  9
                   '6 3 9',                 // 10
                   '4 8 11',                // 11
                   '4 8 10',                // 12
                   '4 6 10',                // 13
                   '2 7',                   // 14
                   '5 7',                   // 15
                   '6 7',                   // 16
                   '1 7',                   // 17
                   '1 6',                   // 18
                   '3 7 9',                 // 19
                   '4 7 9'                  // 20
                    ]

// controls for the chord exercises
var controls = [ // controls for intervals
                '<button id = "replay" onclick = "replay()" class = "controls_button">Replay</button>'+
                '<button id = "next" onclick = "next()" class = "controls_button">Next</button>',
                 // controls for chords
                '<button id = "replay" onclick = "replay()" class = "controls_button">Replay</button>'+
                '<button id = "root" onclick = "play_root()" class = "controls_button">Root</button>'+
                '<button id = "next" onclick = "next()" class = "controls_button">Next</button>',
                 // controls for scales
                '<button id = "replay" onclick = "replay()" class = "controls_button">Replay</button>'+
                '<button id = "next" onclick = "next()" class = "controls_button">Next</button>',
                 // controls for sandbox
                 '<button id = "replay" onclick = "replay()" class = "controls_button">Replay</button>'+
                 '<button id = "next" onclick = "next()" class = "controls_button">Next</button>',
            ]

var hide_btn = '<button data-translate="show" class="Piano-btn" id="hidden" onclick="hideKeyboard()">Show Keyboard</button>'

var keyboard_html = '<div id="key_control">'+
    
    '<button data-translate="octaveDown" class="Piano-btn" id="oct" onclick="octaveDown()">Octave Down</button>'+
    '<button data-translate="octaveUp" class="Piano-btn" id="oct" onclick="octaveUp()">Octave Up</button>'+
    `<button data-translate="hide" class="Piano-btn" id="hide" onclick="hideKeyboard()">Hide</button>`+
    '</div>'+
    '<li class="white c" data-note="60" onclick="playNoteFromMIDI([60])"></li> <!-- C4 (MIDI 60) -->'+
    '<li class="black cs" data-note="61" onclick="playNoteFromMIDI([61])"></li> <!-- C#4 (MIDI 61) -->'+
    '<li class="white d" data-note="62" onclick="playNoteFromMIDI([62])"></li> <!-- D4 (MIDI 62) -->'+
    '<li class="black ds" data-note="63" onclick="playNoteFromMIDI([63])"></li> <!-- D#4 (MIDI 63) -->'+
    '<li class="white e" data-note="64" onclick="playNoteFromMIDI([64])"></li> <!-- E4 (MIDI 64) -->'+
    '<li class="white f" data-note="65" onclick="playNoteFromMIDI([65])"></li> <!-- F4 (MIDI 65) -->'+
    '<li class="black fs" data-note="66" onclick="playNoteFromMIDI([66])"></li> <!-- F#4 (MIDI 66) -->'+
    '<li class="white g" data-note="67" onclick="playNoteFromMIDI([67])"></li> <!-- G4 (MIDI 67) -->'+
    '<li class="black gs" data-note="68" onclick="playNoteFromMIDI([68])"></li> <!-- G#4 (MIDI 68) -->'+
    '<li class="white a" data-note="69" onclick="playNoteFromMIDI([69])"></li> <!-- A4 (MIDI 69) -->'+
    '<li class="black as" data-note="70" onclick="playNoteFromMIDI([70])"></li> <!-- A#4 (MIDI 70) -->'+
    '<li class="white b" data-note="71" onclick="playNoteFromMIDI([71])"></li> <!-- B4 (MIDI 71) -->'

