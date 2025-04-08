class ShootingStars {
    constructor(containerId = "shooting-stars", interval = 3000) {
      this.containerId = containerId;
      this.interval = interval;
  
      this.init();
    }
  
    init() {
      this.createStyle();
      this.createContainer();
      this.startShooting();
    }
  
    createStyle() {
      const style = document.createElement("style");
      style.textContent = `
        #${this.containerId} {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 10;
          overflow: hidden;
        }
  
        .shooting-star {
          position: absolute;
          width: 2px;
          height: 100px;
          background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
          opacity: 0.8;
          transform: rotate(45deg);
          animation: shoot 1s linear forwards;
          filter: drop-shadow(0 0 6px white);
        }
  
        @keyframes shoot {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-1000px, 1000px) rotate(45deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  
    createContainer() {
      const container = document.createElement("div");
      container.id = this.containerId;
      document.body.appendChild(container);
    }
  
    startShooting() {
      setInterval(() => this.createShootingStar(), this.interval);
    }
  
    createShootingStar() {
      const star = document.createElement("div");
      star.classList.add("shooting-star");
  
      const startX = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
      const startY = Math.random() * window.innerHeight * 0.4;
  
      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;
  
      document.getElementById(this.containerId).appendChild(star);
  
      setTimeout(() => {
        star.remove();
      }, 1000);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    new ShootingStars();
  });
  