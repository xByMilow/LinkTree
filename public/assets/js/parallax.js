class ParallaxStars {
    constructor(containerId = "parallax-stars") {
      this.containerId = containerId;
      this.layers = [
        { name: "layer1", count: 150, size: "1px", speed: 200, colors: ["#ffffff", "#cceeff"] },
        { name: "layer2", count: 100, size: "2px", speed: 150, colors: ["#99ccff", "#aaddff"] },
        { name: "layer3", count: 50,  size: "3px", speed: 100, colors: ["#66bbff", "#88ddff"] }
      ];
  
      this.init();
    }
  
    init() {
      this.createStyle();
      this.createStarField();
    }
  
    createStyle() {
      const style = document.createElement("style");
      let keyframes = "";
      let css = `
        #${this.containerId} {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 2000px;
          overflow: hidden;
          z-index: -1;
          pointer-events: none;
        }
      `;
  
      this.layers.forEach((layer, index) => {
        const animName = `animStar${index}`;
        keyframes += `
          @keyframes ${animName} {
            0% { transform: translateY(0); }
            100% { transform: translateY(-${2000}px); }
          }
        `;
  
        css += `
          #${this.containerId} .${layer.name} {
            position: absolute;
            width: ${layer.size};
            height: ${layer.size};
            background: transparent;
            animation: ${animName} ${layer.speed}s linear infinite;
            box-shadow: ${this.generateBoxShadows(layer.count, layer.colors)};
          }
        `;
      });
  
      style.textContent = keyframes + css;
      document.head.appendChild(style);
    }
  
    createStarField() {
      const starField = document.createElement("div");
      starField.id = this.containerId;
  
      this.layers.forEach(layer => {
        const stars = document.createElement("div");
        stars.className = layer.name;
        starField.appendChild(stars);
      });
  
      document.body.appendChild(starField);
    }
  
    generateBoxShadows(count, colors) {
      const maxX = window.innerWidth * 2;
      const maxY = 2000;
      let shadows = [];
  
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);
        const color = colors[Math.floor(Math.random() * colors.length)];
        shadows.push(`${x}px ${y}px ${color}`);
      }
  
      return shadows.join(", ");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    new ParallaxStars();
  });