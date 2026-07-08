document.addEventListener('DOMContentLoaded', () => {

    const btnForceLandscape = document.getElementById('btnForceLandscape');
    if (btnForceLandscape) {
        btnForceLandscape.addEventListener('click', () => {
            if (typeof playClickSound === 'function') playClickSound();
            const docElm = document.documentElement;
            if (docElm.requestFullscreen) docElm.requestFullscreen();
            else if (docElm.mozRequestFullScreen) docElm.mozRequestFullScreen();
            else if (docElm.webkitRequestFullScreen) docElm.webkitRequestFullScreen();
            else if (docElm.msRequestFullscreen) docElm.msRequestFullscreen();

            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(function (error) {
                    console.log("Kunci orientasi gagal:", error);
                });
            }
        });
    }

    const storySequence = [
        {
            bg: 'url("../shared/assets/bg-pantai.png")',
            text: "Halo sobat pintar! Aku adalah peri pemandu yang akan memandu kamu dalam permainan Pilah Aku!"
        },
        {
            bg: 'url("../shared/assets/bg-pantai.png")',
            text: "Di permainan kali ini, tugas kamu adalah mencocokkan kegiatan keluarga marchel sesuai kolom kebutuhan atau keinginan dengan tepat."
        },
        {
            bg: 'url("../shared/assets/bg-pantai.png")',
            text: "Peringatan penting! Apabila kamu sudah meletakkan stickernya di kolom yang kamu tuju, maka sticker tidak bisa dipindah lagi."
        },
        {
            bg: 'url("../shared/assets/bg-pantai.png")',
            text: "Oleh karena itu, pikirkan dengan baik dan pilihlah stiker dengan cermat sebelum menaruhnya di dalam kolom ya!"
        },
        {
            bg: 'url("../shared/assets/bg-pantai.png")',
            text: "Apakah kamu sudah siap bermain? Ayo tunjukkan kemampuan membedakanmu! Semoga berhasil!"
        }
    ];

    let currentStep = 0;
    let isTyping = false;
    let typeInterval;
    let currentText = "";

    const gameBg = document.getElementById('game-bg');
    const dialogueText = document.getElementById('dialogue-text');
    const clickLayer = document.getElementById('click-layer');
    const fairyContainer = document.getElementById('fairy-container');
    const speechBubble = document.getElementById('speech-bubble');
    const continueHint = document.getElementById('continue-hint');
    const btnMulai = document.getElementById('btn-mulai');

    setTimeout(() => {
        fairyContainer.classList.add('show');
        setTimeout(() => {
            speechBubble.classList.add('show');
            loadScene(0);
        }, 800);
    }, 500);

    function loadScene(index) {
        if (index >= storySequence.length) return;

        const scene = storySequence[index];
        gameBg.style.backgroundImage = scene.bg;

        typeText(scene.text);

        if (index === storySequence.length - 1) {
            continueHint.style.display = 'none';
        } else {
            continueHint.style.display = 'block';
            continueHint.style.opacity = '0';
        }
    }

    function typeText(text) {
        clearInterval(typeInterval);
        isTyping = true;
        currentText = text;
        dialogueText.innerHTML = "";

        let i = 0;
        const typeSpeed = 30;

        typeInterval = setInterval(() => {
            dialogueText.innerHTML += text.charAt(i);
            i++;
            if (i >= text.length) {
                finishTyping();
            }
        }, typeSpeed);
    }

    function finishTyping() {
        clearInterval(typeInterval);
        isTyping = false;
        dialogueText.innerHTML = currentText;

        if (currentStep < storySequence.length - 1) {
            continueHint.style.opacity = '1';
        } else {
            btnMulai.style.display = 'block';
            clickLayer.style.display = 'none';
        }
    }

    clickLayer.addEventListener('click', () => {
        if (typeof playClickSound === 'function') playClickSound();

        if (isTyping) {
            finishTyping();
        } else {
            if (currentStep < storySequence.length - 1) {
                currentStep++;
                loadScene(currentStep);
            }
        }
    });

});
