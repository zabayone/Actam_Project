document.addEventListener("DOMContentLoaded", function () {
    const svg = document.getElementById('pentagramma');
    let noteElement = null;
    let ledgerLines = []; // Array to store ledger lines

    const startX = 50;
    const lineSpacing = 25;
    const startY = 148;
    const positions = [];

    // Populate positions array for staff and ledger lines
    for (let i = -3; i <= 7; i++) {
        positions.push(startY + i * (lineSpacing / 2));
    }

    drawStaff();

    // Draw the main staff
    function drawStaff() {
        for (let i = 0; i < 5; i++) {
            const y = startY + i * lineSpacing;
            drawLine(startX, y, 350, y);
        }
    }

    // Draw a line on the SVG
    function drawLine(x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.classList.add('pentagramma');
        svg.appendChild(line);
    }

    // Add a note to the SVG
    function addNoteAtPosition(x, y) {
        // Remove existing note if any
        clearPreviousNote();

        noteElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        noteElement.setAttribute('cx', x + 150);
        noteElement.setAttribute('cy', y);
        noteElement.setAttribute('r', 10);
        noteElement.classList.add('note');
        svg.appendChild(noteElement);

        // Add ledger lines if needed
        addLedgerLines(y);
    }

    // Add ledger lines for notes outside the main staff
    function addLedgerLines(y) {
        // Remove existing ledger lines
        ledgerLines.forEach(line => svg.removeChild(line));
        ledgerLines = [];

        const x1 = 170;
        const x2 = 230;

        if (y < startY) { // Notes above the staff
            for (let pos = startY - lineSpacing; pos >= y; pos -= lineSpacing) {
                ledgerLines.push(drawLedgerLine(x1, pos, x2, pos));
            }
        } else if (y > startY + 4 * lineSpacing) { // Notes below the staff
            for (let pos = startY + 4 * lineSpacing + lineSpacing; pos <= y; pos += lineSpacing) {
                ledgerLines.push(drawLedgerLine(x1, pos, x2, pos));
            }
        }
    }

    // Draw a ledger line
    function drawLedgerLine(x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.classList.add('ledger-line');
        svg.appendChild(line);
        return line;
    }

    // Find the nearest Y position on the staff or ledger lines
    function findNearestY(y) {
        return positions.reduce((nearest, pos) => {
            return Math.abs(y - pos) < Math.abs(y - nearest) ? pos : nearest;
        });
    }

    // Event listener for clicking on the SVG to add a note
    svg.addEventListener('click', function (event) {
        const rect = svg.getBoundingClientRect();
        const x = startX;
        const y = event.clientY - rect.top;
        const nearestY = findNearestY(y);
        addNoteAtPosition(x, nearestY);
    });

    // Clear previous note and ledger lines
    function clearPreviousNote() {
        if (noteElement) {
            svg.removeChild(noteElement);
            noteElement = null;
        }
        ledgerLines.forEach(line => svg.removeChild(line));
        ledgerLines = [];
    }

    // Draw a note dynamically from a MIDI value
    function drawNoteFromMIDI(midiValue) {
        const baseMidi = 60; // MIDI value for C4
        const baseY = 185.5; // Y position for C4
        const halfStepDistance = 12.5; // Distance per semitone (half-step)

        // Calculate the Y position dynamically
        const y = baseY - (midiValue - baseMidi) * halfStepDistance;

        // Clear previous note and ledger lines
        clearPreviousNote();

        // Draw the note
        const x = 200; // Fixed X position for the note
        const note = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        note.setAttribute("cx", x);
        note.setAttribute("cy", y);
        note.setAttribute("r", 10);
        note.classList.add("note");
        svg.appendChild(note);

        // Add ledger lines if necessary
        addLedgerLines(y);
    }
});
