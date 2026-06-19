/**
 * Canvas Ambient & Spark Effects System
 * Renders stardust (fireflies), mouse cursor trails, coordinate bursts, and water ripples.
 */
export class AmbientSparkSystem {
  /**
   * @param {Object} options
   * @param {string} options.canvasId - ID of the main ambient canvas
   * @param {string} [options.trailCanvasId] - ID of the cursor trail canvas (optional)
   * @param {string} [options.themeColor] - Hex or HSL color string for particles
   * @param {string} [options.rippleColor] - Hex or HSL color string for water ripples
   * @param {number} [options.starCount=35] - Number of background stardust particles
   */
  constructor(options = {}) {
    this.canvas = document.getElementById(options.canvasId);
    if (!this.canvas) {
      console.warn(`AmbientSparkSystem: Canvas with ID '${options.canvasId}' not found.`);
      return;
    }
    this.ctx = this.canvas.getContext("2d");
    
    this.trailCanvas = options.trailCanvasId ? document.getElementById(options.trailCanvasId) : null;
    this.tctx = this.trailCanvas ? this.trailCanvas.getContext("2d") : null;

    this.themeColor = options.themeColor || "rgba(230, 230, 250, 0.85)";
    this.rippleColor = options.rippleColor || "rgba(230, 230, 250, 0.5)";
    this.starCount = options.starCount !== undefined ? options.starCount : 35;

    this.stars = [];
    this.ripples = [];
    this.trailPoints = [];
    this.isActive = true;

    this._initResize();
    this._initStars();
    this._initEventListeners();
    
    this._animate = this._animate.bind(this);
    requestAnimationFrame(this._animate);
  }

  _initResize() {
    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      if (this.trailCanvas) {
        this.trailCanvas.width = window.innerWidth;
        this.trailCanvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", resize);
    resize();
  }

  _initStars() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push(this._createAmbientStar());
    }
  }

  _createAmbientStar() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 1.5 + 1,
      alpha: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.01 + 0.005
    };
  }

  _initEventListeners() {
    // Click spawns ripple (unless interactive element clicked)
    window.addEventListener("click", (e) => {
      if (!this.isActive) return;
      if (e.target.closest("button") || e.target.closest("input") || e.target.closest("a")) return;
      this.spawnRipple(e.clientX, e.clientY);
    });

    // Mousemove spawns cursor trail
    window.addEventListener("mousemove", (e) => {
      if (!this.isActive || !this.trailCanvas) return;
      this.trailPoints.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 3,
        alpha: 1,
        color: this.themeColor
      });
    });
  }

  spawnRipple(x, y) {
    this.ripples.push({
      x,
      y,
      radius: 0,
      maxRadius: Math.random() * 120 + 80,
      alpha: 0.35,
      speed: Math.random() * 0.8 + 0.4
    });
  }

  spawnStardustBurst(x, y, count = 8) {
    if (!this.isActive) return;
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 2.0,
        vy: (Math.random() - 0.5) * 2.0 - 0.5,
        size: Math.random() * 3 + 2,
        alpha: 1.0,
        speed: -(Math.random() * 0.03 + 0.015),
        isBurst: true
      });
    }
  }

  _animate() {
    if (!this.isActive && this.ripples.length === 0 && this.stars.length === 0 && this.trailPoints.length === 0) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Update and Draw Ambient Stardust
    this.stars = this.stars.filter(s => {
      if (s.isBurst) {
        s.alpha += s.speed;
        return s.alpha > 0;
      }
      return true;
    });

    this.stars.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;

      if (!s.isBurst) {
        s.alpha += s.speed;
        if (s.alpha > 0.6 || s.alpha < 0.05) s.speed *= -1;

        if (s.x < 0) s.x = this.canvas.width;
        if (s.x > this.canvas.width) s.x = 0;
        if (s.y < 0) s.y = this.canvas.height;
        if (s.y > this.canvas.height) s.y = 0;
      }

      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      this.ctx.shadowBlur = s.isBurst ? 12 : 8;
      this.ctx.shadowColor = this.themeColor;
      this.ctx.fill();
    });

    // 2. Update and Draw Water Ripples
    for (let i = 0; i < this.ripples.length; i++) {
      let r = this.ripples[i];
      r.radius += r.speed;
      r.alpha -= 0.0025;

      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        this.ripples.splice(i, 1);
        i--;
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = this.rippleColor.replace(")", `, ${r.alpha})`).replace("rgb", "rgba");
      this.ctx.lineWidth = 1.5;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = this.rippleColor;
      this.ctx.stroke();
    }

    // 3. Update and Draw Cursor Trail
    if (this.trailCanvas && this.tctx) {
      this.tctx.clearRect(0, 0, this.trailCanvas.width, this.trailCanvas.height);
      for (let i = 0; i < this.trailPoints.length; i++) {
        let p = this.trailPoints[i];
        p.alpha -= 0.03;
        p.size -= 0.05;

        if (p.alpha <= 0 || p.size <= 0) {
          this.trailPoints.splice(i, 1);
          i--;
          continue;
        }

        this.tctx.beginPath();
        this.tctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.tctx.fillStyle = p.color;
        this.tctx.globalAlpha = p.alpha;
        this.tctx.shadowBlur = 10;
        this.tctx.shadowColor = p.color;
        this.tctx.fill();
      }
      this.tctx.globalAlpha = 1;
      this.tctx.shadowBlur = 0;
    }

    this.ctx.shadowBlur = 0;
    requestAnimationFrame(this._animate);
  }

  dissolve() {
    this.isActive = false;
    const fadeInterval = setInterval(() => {
      let activeElements = false;
      this.stars.forEach(s => {
        s.alpha -= 0.02;
        if (s.alpha > 0) activeElements = true;
      });

      if (!activeElements) {
        this.stars = [];
        this.ripples = [];
        this.trailPoints = [];
        clearInterval(fadeInterval);
      }
    }, 50);
  }

  reset() {
    this.isActive = true;
    this._initStars();
    this.ripples = [];
    this.trailPoints = [];
  }
}
