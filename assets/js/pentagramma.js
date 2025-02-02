const midiToNatural = {
    0: 0,  // Do
    1: 1,  // Re♭
    2: 1,  // Re
    3: 2,  // Mi♭
    4: 2,  // Mi
    5: 3,  // Fa
    6: 4,  // Sol♭
    7: 4,  // Sol
    8: 5,  // La♭ 
    9: 5,  // La
    10: 6, // Si♭ 
    11: 6, // Si
};
        // Configuración para el pentagrama
        const midiToY = (midi) => {
            // Tabla de posiciones en el pentagrama para una octava (Do = 0, Re = 1, etc.)
        
            const lineSpacing = 25; // Espaciado entre líneas del pentagrama
            const baseY = 275; // Coordenada 'y' para Do central (C4, MIDI 60)
        
            // Determinar posición relativa dentro de la octava
            const notePosition = midiToNatural[midi % 12];
            if (notePosition === undefined) {
                throw new Error("Valor MIDI fuera del rango permitido.");
            }
        
            // Ajustar la posición según la octava
            const octaveOffset = Math.floor(midi / 12) - 5; // Octava base: 5 (Do central = 60)
            return baseY - notePosition * (lineSpacing / 2) - octaveOffset * (lineSpacing * 3.5);
        };
        

        const lineSpacing = 25;
        const pentagramTop = 150; // Coordenada superior del pentagrama
        const pentagramBottom = 400; // Coordenada inferior del pentagrama
        const centralC=275;
        const x=200
    
const addNoteToPentagram = (midi, x, bemolflag=0) => {
    const pentagram = document.getElementById('pentagramma');

    // Crear un círculo (nota)
    const y=midiToY(midi);
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x); // Posición horizontal
    circle.setAttribute('cy', y); // Posición vertical según MIDI
    circle.setAttribute('r', 12); // Radio del círculo
    circle.setAttribute('fill', 'black'); // Color de la nota
    circle.setAttribute('class', 'note'); // Clase opcional
    if (y < pentagramTop) {
        for (let currentY = pentagramTop-lineSpacing; currentY >= y; currentY += -lineSpacing) {
            const extraLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            extraLine.setAttribute('x1', x + 20);
            extraLine.setAttribute('x2', x - 20);
            extraLine.setAttribute('y1', currentY);
            extraLine.setAttribute('y2', currentY);
            extraLine.setAttribute('class', `extraline`); // Clase única basada en el valor de currentY
            extraLine.setAttribute('stroke', 'black');
            extraLine.setAttribute('stroke-width', '1');
            
            // Agregar la línea al contenedor SVG
            document.querySelector('svg').appendChild(extraLine);
        }
    }

    let bemol=[1,3,6,8,10]
    if(bemol.includes(midi%12)){
            // Crear el elemento de texto que representa el bemol
        const bemol = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        console.log("cat: " + 42*(cat==='2'));
        bemol.setAttribute('x', x-42+6*(cat==='2')-bemolflag*5); // Posición horizontal
        bemol.setAttribute('y', y+8); // Posición vertical
        bemol.setAttribute('font-family', 'Arial'); // Familia de la fuente
        bemol.setAttribute('font-size', '48'); // Tamaño de la fuente
        bemol.setAttribute('fill', 'black'); // Color del texto
        bemol.textContent = '♭'; // Símbolo del bemol
        pentagram.appendChild(bemol);
    }

    if (y === centralC) {
            const extraLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            extraLine.setAttribute('x1', x + 20);
            extraLine.setAttribute('x2', x - 20);
            extraLine.setAttribute('y1', y);
            extraLine.setAttribute('y2', y);
            extraLine.setAttribute('class', `extraline`); // Clase única basada en el valor de currentY
            extraLine.setAttribute('stroke', 'black');
            extraLine.setAttribute('stroke-width', '1');
            
            // Agregar la línea al contenedor SVG
            document.querySelector('svg').appendChild(extraLine);

    }


    if (y > pentagramBottom) {
        for (let currentY = pentagramBottom+lineSpacing; currentY <= y; currentY += lineSpacing) {
            const extraLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            extraLine.setAttribute('x1', x + 20);
            extraLine.setAttribute('x2', x - 20);
            extraLine.setAttribute('y1', currentY);
            extraLine.setAttribute('y2', currentY);
            extraLine.setAttribute('class', `extraline`); // Clase única basada en el valor de currentY
            extraLine.setAttribute('stroke', 'black');
            extraLine.setAttribute('stroke-width', '1');
            
            // Agregar la línea al contenedor SVG
            document.querySelector('svg').appendChild(extraLine);
        }
    }


    // Añadir la nota al pentagrama
    pentagram.appendChild(circle);
};
    
        // Scale

       /* for (let i=60; i<=72;i+=1){
            addNoteToPentagram(i, 100+(i-59)*25); // DO central en x=100 
        }*/

        //Chord
       
function addNotes(midiValues){
    const pentagram = document.getElementById('pentagramma');

    // Primero eliminar todas las notas existentes 
    const existingNotes = pentagram.querySelectorAll('.note');
    existingNotes.forEach(note => note.remove());

    // Luego eliminar todos los bemoles existentes 
    const existingBemols = pentagram.querySelectorAll('text');
    existingBemols.forEach(bemol => bemol.remove());

    const existingExtraLines = pentagram.querySelectorAll('.extraline');
    existingExtraLines.forEach(line => line.remove());

    if (!midiValues) {
        
        return; // Termina la ejecución de la función
    }
    else{
        if(cat==='2'){
            let x=150
            midiValues.forEach((note) => {
                addNoteToPentagram(note, x);
                x+=50;
            });
        }
        else{
            let previousnote=100;
            let moved=false;
            let actualnote=0;
            midiValues.forEach((note) => {
                actualnote= midiToNatural[note % 12];
                if(Math.abs(previousnote - actualnote) <= 1 && !moved){
                    let bemol=[1,3,6,8,10]
                    addNoteToPentagram(note, 220,bemol.includes(note%12));
                    moved=true;

                }
                else{
                    addNoteToPentagram(note, 200);
                    moved=false;
                }
                previousnote = midiToNatural[note % 12];
            });
        }
    }

}

    

        const all = [35,40,45,50,55,60,65,70,75,80,85];
        const scaleAm = [57,58,60,62,64,65,67,69];
        const bemoles = [56,58,61,63,66,68];
        addNotes(bemoles)
        const noteSets = [all, scaleAm, bemoles];

// Función que se ejecutará cada 5 segundos
let currentSetIndex = 0;

/*onst interval = setInterval(() => {
    const currentSet = noteSets[currentSetIndex];
    addNotes(currentSet);  // Llama a la función para añadir las notas del conjunto actual
    currentSetIndex = (currentSetIndex + 1) % noteSets.length;  // Cambia al siguiente conjunto de notas
}, 5000); // 5000 ms = 5 segundos*/

    