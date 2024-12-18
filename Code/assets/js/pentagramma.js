   
        // Configuración para el pentagrama
        const midiToY = (midi) => {
            // Tabla de posiciones en el pentagrama para una octava (Do = 0, Re = 1, etc.)
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
        
            const lineSpacing = 25; // Espaciado entre líneas del pentagrama
            const baseY = 273; // Coordenada 'y' para Do central (C4, MIDI 60)
        
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
        const pentagramBottom = 250; // Coordenada inferior del pentagrama
        const x=200
    
        const addNoteToPentagram = (midi, x) => {
            const pentagram = document.getElementById('pentagramma');
    
            // Crear un círculo (nota)
            const y=midiToY(midi);
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x); // Posición horizontal
            circle.setAttribute('cy', y); // Posición vertical según MIDI
            circle.setAttribute('r', 12); // Radio del círculo
            circle.setAttribute('fill', 'black'); // Color de la nota
            circle.setAttribute('class', 'note'); // Clase opcional
            console.log(y)

            if (y < pentagramTop) {
                for (let currentY = pentagramTop-lineSpacing; currentY >= y; currentY += -lineSpacing) {
                    const extraLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    extraLine.setAttribute('x1', x + 20);
                    extraLine.setAttribute('x2', x - 20);
                    extraLine.setAttribute('y1', currentY);
                    extraLine.setAttribute('y2', currentY);
                    extraLine.setAttribute('class', `pentagramma line-${currentY}`); // Clase única basada en el valor de currentY
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
                bemol.setAttribute('x', x-33); // Posición horizontal
                bemol.setAttribute('y', y+8); // Posición vertical
                bemol.setAttribute('font-family', 'Arial'); // Familia de la fuente
                bemol.setAttribute('font-size', '48'); // Tamaño de la fuente
                bemol.setAttribute('fill', 'black'); // Color del texto
                bemol.textContent = '♭'; // Símbolo del bemol
                pentagram.appendChild(bemol);
            }

            if (midi)

            if (y > pentagramBottom) {
                for (let currentY = pentagramBottom+lineSpacing; currentY <= y; currentY += lineSpacing) {
                    const extraLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    extraLine.setAttribute('x1', x + 20);
                    extraLine.setAttribute('x2', x - 20);
                    extraLine.setAttribute('y1', currentY);
                    extraLine.setAttribute('y2', currentY);
                    extraLine.setAttribute('class', `pentagramma line-${currentY}`); // Clase única basada en el valor de currentY
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

        for (let i=60; i<=72;i+=1){
            addNoteToPentagram(i, 100+(i-59)*25); // DO central en x=100 
        }

        //Chord
/*
        const array = [60, 63, 66];
        array.forEach((value) => {
            addNoteToPentagram(value, 300);
        });
*/
    