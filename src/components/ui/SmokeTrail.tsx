import { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  radius: number;
  growth: number;

  constructor(x: number, y: number, mouseVx: number, mouseVy: number) {
    // Phân tán vị trí sinh ra một chút quanh con trỏ
    this.x = x + (Math.random() - 0.5) * 15;
    this.y = y + (Math.random() - 0.5) * 15;

    // Vận tốc: Kết hợp lực quạt của chuột + sự phân tán tự nhiên + bay nhẹ lên trên
    this.vx = mouseVx * 0.03 + (Math.random() - 0.5) * 1.5;
    this.vy = mouseVy * 0.03 + (Math.random() - 0.5) * 1.5 - 0.5;

    this.life = 1; // Bắt đầu ở độ đậm 100%
    this.decay = Math.random() * 0.015 + 0.008; // Khói tan nhanh/chậm ngẫu nhiên

    this.radius = Math.random() * 10 + 10; // Kích thước ban đầu
    this.growth = Math.random() * 0.8 + 0.3; // Độ phình to của khói
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.radius += this.growth;
    this.life -= this.decay;

    // Ma sát không khí: khói di chuyển chậm dần
    this.vx *= 0.95;
    this.vy *= 0.95;
  }
}

export default function SmokeTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // ─── TẠO SPRITE KHÓI (Offscreen Canvas) để tối ưu hiệu năng ───
    // Dùng kỹ thuật này để vẽ được hàng ngàn hạt khói ở 60FPS mà không giật
    const puffSize = 128;
    const puffCanvas = document.createElement('canvas');
    puffCanvas.width = puffSize;
    puffCanvas.height = puffSize;
    const puffCtx = puffCanvas.getContext('2d')!;

    const grad = puffCtx.createRadialGradient(
      puffSize / 2, puffSize / 2, 0,
      puffSize / 2, puffSize / 2, puffSize / 2
    );
    // Màu khói: Ánh sương băng tuyết & Electric Ice Blue dịu mát, đồng bộ cùng Midnight Navy
    grad.addColorStop(0, 'rgba(224, 242, 254, 0.08)');
    grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.04)');
    grad.addColorStop(0.7, 'rgba(14, 165, 233, 0.015)');
    grad.addColorStop(1, 'rgba(2, 132, 199, 0)');

    puffCtx.fillStyle = grad;
    puffCtx.fillRect(0, 0, puffSize, puffSize);
    // ────────────────────────────────────────────────────────────

    let particles: Particle[] = [];
    let mouse = { x: width / 2, y: height / 2 };
    let lastMouse = { x: width / 2, y: height / 2 };

    const onMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      const vx = currentX - lastMouse.x;
      const vy = currentY - lastMouse.y;

      const distance = Math.hypot(vx, vy);

      // Nếu chuột di chuyển càng nhanh, sinh ra càng nhiều khói (tối đa 5 hạt/frame)
      const numParticles = Math.min(Math.floor(distance / 5) + 1, 5);

      // Nội suy vị trí để khói sinh ra đều đặn trên đường đi của chuột
      for (let i = 0; i < numParticles; i++) {
        const spawnX = lastMouse.x + vx * (i / numParticles);
        const spawnY = lastMouse.y + vy * (i / numParticles);
        particles.push(new Particle(spawnX, spawnY, vx, vy));
      }

      mouse.x = currentX;
      mouse.y = currentY;
      lastMouse = { x: currentX, y: currentY };
    };

    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', onMouseMove);

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Chế độ hòa trộn tạo cảm giác thể tích (volumetric) cho khói
      ctx.globalCompositeOperation = 'screen';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Vẽ sprite khói thay vì vẽ Gradient trực tiếp (rất nhẹ)
        ctx.globalAlpha = p.life;
        const size = p.radius * 2;
        ctx.drawImage(puffCanvas, p.x - size / 2, p.y - size / 2, size, size);
      }

      // Khôi phục Alpha và chế độ vẽ thường để vẽ điểm con trỏ
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      // Vẽ đầu con trỏ chuột tinh tế màu Electric Ice Blue
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      // Vầng hào quang mờ dịu nhẹ quanh con trỏ (Ice Blue Glow)
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}

