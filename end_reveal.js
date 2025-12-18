/**
 * ALPHA TRACE - ULTIMATE HACKING REVEAL SEQUENCE v2.5
 * High-End Cinematic Terminal Logic with Video Reveal
 */

// Hilfsfunktion für Pausen (async/await)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Zufallszahl im Bereich
const random = (min, max) => Math.random() * (max - min) + min;

// Injiziere spezifische CSS-Animationen
const style = document.createElement('style');
style.textContent = `
    @keyframes scanlineMove {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
    }
    @keyframes flicker {
        0% { opacity: 0.8; } 5% { opacity: 0.4; } 10% { opacity: 0.9; }
        15% { opacity: 0.1; } 20% { opacity: 1; } 50% { opacity: 0.8; }
        100% { opacity: 1; }
    }
    @keyframes glitch-skew {
        0% { transform: skewX(0deg); }
        20% { transform: skewX(-5deg); filter: hue-rotate(90deg); }
        40% { transform: skewX(5deg); filter: hue-rotate(-90deg); }
        60% { transform: skewX(-2deg); }
        100% { transform: skewX(0deg); }
    }
    .glitching { animation: glitch-skew 0.2s infinite linear alternate-reverse; }
    .flickering { animation: flicker 0.1s infinite; }
    .scanline::before {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 5px;
        background: rgba(0, 136, 255, 0.3); opacity: 0.5;
        animation: scanlineMove 3s linear infinite;
    }
`;
document.head.appendChild(style);

window.startFinalAnalysis = async function() {
    const wrapper = document.getElementById('main-wrapper');
    const overlay = document.getElementById('final-analysis-overlay');
    const targetName = "JONAS";

    // --- 1. SETUP UI & AUDIO ---
    const music = document.getElementById('agent-audio');
    if(music) music.pause();
    window.tryToPlayAudio('victory-audio');

    wrapper.style.opacity = '0';
    await sleep(500);
    wrapper.style.display = 'none';
    overlay.style.display = 'flex';
    overlay.style.opacity = '0';
    await sleep(100);
    overlay.style.opacity = '1';

    // Erweiterte HTML Struktur mit Video-Element
    overlay.innerHTML = `
        <canvas id="matrix-canvas" style="position:absolute; inset:0; z-index:-2; opacity:0.2;"></canvas>
        <div class="scanline" style="position:absolute; inset:0; z-index:-1; pointer-events:none; background: repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.2) 3px);"></div>
        
        <div class="glass-card reveal-box" style="width:90%; max-width:650px; padding:40px; position:relative; overflow:hidden; border-color: var(--accent-blue);">
            <div id="header-glitch-bar" style="position:absolute; top:0; left:0; width:100%; height:4px; background:var(--accent-blue); box-shadow: 0 0 15px var(--accent-blue);"></div>
            
            <h2 id="status-header" style="font-family:'JetBrains Mono'; font-size:0.7rem; letter-spacing:3px; color:var(--accent-blue); margin-bottom:20px; text-align:center;">
                <span class="flickering">>>> INITIALIZING BYPASS SEQUENCE <<<</span>
            </h2>

             <div id="target-profile-container" style="position: relative; width: 180px; height: 180px; margin: 0 auto 30px; overflow:hidden; border-radius: 15px; border: 3px solid var(--accent-blue); box-shadow: 0 0 30px rgba(0,136,255,0.3);">
                <div id="target-placeholder" style="width: 100%; height: 100%; background: #000; display: flex; align-items: center; justify-content: center; font-family:'JetBrains Mono'; color:var(--accent-blue); font-size:2rem;" class="flickering">?</div>
                
                <video id="reveal-video" src="target_video.mp4" loop style="width: 100%; height: 100%; object-fit: cover; display: none;"></video>
                
                <div id="image-overlay-glitch" style="position:absolute; inset:0; background:white; opacity:0; z-index: 5;"></div>
            </div>
            
            <h1 id="final-name-span" style="font-family:'JetBrains Mono'; font-size:2.2rem; font-weight:800; min-height:1.2em; letter-spacing:3px; text-align:center; color:var(--white-soft); text-shadow: 0 0 10px var(--accent-blue);">[ENCRYPTED]</h1>
            
            <div style="display:flex; justify-content:space-between; font-family:'JetBrains Mono'; font-size:0.6rem; color:var(--accent-blue); margin-top: 20px;">
                <span id="process-id">PID: 0X4F92B</span>
                <span id="percentage-text">0%</span>
            </div>

            <div id="loading-bar-bg" style="height:6px; background:rgba(255,255,255,0.1); margin:5px 0 20px; border-radius:3px; overflow:hidden; position:relative;">
                <div id="loading-bar-scanner" style="position:absolute; top:0; left:0; width:20px; height:100%; background:rgba(255,255,255,0.8); filter:blur(5px); opacity:0;"></div>
                <div id="loading-bar" style="height:100%; width:0%; background:var(--accent-blue); box-shadow:0 0 15px var(--accent-blue); transition: width 0.1s linear, background 0.3s;"></div>
            </div>
            
            <div id="terminal-container" style="background:rgba(0,0,0,0.3); padding:15px; border-radius:8px; border:1px solid rgba(0,136,255,0.2);">
                <div id="terminal-log" style="font-family:'JetBrains Mono'; font-size:0.6rem; color:rgba(255,255,255,0.7); text-align:left; line-height:1.6; height:120px; overflow-y:auto; scrollbar-width: none;"></div>
            </div>
            
            <button id="reset-button" class="action-btn" style="display:none; margin-top:30px; position:relative; z-index:10; background:var(--success); box-shadow: 0 0 20px rgba(0,255,136,0.5); color:black;">MISSION COMPLETE // RESET</button>
        </div>
    `;

    const logElem = document.getElementById('terminal-log');
    const bar = document.getElementById('loading-bar');
    const barScanner = document.getElementById('loading-bar-scanner');
    const nameSpan = document.getElementById('final-name-span');
    const statusHeader = document.getElementById('status-header');
    const percText = document.getElementById('percentage-text');
    const revealVideo = document.getElementById('reveal-video');
    const placeholder = document.getElementById('target-placeholder');
    const revealBox = document.querySelector('.reveal-box');

    startMatrixEffect();

    async function typeLog(text, color = "rgba(255,255,255,0.7)") {
        const line = document.createElement('div');
        line.style.color = color;
        logElem.appendChild(line);
        let cursor = document.createElement('span');
        cursor.textContent = "█";
        cursor.className = "flickering";
        line.appendChild(cursor);

        for (let char of text) {
            cursor.remove();
            line.textContent += char;
            line.appendChild(cursor);
            logElem.scrollTop = logElem.scrollHeight;
            await sleep(random(10, 50));
        }
        cursor.remove();
    }

    const crypticChars = "░▒▓█アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\[]{}—=+*^?#_";
    let decryptActive = true;

    (async function runDecryptionAnim() {
        let revealIndex = 0;
        while(decryptActive) {
            let output = "";
            for(let i = 0; i < targetName.length; i++) {
                if(i < revealIndex) {
                    output += `<span style="color:var(--white-soft);">${targetName[i]}</span>`;
                } else {
                    output += `<span style="color:var(--accent-blue); opacity:${random(0.3, 1)}">${crypticChars[Math.floor(Math.random() * crypticChars.length)]}</span>`;
                }
            }
            nameSpan.innerHTML = output;
            revealIndex = Math.floor((progress / 100) * targetName.length);
            await sleep(60);
        }
    })();

    let progress = 0;
    statusHeader.innerHTML = "ESTABLISHING SECURE UPLINK...";
    await typeLog("> [SYS] Initializing Alpha Trace Protocol v3.7...");
    await sleep(300);
    await typeLog("> [NET] Pinging dark relay nodes...", "#0088ff");

    for(let i=0; i<=25; i+=random(0.5, 2)) {
        progress = i; updateProgress(progress); await sleep(random(50, 150));
    }

    statusHeader.innerHTML = "<span class='glitching' style='color:var(--error)'>⚠️ FIREWALL DETECTED // BRUTE FORCING</span>";
    bar.style.backgroundColor = "var(--error)";
    revealBox.classList.add('glitching');
    await typeLog("> [WARN] ICE countermeasures active!", "var(--error)");
    await typeLog("> [HACK] Injecting polymorphic exploit code...");
    await sleep(500);
    await typeLog("> [ERR] Packet loss detected. Retrying...");
    await sleep(800);

    for(let i=25; i<=65; i+=random(1, 4)) {
        progress = i; updateProgress(progress);
        if(Math.random() > 0.8) await sleep(300);
        await sleep(random(20, 60));
    }
    revealBox.classList.remove('glitching');

    statusHeader.innerHTML = "<span style='color:var(--accent-blue)'>ACCESS GRANTED // DOWNLOADING TARGET DATA</span>";
    bar.style.backgroundColor = "var(--accent-blue)";
    await typeLog("> [OK] Firewall breached. Root access obtained.", "var(--success)");
    await typeLog("> [SYS] Decrypting biometric file header...", "#0088ff");

    barScanner.style.opacity = "1";
    barScanner.style.animation = "scanlineMove 1s linear infinite";

    for(let i=65; i<=97; i+=random(2, 5)) {
        progress = i; updateProgress(progress);
        if(i > 80) await typeLog(`> [DATA] Segment block 0x${Math.floor(random(1000,9999))} decrypted...`);
        await sleep(random(10, 40));
    }

    // --- DAS FINALE: VIDEO REVEAL ---
    await sleep(500);
    progress = 100;
    updateProgress(100);
    await typeLog("> [FINAL] Identity match confirmed: 100%", "var(--success)");

    decryptActive = false;

    // Flash-Effekt
    const flash = document.getElementById('image-overlay-glitch');
    flash.style.opacity = "1";
    await sleep(50);
    flash.style.opacity = "0";

    // Video aktivieren und abspielen
    placeholder.style.display = "none";
    revealVideo.style.display = "block";
    revealVideo.play(); // Startet mit Ton

    document.getElementById('target-profile-container').style.borderColor = "var(--success)";
    document.getElementById('target-profile-container').style.boxShadow = "0 0 40px rgba(0,255,136,0.6)";

    nameSpan.innerHTML = targetName.split('').map(c => `<span style="color:var(--success); text-shadow:0 0 20px var(--success);">${c}</span>`).join('');
    statusHeader.innerHTML = "<span style='color:var(--success)'>✅ TARGET IDENTIFIED // OPERATION SUCCESSFUL</span>";
    document.getElementById('header-glitch-bar').style.background = "var(--success)";
    bar.style.backgroundColor = "var(--success)";
    barScanner.style.opacity = "0";

    await sleep(1000);
    document.getElementById('reset-button').style.display = 'block';

    function updateProgress(p) {
        bar.style.width = `${p}%`;
        percText.textContent = `${Math.floor(p)}%`;
    }
};

function startMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const drops = Array(Math.floor(canvas.width/20)).fill(1);
    setInterval(() => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0088ff";
        ctx.font = "14px 'JetBrains Mono'";
        drops.forEach((y, i) => {
            const text = chars[Math.floor(Math.random()*chars.length)];
            ctx.fillText(text, i*20, y*20);
            if(y*20 > canvas.height && Math.random() > 0.98) drops[i] = 0;
            drops[i]++;
        });
    }, 45);
}

document.addEventListener('click', (e) => {
    if(e.target && e.target.id === 'reset-button') location.reload();
});
