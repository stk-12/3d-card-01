class Card3D {
  constructor(element) {
    this.card = element;
    this.bounds = this.card.getBoundingClientRect();
    this.glow = this.card.querySelector('.glow');

    this.card.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.card.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  onMouseEnter() {
    this.bounds = this.card.getBoundingClientRect();
    document.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e) => {
    const { clientX: mouseX, clientY: mouseY } = e;
    const leftX = mouseX - this.bounds.x;
    const topY = mouseY - this.bounds.y;
    const center = {
      x: leftX - this.bounds.width / 2,
      y: topY - this.bounds.height / 2
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    this.card.style.transform = `
      
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 3}deg
      )
    `;

    this.glow.style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + this.bounds.width / 2}px
        ${center.y * 2 + this.bounds.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `;
  };

  onMouseLeave = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    this.card.style.transform = '';
    this.glow.style.backgroundImage = '';
  };
}

// すべての .card 要素に 3D エフェクトを適用
document.querySelectorAll('.card').forEach(card => new Card3D(card));