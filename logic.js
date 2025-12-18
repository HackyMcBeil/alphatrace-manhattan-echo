/**
 * ALPHA TRACE - CRIME LOGIC v3.0
 * Kombiniert Sound-Feedback, Fehler-Animationen und Fallakten-Texte
 */

const ANSWERS = {
    key1: "75 ROCKEFELLER PLAZA",
    key2: "E 43 ST",
    key3: "718 599-1717",
    key4: "LIBERTY WAREHOUSE",
    key5: "416"
};

// Spezifische Erfolgsmeldungen für jeden Fallabschnitt
const SUCCESS_MESSAGES = {
    key1: "Standort bestätigt. Tatort erfolgreich in der Fallakte hinterlegt.",
    key2: "Route verifiziert. Bewegungsweg der Tätergruppe erfolgreich rekonstruiert.",
    key3: "Fahrzeugdaten abgeglichen. Verbindung zur Tätergruppe hergestellt.",
    key4: "Lagerstandort identifiziert. Logistikknotenpunkt erfolgreich registriert.",
    key5: "Rückzugs- und Planungsort verifiziert. Fallakte vollständig."
};

const ERROR_MESSAGE = "Keine Übereinstimmung im Datensatz.<br>Die im Bild fehlende Information konnte nicht korrekt rekonstruiert werden.";

const DB_DATA = {
    "PZ0048": ["40.759, -73.979", "281 m"],
    "PX0362": ["40.63833, -73.93529", "235 m"],
    "PU9331": ["40.73780, -73.93456", "532 m"],
    "PF8900": ["40.67701, -74.01451", "350 m"],
    "PR8446": ["40.75199, -74.04130", "300 m"]
};

let solvedCount = 0;
let wrongToggle = false; // Wechselt zwischen wrong.wav und wrong2.wav

document.addEventListener('DOMContentLoaded', () => {

    // --- START-SEQUENZ ---
    const startBtn = document.getElementById('start-mission-button');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            window.tryToPlayAudio('agent-audio');
            const startOverlay = document.getElementById('start-overlay');
            const mainWrapper = document.getElementById('main-wrapper');

            startOverlay.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            startOverlay.style.opacity = '0';
            startOverlay.style.transform = "scale(0.95)";

            setTimeout(() => {
                startOverlay.style.display = 'none';
                mainWrapper.style.display = 'block';
                setTimeout(() => { mainWrapper.style.opacity = '1'; }, 50);
            }, 800);
        });
    }

    // --- RÄTSEL VERIFIZIERUNG ---
    document.querySelectorAll('.key-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const btn = form.querySelector('button');
            const feedback = form.querySelector('.feedback-message');
            const key = btn.dataset.key;

            feedback.style.display = "block";

            // Eingabe prüfen (Groß-/Kleinschreibung ignorieren)
            if (input.value.trim().toUpperCase() === ANSWERS[key].toUpperCase()) {

                // 1. Visuelles Feedback (Erfolg)
                feedback.className = "feedback-message status-granted";
                feedback.innerHTML = `<strong>SYSTEMRÜCKMELDUNG</strong><br><span style="color:var(--success)">✅ Verifiziert</span><br>${SUCCESS_MESSAGES[key]}`;

                // 2. Sound abspielen
                window.tryToPlayAudio('correct-audio');

                // 3. UI sperren
                input.disabled = true;
                btn.disabled = true;
                btn.textContent = "VERIFIZIERT";
                btn.style.background = "var(--success)";
                btn.style.boxShadow = "none";

                // 4. Fortschritt prüfen
                solvedCount++;
                if (solvedCount === 5) {
                    setTimeout(() => {
                        window.startFinalAnalysis();
                    }, 1500); // Kurze Pause vor dem großen Finale
                }

            } else {
                // --- FEHLER-LOGIK ---
                feedback.className = "feedback-message status-denied";
                feedback.innerHTML = `<strong>SYSTEMRÜCKMELDUNG</strong><br><span style="color:var(--error)">❌ Fehler</span><br>${ERROR_MESSAGE}`;

                // Sound abwechselnd abspielen
                const soundId = wrongToggle ? 'wrong2-audio' : 'wrong1-audio';
                window.tryToPlayAudio(soundId);
                wrongToggle = !wrongToggle;

                // Visueller Error-Flash am Input
                input.style.borderColor = "var(--error)";
                input.style.boxShadow = "0 0 10px rgba(255, 51, 51, 0.3)";
                setTimeout(() => {
                    input.style.borderColor = "var(--white-outline)";
                    input.style.boxShadow = "none";
                }, 500);
            }
        });
    });

    // --- DATENBANK LOGIK ---
    const dbBtn = document.getElementById('decrypt-db-btn');
    if (dbBtn) {
        dbBtn.addEventListener('click', () => {
            const id = document.getElementById('db-id-input').value.trim().toUpperCase();
            const display = document.getElementById('db-result-display');
            const feedback = document.getElementById('db-feedback');

            if(DB_DATA[id]) {
                document.getElementById('res-coords').textContent = DB_DATA[id][0];
                document.getElementById('res-radius').textContent = DB_DATA[id][1];
                display.style.display = 'block';
                feedback.textContent = "Datensatz extrahiert.";
                feedback.style.color = "var(--success)";
            } else {
                display.style.display = 'none';
                feedback.textContent = "ID ungültig. Zugriff verweigert.";
                feedback.style.color = "var(--error)";
                window.tryToPlayAudio('wrong1-audio');
            }
        });
    }
});

/**
 * DIES IST DIE DEFINITION (DAS GEHIRN)
 * Suche ganz unten in deiner logic.js nach diesem Block:
 */
window.tryToPlayAudio = id => {
    const effectAudio = document.getElementById(id);
    const backgroundMusic = document.getElementById('agent-audio');

    if (effectAudio) {
        // --- DUCKING START (Musik leiser machen) ---
        if (id !== 'agent-audio' && backgroundMusic) {
            // Musik auf 50% der aktuellen Lautstärke senken (0.5)
            backgroundMusic.volume = 0.5;
        }

        effectAudio.currentTime = 0;
        effectAudio.play().catch(e => {});

        // --- FADE-IN START (Sobald der Soundeffekt endet) ---
        effectAudio.onended = () => {
            if (id !== 'agent-audio' && backgroundMusic) {
                let vol = 0.5;
                const fadeStep = 0.05; // Wie viel lauter pro Schritt
                const fadeInterval = 200; // 2000ms / (0.5 / 0.05) = 200ms pro Schritt

                const fadeIn = setInterval(() => {
                    if (vol < 1.0) {
                        vol += fadeStep;
                        // Sicherstellen, dass wir nicht über 1.0 gehen
                        backgroundMusic.volume = Math.min(vol, 1.0);
                    } else {
                        clearInterval(fadeIn);
                    }
                }, fadeInterval);
            }
        };
    }
};

function showView(id) {
    // 1. Alle Ansichten verstecken
    document.querySelectorAll('.view-section').forEach(v => v.style.display = 'none');

    // 2. Die gewählte Ansicht zeigen
    const target = document.getElementById(id);
    if (target) target.style.display = 'block';

    // 3. Blau-Markierung bei den Buttons verwalten
    // Erst bei allen Buttons die 'active' Klasse entfernen
    document.getElementById('btn-terminal').classList.remove('active');
    document.getElementById('btn-database').classList.remove('active');

    // Dann dem richtigen Button die Klasse geben
    if (id === 'terminal-view') {
        document.getElementById('btn-terminal').classList.add('active');
    } else if (id === 'database-view') {
        document.getElementById('btn-database').classList.add('active');
    }
}
