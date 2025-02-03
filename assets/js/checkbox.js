async function checkbox(){
    let gridPlaceholder = document.getElementById('grid');
    const category = localStorage.getItem('category');
    gridPlaceholder.innerHTML = generateCheckbox(parseInt(category));
}

function getCheckbox(){
    var inputElements = document.getElementsByClassName('selected');
    var checkedValue = ''
    for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
           if (checkedValue == '') {
                checkedValue = inputElements[i].value.toString()
           } else {
            checkedValue = checkedValue + '-' + inputElements[i].value.toString()
           }
      }
    }
  return checkedValue
}

async function getType(){
    var inputElements = document.getElementsByClassName('direction');
    var checkedValue = ''
    var arr = []
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
             arr.push(1)
        }
        else{
            arr.push(0)
        }
    }
    if (arr.length < 3){
        arr.push(0)
    }
    for await (const element of arr) {
        checkedValue = checkedValue + element.toString() + '-';
    }
    checkedValue = checkedValue.slice(0, -1);
    return checkedValue
}

function generateCheckbox(category){
    let out='';
    switch(category){
        case 0:
            out += `<div class="selector-column" id="intervalSelector">
                <div class="checkbox-grid">
                    <div><input type="checkbox" id="asc" name="direction" value="asc" class="direction" onclick="enableStart()"><label for="asc">Ascending</label></div>
                    <div><input type="checkbox" id="desc" name="direction" value="desc" class="direction" onclick="enableStart()"><label for="desc">Descending</label></div>
                    <div><input type="checkbox" id="unison" name="unison" value="unison" class="direction" onclick="enableStart()"><label for="unison">Unison</label></div>
                </div>
            <button class="collapse-btn" onclick="toggleSection('intervals')">
                Intervals ▼
            </button>
            <div id="intervals" class="selector-content collapsed">
                <div class="checkbox-grid" id="grid">`
            
            for (let i = 0; i < interval_text.length; i++){
                out += `<div><input type="checkbox" id="int${i}" value="${i}" class="selected" onclick="enableStart()"><label for="int${i}">${interval_text[i]}</label></div>`
            }
            out += `</div>
                        </div>
                    </div>`
            break;
        case 1:
            out += `<div class="selector-column" id="chordSelector">
            <div class="checkbox-grid">
                    <div><input type="checkbox" id="asc" name="direction" value="asc" class="direction"><label for="asc">Ascending</label></div>
                    <div><input type="checkbox" id="desc" name="direction" value="desc" class="direction"><label for="desc">Descending</label></div>
                    <div><input type="checkbox" id="unison" name="unison" value="unison" class="direction"><label for="unison">Unison</label></div>
            </div>
            <button class="collapse-btn" onclick="toggleSection('chords')">
                Chords ▼
            </button>
            <div id="chords" class="selector-content collapsed">
                <div class="checkbox-grid" id="grid">`

            for (let i = 0; i < chord_text.length; i++){
                out += `<div><input type="checkbox" id="chord${i}" value="${i}" class="selected" onclick="enableStart()"><label for="chord${i}">${chord_text[i]}</label></div>`
            }
            out += `</div>
                        </div>
                    </div>`
            break;
        case 2:
            out += `<div class="selector-column" id="scaleSelector">
            <div class="checkbox-grid">
                    <div><input type="checkbox" id="asc" name="direction" value="asc" class="direction"><label for="asc">Ascending</label></div>
                    <div><input type="checkbox" id="desc" name="direction" value="desc" class="direction"><label for="desc">Descending</label></div>
            </div>
            <button class="collapse-btn" onclick="toggleSection('scales')">
                Scales ▼
            </button>
            <div id="scales" class="selector-content collapsed">
                <div class="checkbox-grid" id="grid">`

            for (let i = 0; i < scale_text.length; i++){
                out += `<div><input type="checkbox" id="scale${i}" value="${i}" class="selected" onclick="enableStart()"><label for="scale${i}">${scale_text[i]}</label></div>`
            }
            out += `</div>
                        </div>
                    </div>`
            break;
        case 3:
            out += `<div class="selector-column" id="intervalSelector">
             <div class="checkbox-grid">
                <div><input type="checkbox" id="asc" name="direction" value="asc" class="direction"><label for="asc">Ascending</label></div>
                <div><input type="checkbox" id="desc" name="direction" value="desc" class="direction"><label for="desc">Descending</label></div>
            </div>
            <button class="collapse-btn" onclick="toggleSection('intervals')">
                Intervals ▼
            </button>
            <div id="intervals" class="selector-content collapsed">
                <div class="checkbox-grid" id="grid">`
            for (let i = 0; i < interval_text.length; i++){
                out += `<div><input type="checkbox" id="voc${i}" value="${i}" class="selected" onclick="enableStart()"><label for="voc${i}">${interval_text[i]}</label></div>`
            }
            out += `</div>
                        </div>
                    </div>`
            break;
        default:
            break;
    }
    return out;
}
checkbox();


function toggleSection(id) {
    const content = document.getElementById(id);
    content.classList.toggle('expanded');
    const btn = content.previousElementSibling;
    btn.textContent = btn.textContent.includes('▼') ? 
        btn.textContent.replace('▼', '▲') : 
        btn.textContent.replace('▲', '▼');
}

function customLevel(){
    const button=document.getElementById('custom-btn');
    button.addEventListener('click',()=>{
        window.location.href = `sandbox.html`;
    });
}

async function start(){
    let reps = document.getElementById('reps').value
    let key = getCheckbox();
    let type = await getType()
    if(parseInt(reps) > 0){
        localStorage.setItem('reps', reps)
        localStorage.setItem('key', key);
        localStorage.setItem('type', type);
        localStorage.setItem('test', 0);
        console.log(key, type);
        if(!(key == '' | type == '0-0-0')){ 
            if(parseInt(localStorage.getItem('category')) == 3){
                window.location.href = `/vocal-training/level.html`;
            } else window.location.href = `/ear-training/level.html`;
        }
    } else {
        let err = document.getElementById('error')
        err.innerHTML = "Wrong number of repetitions, numbers lower then 1 are not allowed"
        err.style.color = '#a80c0c'
    }
}

function enableStart(){
    // Enable start button if at least one checkbox from both options is checked
    var inputElements = document.getElementsByClassName('selected');
    var checkedValue = ''
    var checkedValue2 = ''
    for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
           checkedValue = 'checked'
      }
    }
    var inputElements = document.getElementsByClassName('direction');
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            checkedValue2 = 'checked'
        }
    }
    if (checkedValue == 'checked' && checkedValue2 == 'checked'){
        document.getElementById('startButton').disabled = false;
    }
    else{
        document.getElementById('startButton').disabled = true;
    }
}

//start button disabled by default
document.getElementById('startButton').disabled = true;
