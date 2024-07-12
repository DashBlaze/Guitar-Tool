document.addEventListener('DOMContentLoaded', function() {
    const scaleGeneratorTab = document.getElementById('tab-scale-generator');
    const circleOfFifthsTab = document.getElementById('tab-circle-of-fifths');
    const metronomeTab = document.getElementById('tab-metronome');
    
    const scaleGeneratorContainer = document.getElementById('scale-generator-container');
    const circleOfFifthsContainer = document.getElementById('circle-of-fifths-container');
    const metronomeContainer = document.getElementById('metronome-container');
    
    // Tab click events
    scaleGeneratorTab.addEventListener('click', () => {
        scaleGeneratorTab.classList.add('active');
        circleOfFifthsTab.classList.remove('active');
        metronomeTab.classList.remove('active');
        scaleGeneratorContainer.style.display = 'block';
        circleOfFifthsContainer.style.display = 'none';
        metronomeContainer.style.display = 'none';
    });
    
    circleOfFifthsTab.addEventListener('click', () => {
        circleOfFifthsTab.classList.add('active');
        scaleGeneratorTab.classList.remove('active');
        metronomeTab.classList.remove('active');
        scaleGeneratorContainer.style.display = 'none';
        circleOfFifthsContainer.style.display = 'block';
        metronomeContainer.style.display = 'none';
    });
    
    metronomeTab.addEventListener('click', () => {
        metronomeTab.classList.add('active');
        scaleGeneratorTab.classList.remove('active');
        circleOfFifthsTab.classList.remove('active');
        scaleGeneratorContainer.style.display = 'none';
        circleOfFifthsContainer.style.display = 'none';
        metronomeContainer.style.display = 'block';
    });
    
    // Default tab
    scaleGeneratorTab.click();
});

// Scale generation and rendering
const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

const scalePatterns = {
    ionian: [2, 2, 1, 2, 2, 2, 1], // Ionian (Major)
    dorian: [2, 1, 2, 2, 2, 1, 2], // Dorian
    phrygian: [1, 2, 2, 2, 1, 2, 2], // Phrygian
    lydian: [2, 2, 2, 1, 2, 2, 1], // Lydian
    mixolydian: [2, 2, 1, 2, 2, 1, 2], // Mixolydian
    aeolian: [2, 1, 2, 2, 1, 2, 2], // Aeolian (Minor)
    locrian: [1, 2, 2, 1, 2, 2, 2], // Locrian
    pentatonic_major: [2, 2, 3, 2, 3], // Major Pentatonic
    pentatonic_minor: [3, 2, 2, 3, 2], // Minor Pentatonic
    blues: [3, 2, 1, 1, 3, 2], // Blues
    hirajoshi: [2, 1, 4, 1, 4], // Hirajoshi
    kumoi: [2, 1, 4, 2, 3], // Kumoi
    melodic_minor: [2, 1, 2, 2, 2, 2, 1], // Melodic Minor
    harmonic_minor: [2, 1, 2, 2, 1, 3, 1], // Harmonic Minor
    major_bebop: [2, 2, 1, 2, 1, 1, 2, 1], // Major Bebop
    minor_bebop: [2, 1, 2, 2, 1, 2, 1, 1], // Minor Bebop
    japanese_insen: [1, 4, 2, 1, 4] // Japanese Insen
};

// Relative indices for the blue notes in the Blues scale
const blueNoteIntervalsBlues = [6];  // Diminished fifth in the Blues scale

function generateScale() {
    const scale = document.getElementById('scale').value;
    const key = document.getElementById('key').value;
    const pattern = scalePatterns[scale];
    const startIdx = notes.indexOf(key);
    let scaleNotes = [notes[startIdx]];

    let currentIndex = startIdx;
    pattern.forEach(interval => {
        currentIndex = (currentIndex + interval) % notes.length;
        scaleNotes.push(notes[currentIndex]);
    });

    renderFretboard(scale, scaleNotes);
}

function renderFretboard(scale, scaleNotesCustom) {
    const strings = [
        ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
        ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
        ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F'],
        ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'],
        ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
        ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
    ];

    const blueNotePositions = scale === 'blues' ? getBlueNotePositions(scaleNotesCustom[0], blueNoteIntervalsBlues) : [];

    const fretboard = document.createElement('div');
    fretboard.id = 'mastil';

    strings.forEach((string, stringIndex) => {
        const stringDiv = document.createElement('div');
        stringDiv.className = 'string';

        string.forEach((fretNote, fretIndex) => {
            const fret = document.createElement('div');
            fret.className = 'fret';

            // Add fret numbers
            if (stringIndex === 0 && fretIndex > 0) {
                const fretNumber = document.createElement('div');
                fretNumber.className = 'fret-number';
                fretNumber.textContent = fretIndex;
                fret.appendChild(fretNumber);
            }

            const isNoteInCustomScale = scaleNotesCustom.includes(fretNote);
            const isBlueNote = scale === 'blues' && blueNotePositions.includes(fretNote);

            if (isNoteInCustomScale) {
                const noteMarker = document.createElement('div');
                noteMarker.className = isBlueNote ? 'note-blue' : 'note';
                noteMarker.textContent = fretNote;
                fret.appendChild(noteMarker);
            }
            stringDiv.appendChild(fret);
        });

        fretboard.appendChild(stringDiv);
    });

    const scaleContainer = document.getElementById('scale-container');
    scaleContainer.innerHTML = '';
    scaleContainer.appendChild(fretboard);
}

function getBlueNotePositions(startNote, intervals) {
    const startIdx = notes.indexOf(startNote);
    const blueNotes = intervals.map(interval => notes[(startIdx + interval) % notes.length]);
    return blueNotes;
}

// METRONOMO
let metronomeInterval;

function startMetronome() {
    const tempo = document.getElementById('tempo').value;
    const interval = 60000 / tempo;
    const metronomeStatus = document.getElementById('metronome-status');
    const tickSound = document.getElementById('tick-sound');  // Referencia al sonido "Tick"
    
    metronomeStatus.textContent = 'Metronome is running';
    
    if (metronomeInterval) clearInterval(metronomeInterval);
    
    metronomeInterval = setInterval(() => {
        tickSound.currentTime = 0;  // Rewind to start
        tickSound.play();  // Play tick sound
    }, interval);
}

function stopMetronome() {
    const metronomeStatus = document.getElementById('metronome-status');
    
    metronomeStatus.textContent = 'Metronome stopped';
    
    if (metronomeInterval) clearInterval(metronomeInterval);
}