let checked = 0
let correct = 0
let reps = 15

async function playRandomNote(){ // function that creates the next
    //if (rep_index < reps){
    if (true){
        if (checked) {
            checked = 0
            midi_arr = []
            root = Math.floor(Math.random() * 32) + 50
            midi_arr.push(root)
            let ones = []
            for (let i = 0; i < types.length; i++) {
                if(parseInt(types[i])){
                    ones.push(i)
                }
                
            }
            let idx_2 = Math.floor(Math.random() * ones.length)
            chosen_type = ones[idx_2]
            let curr_arr;
            switch (parseInt(cat)) {
                case 0:
                    addNotes([root])
                    console.log("case 0 for cat:")
                    midi_arr.push(root)
                    let adder = parseInt(curr_val) + 1
                    if(chosen_type == 1) adder = -adder;
                    midi_arr.push(root + adder)
                break;
                case 1:
                    addNotes(null)                    
                    console.log("case 1 for cat:")
                    curr_arr = chord_codes[curr_val].split(' ');
                    midi_arr.push(root)
                    for (const note of curr_arr) {
                        if(note) midi_arr.push(root + parseInt(note))
                    }
                    if(chosen_type == 1){
                        midi_arr.reverse()
                    }
                break;
                case 2:
                    addNotes(null)                    
                    console.log("case 1 for cat:")
                    curr_arr = scale_codes[curr_val].split(' ');
                    midi_arr.push(root)
                    for (const note of curr_arr) {
                        if(note) midi_arr.push(root + parseInt(note))
                    }
                    if(chosen_type == 1){
                        midi_arr.reverse()
                    }
                break;
                default:
                break;
            }
            console.log(midi_arr)
            
            console.log("chosen type: " + chosen_type)
            playNoteFromMIDI(midi_arr, chosen_type);
            rep_index = rep_index+1;
            level_counter.textContent = `${rep_index} / ${reps}`;
        }
    } else {
        //exec at the end
    }
}

async function checkAndPlay(midi_arr){
    if(checked){
        let note_arr = []
        i = 0;
        for (midi of midi_arr) {
            note_arr.push(await midiToNote(midi))
        }
        Tone.loaded().then(()=>{
            sampler.triggerAttackRelease(note_arr, 1.2);
        });
    } else {
        if((midi_arr[0])%12 == note) correct += 1
        checked = 1
    }
}

async function playNoteFromMIDI(midi_arr){
    let note_arr = []
    i = 0;
    for (midi of midi_arr) {
        note_arr.push(await midiToNote(midi))
    }
    Tone.loaded().then(()=>{
        sampler.triggerAttackRelease(note_arr, 1.2);
    });
}