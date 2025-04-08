let wallpaperLoaded = false;

document.addEventListener("DOMContentLoaded", function () {
    setWallpaper();
});

function setWallpaper() {
    if (wallpaperLoaded) return;

    const wallpaperElement = document.querySelector(".wallpaper");
    if (!wallpaperElement) {
        return;
    }

    const wallpaperPath = "/assets/wallpaper.mp4"; 
    let backgroundContent = wallpaperElement.querySelector(".background-content");

    if (!backgroundContent) {
        backgroundContent = document.createElement("div");
        backgroundContent.className = "background-content";
        wallpaperElement.prepend(backgroundContent);
    }

    let videoElement = backgroundContent.querySelector(".background-video");
    if (!videoElement) {
        videoElement = document.createElement("video");
        videoElement.className = "background-video";
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: fixed;
            top: 0;
            left: 0;
            z-index: -100; /* Sicherstellen, dass das Video im Hintergrund bleibt */
            opacity: 1; /* Direkt sichtbar machen */
            transition: opacity 1s ease-in-out;
        `;

        const source = document.createElement("source");
        source.src = wallpaperPath;
        source.type = "video/mp4";
        videoElement.appendChild(source);
        videoElement.addEventListener("canplay", () => {
        });

        videoElement.addEventListener("error", (e) => {
        });

        backgroundContent.appendChild(videoElement);
    }

    wallpaperLoaded = true;
}

function enterSite() {
    document.querySelector(".click").addEventListener("click", () => {
        document.querySelector(".click").classList.add("fade-out");
        setTimeout(() => {
            document.querySelector(".click").style.display = "none";
        }, 500);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const clickDiv = document.querySelector('.click');

    if (clickDiv) {
        clickDiv.addEventListener('click', () => {
            if (!clickDiv.classList.contains('fade-out')) {
                clickDiv.classList.add('fade-out');
                
                setTimeout(() => {
                    clickDiv.style.display = "none";
                }, 500);
                
                playMusic();
            }
        });
    } else {
    }

    setWallpaper();
});

document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
        "Sei nicht die Lösung, sei das Problem.",
        "Wenn niemand wegen dir weint, machst du etwas falsch.",
        "Hasse andere statt dich selbst.",
        "Misserfolg? Deine Schuld.",
        "Höre immer auf die Hater.",
        "Wenn es du gegen die Welt wäre, wäre ICH die Welt.",
        "Sei der Grund, warum jemand heute gescheitert ist.",
        "Sorge dafür, dass jemand heute aufgibt.",
        "¯\\_(ツ)_/¯"
    ];

    const quoteElement = document.getElementById("quote");
    let charIndex = 0;
    const currentQuote = quotes[Math.floor(Math.random() * quotes.length)];

    function typeEffect() {
        if (charIndex < currentQuote.length) {
            quoteElement.innerHTML += currentQuote.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        }
    }

    typeEffect();
});


document.querySelectorAll('.icon, .icon-container').forEach(icon => {
    icon.addEventListener('touchstart', function() {
        let tooltip = this.querySelector('.tooltip');
        tooltip.style.opacity = "1";
        tooltip.style.transform = "translateX(-50%) scale(1)";

        setTimeout(() => {
            tooltip.style.opacity = "0";
            tooltip.style.transform = "translateX(-50%) scale(0.9)";
        }, 1500);
    });
});