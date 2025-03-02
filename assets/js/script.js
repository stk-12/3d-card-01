class Card3D {
  constructor(element) {
    this.card = element;
    this.bounds = this.card.getBoundingClientRect();
    this.glow = this.card.querySelector('.js-card-glow');
    this.effect = this.card.querySelector('.js-card-effect');

    this.card.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.card.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  onMouseEnter() {
    this.bounds = this.card.getBoundingClientRect();

    gsap.to(this.effect, {
      '--opacity': 1,
      duration: 0.4,
      ease: 'power2.out'
    });

    document.addEventListener('mousemove', this.onMouseMove);
  }

  // onMouseMove = (e) => {
  //   const { clientX: mouseX, clientY: mouseY } = e;
  //   const leftX = mouseX - this.bounds.x;
  //   const topY = mouseY - this.bounds.y;
  //   const center = {
  //     x: leftX - this.bounds.width / 2,
  //     y: topY - this.bounds.height / 2
  //   };
  //   const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

  //   // const maxRotation = Math.log(distance) * 2; // ログスケールで調整

  //   this.card.style.setProperty('--mouse-x', `${leftX}px`);
  //   this.card.style.setProperty('--mouse-y', `${topY}px`);

  //   // this.card.style.transform = `
      
  //   //   rotate3d(
  //   //     ${center.y / 100},
  //   //     ${-center.x / 100},
  //   //     0,
  //   //     ${Math.log(distance) * 3}deg
  //   //   )
  //   // `;

  //   // gsap.to(this.card, {
  //   //   rotateX: center.y / 10, // X軸回転
  //   //   rotateY: -center.x / 10, // Y軸回転
  //   //   ease: 'power2.out',
  //   //   duration: 0.3
  //   // });

  // };

  onMouseMove = (e) => {
    const { clientX: mouseX, clientY: mouseY } = e;
    const leftX = mouseX - this.bounds.x;
    const topY = mouseY - this.bounds.y;
    const center = {
      x: leftX - this.bounds.width / 2,
      y: topY - this.bounds.height / 2
    };

    this.card.style.setProperty('--mouse-x', `${leftX}px`);
    this.card.style.setProperty('--mouse-y', `${topY}px`);

    // カードの中央を基準に上半分か下半分かを判定
    const isTopHalf = topY < this.bounds.height / 2;

    // 🔥 X軸の回転: 上半分なら前に、下半分なら奥に傾く
    const rotateX = isTopHalf ? -Math.abs(center.y / 10) : Math.abs(center.y / 10);

    // 🔥 Y軸の回転: 左半分なら左が手前、右半分なら右が手前
    const rotateY = center.x / 10; // そのまま適用（左ならマイナス、右ならプラス）

    gsap.to(this.card, {
      rotateX,
      rotateY,
      ease: 'power2.out',
      duration: 0.3
    });
  };

  onMouseLeave = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    // this.card.style.transform = '';

    // 回転をリセット
    gsap.to(this.card, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out',
      duration: 0.3
    });

    gsap.to(this.effect, {
      '--opacity': 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };
}

// すべての .card 要素に 3D エフェクトを適用
document.querySelectorAll('.js-card').forEach(card => new Card3D(card));