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

var interval_text_it = [ 'Seconda Minore',
                          'Seconda Maggiore',
                          'Terza Minore',
                          'Terza Maggiore',
                          'Quarta Perfetta',
                          'Tritono',
                          'Quinta Perfetta',
                          'Sesta Minore',
                          'Sesta Maggiore',
                          'Settima Minore',
                          'Settima Maggiore',
                          'Ottava']
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
                  'Dominant Seventh (♭5)',  // 13
                  'Sus2 Triad',             // 14
                  'Sus4 Triad',             // 15
                  'Lydian Triad',           // 16
                  'Phrygian Triad',         // 17
                  'Locrian Triad',          // 18
                  'Minor Sixth',            // 19
                  'Major Sixth'             // 20
                ]          

var chord_text_it = ['Triade Minore',           //  0
                    'Triade Maggiore',         //  1
                    'Triade Diminuita',        //  2
                    'Triade Aumentata',        //  3
                    'Settima Minore',          //  4
                    'Settima Maggiore',        //  5
                    'Settima di Dominante',    //  6 
                    'Semidiminuito',           //  7
                    'Minore Maggiore 7',       //  8
                    'Minore Maggiore 7 (b5)',  //  9
                    'Settima Diminuita',       // 10
                    'Settima Maggiore (#5)',   // 11
                    'Settima di Dom (#5)',     // 12
                    'Settima di Dom (♭5)',     // 13
                    'Triade Sus2',             // 14
                    'Triade Sus4',             // 15
                    'Triade Lidia',            // 16
                    'Triade Frigia',           // 17
                    'Triade Locria',           // 18
                    'Sesta Minore',            // 19
                    'Sesta Maggiore'           // 20
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
                   '3 6 9',                 // 10
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
var scale_text = ['Ionian (Major)',         //  0
                  'Dorian',                 //  1
                  'Phrygian',               //  2
                  'Lydian',                 //  3
                  'Mixolydian',             //  4
                  'Aeolian (Nat Minor)',    //  5
                  'Locrian',                //  6 
                  'Harmonic Minor',         //  7
                  'Locrian ♮6th',           //  8
                  'Augmented Major',        //  9
                  'Dorian #11',             // 10
                  'Phrygian dominant',      // 11
                  'Lydian #2',              // 12
                  'Super-Locrian bb7',      // 13
                  'Melodic Minor',          // 14
                  'Dorian ♭2',              // 15
                  'Lydian Augmented',       // 16
                  'Acoustic (Lyd Dom)',     // 17
                  'Aeolian Dominant',       // 18
                  'Aeolian ♭5',             // 19
                  'Altered',                // 20
                  'H-W diminished',         // 21
                  'W-H diminished',         // 22
                  'Exatonal',               // 23
                ]  

var scale_text_it = [ 'Ionica (Maggiore)',       //  0
                      'Dorica',                   //  1
                      'Frigia',                   //  2
                      'Lidia',                    //  3
                      'Misolidia',                //  4
                      'Eolica (Min Naturale)',    //  5
                      'Locria',                   //  6 
                      'Minore Armonica',          //  7
                      'Locria ♮6',                //  8
                      'Maggiore Aumentata',       //  9
                      'Dorica #11',               // 10
                      'Frigia Dominante',         // 11
                      'Lidia #2',                 // 12
                      'Super-Locria bb7',         // 13
                      'Minore Melodica',          // 14
                      'Dorica ♭2',                // 15
                      'Lidia Aumentata',          // 16
                      'Acustica (Lid Dom)',       // 17
                      'Eolica Dominante',         // 18
                      'Eolica ♭5',                // 19
                      'Alterata',                 // 20
                      'Diminuita S-T',            // 21
                      'Diminuita T-S',            // 22
                      'Esatonale',                // 23
                      ]

var scale_codes = ['2 4 5 7 9 11',                  //  0
                   '2 3 5 7 9 10',                  //  1
                   '1 3 5 7 8 10',                  //  2
                   '2 4 6 7 9 11',                  //  3
                   '2 4 5 7 9 10',                  //  4
                   '2 3 5 7 8 10',                  //  5
                   '1 3 5 6 8 10',                  //  6
                   '2 3 5 7 8 11',                  //  7
                   '1 3 5 6 9 10',                  //  8
                   '2 4 5 8 9 11',                  //  9
                   '2 3 6 7 9 10',                  // 10
                   '1 4 5 7 8 10',                  // 11
                   '3 4 6 7 9 11',                  // 12
                   '1 3 4 6 8 9',                   // 13
                   '2 3 5 7 9 11',                  // 14
                   '1 3 5 7 9 10',                  // 15
                   '2 4 6 8 9 11',                  // 16
                   '2 4 6 7 9 10',                  // 17
                   '2 4 5 7 8 10',                  // 18
                   '2 3 5 6 8 10',                  // 19
                   '1 3 4 6 8 10',                  // 20
                   '2 3 5 6 8 9 11',                // 21
                   '1 3 4 6 7 9 10',                // 22
                   '2 4 6 8 10',                    // 23
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

