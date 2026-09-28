/* =====================================================
   PASSWORD
===================================================== */

const PASSWORD = "111111";


const passwordScreen =
    document.getElementById("passwordScreen");


const giftScreen =
    document.getElementById("giftScreen");


const mainSite =
    document.getElementById("mainSite");


const passwordInput =
    document.getElementById("passwordInput");


const passwordError =
    document.getElementById("passwordError");



function checkPassword() {

    const password =
        passwordInput.value;


    if (password === PASSWORD) {

        passwordError.textContent = "";


        passwordScreen.classList.remove(
            "active"
        );


        setTimeout(() => {

            giftScreen.classList.add(
                "active"
            );

        }, 500);


    } else {

        passwordError.textContent =
            "Password salah. Coba lagi.";


        passwordInput.value = "";


        passwordInput.focus();

    }

}



/* =====================================================
   ENTER PASSWORD
===================================================== */

passwordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            checkPassword();

        }

    }
);



/* =====================================================
   GIFT
===================================================== */

function openGift() {

    giftScreen.classList.remove(
        "active"
    );


    setTimeout(() => {

        mainSite.classList.add(
            "active"
        );


        startMusic();

    }, 700);

}



/* =====================================================
   SLIDER
===================================================== */

const slider =
    document.getElementById("slider");


const dots =
    document.querySelectorAll(".dot");


let currentSlide = 0;


const totalSlides = 6;



function updateSlider() {

    slider.style.transform =
        `translateX(-${currentSlide * 100}%)`;


    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        }
    );

}



function nextSlide() {

    if (
        currentSlide <
        totalSlides - 1
    ) {

        currentSlide++;

    } else {

        currentSlide = 0;

    }


    updateSlider();

}



function prevSlide() {

    if (currentSlide > 0) {

        currentSlide--;

    } else {

        currentSlide =
            totalSlides - 1;

    }


    updateSlider();

}



function goToSlide(index) {

    currentSlide = index;

    updateSlider();

}



/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowRight" ||
            event.key === "d"
        ) {

            nextSlide();

        }


        if (
            event.key === "ArrowLeft" ||
            event.key === "a"
        ) {

            prevSlide();

        }

    }
);



/* =====================================================
   MOUSE WHEEL
===================================================== */

let wheelLock = false;


document.addEventListener(
    "wheel",
    function(event) {

        if (
            !mainSite.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (wheelLock) {

            return;

        }


        wheelLock = true;


        if (event.deltaY > 0) {

            nextSlide();

        } else {

            prevSlide();

        }


        setTimeout(
            () => {

                wheelLock = false;

            },
            900
        );

    },
    {
        passive: true
    }
);



/* =====================================================
   TOUCH SWIPE
===================================================== */

let touchStartX = 0;

let touchEndX = 0;



document.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);



document.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[0]
                .screenX;


        handleSwipe();

    },
    {
        passive: true
    }
);



function handleSwipe() {

    const distance =
        touchStartX - touchEndX;


    if (
        Math.abs(distance) < 50
    ) {

        return;

    }


    if (distance > 0) {

        nextSlide();

    } else {

        prevSlide();

    }

}



/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById(
        "backgroundMusic"
    );


const musicButton =
    document.getElementById(
        "musicButton"
    );


let musicPlaying = false;



function startMusic() {

    music.volume = 0.35;


    const playPromise =
        music.play();


    if (
        playPromise !== undefined
    ) {

        playPromise
            .then(() => {

                musicPlaying = true;

                musicButton.textContent =
                    "♫";

            })
            .catch(() => {

                musicPlaying = false;

                musicButton.textContent =
                    "🔇";

            });

    }

}



function toggleMusic() {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.textContent =
            "🔇";

    } else {

        music.play();

        musicPlaying = true;

        musicButton.textContent =
            "♫";

    }

}



/* =====================================================
   LIGHTBOX
===================================================== */

const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );



function openLightbox(imagePath) {

    lightboxImage.src =
        imagePath;


    lightbox.classList.add(
        "active"
    );

}



function closeLightbox() {

    lightbox.classList.remove(
        "active"
    );


    setTimeout(() => {

        lightboxImage.src = "";

    }, 300);

}



/* Jangan tutup ketika
   gambar diklik */

lightboxImage.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

    }
);



/* =====================================================
   ESC UNTUK TUTUP FOTO
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeLightbox();

        }

    }
);



/* =====================================================
   START
===================================================== */

updateSlider();