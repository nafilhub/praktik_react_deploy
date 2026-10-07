import React, { useEffect, useRef } from 'react';

export default function TeaGardenCanvas({ seasonMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    window.addEventListener('resize', handleResize);

    const petals = [];
    const floatingLanterns = [];
    const fireflies = [];
    const butterflies = [];
    const ripples = [];
    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, prevX: 0, prevY: 0 };

    const initElements = () => {
      petals.length = 0;
      floatingLanterns.length = 0;
      fireflies.length = 0;
      butterflies.length = 0;

      // 1. Multi-depth Peach & Willow Petals (dengan Depth of Field / Bokeh)
      const isMobile = width < 768;
      const petalCount = Math.min(Math.floor((width * height) / (isMobile ? 26000 : 18000)), isMobile ? 32 : 65);
      for (let i = 0; i < petalCount; i++) {
        const depth = Math.random(); // 0: jauh/kecil, 1: dekat/besar
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height,
          depth,
          size: depth * 14 + 6,
          blur: depth > 0.85 ? 2.5 : depth < 0.25 ? 1.5 : 0,
          vx: (Math.random() * 0.6 + 0.3) * (depth * 0.7 + 0.5),
          vy: (Math.random() * 0.8 + 0.5) * (depth * 0.8 + 0.5),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.035,
          oscStep: Math.random() * Math.PI * 2,
          oscSpeed: Math.random() * 0.02 + 0.015,
          isPink: Math.random() > 0.45,
          alpha: depth * 0.45 + 0.35,
        });
      }

      // 2. Lentera Teratai Terapung di Air (Floating River Lanterns)
      for (let i = 0; i < 7; i++) {
        floatingLanterns.push({
          x: (width / 8) * (i + 1) + (Math.random() - 0.5) * 60,
          y: height * 0.72 + Math.random() * 120,
          size: Math.random() * 6 + 18,
          baseY: height * 0.72 + Math.random() * 120,
          bobStep: Math.random() * Math.PI * 2,
          flickerStep: Math.random() * Math.PI * 2,
          driftSpeed: (Math.random() - 0.5) * 0.2,
        });
      }

      // 3. Kunang-kunang Emas Bernapas (Living Bioluminescent Fireflies)
      for (let i = 0; i < 35; i++) {
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 1.2,
          alpha: Math.random() * 0.7 + 0.3,
          glowStep: Math.random() * Math.PI * 2,
          glowSpeed: Math.random() * 0.035 + 0.02,
        });
      }

      // 4. Kupu-kupu Emas & Langit yang Anggun
      for (let i = 0; i < 4; i++) {
        butterflies.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.65,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.1,
          size: Math.random() * 4 + 9,
          flapStep: Math.random() * Math.PI * 2,
          flapSpeed: 0.16 + Math.random() * 0.08,
          color: i % 2 === 0 ? 'rgba(245, 158, 11, 0.9)' : 'rgba(56, 189, 248, 0.85)',
        });
      }
    };
    initElements();

    const onMouseMove = (e) => {
      mouse.vx = (e.clientX - mouse.prevX) * 0.15;
      mouse.vy = (e.clientY - mouse.prevY) * 0.15;
      mouse.prevX = mouse.x = e.clientX;
      mouse.prevY = mouse.y = e.clientY;
    };

    const onClick = (e) => {
      // Riak air berkilau emas
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 140,
        alpha: 0.75,
      });

      // Ledakan kelopak bunga ekstra saat diklik
      for (let i = 0; i < 7; i++) {
        const depth = Math.random() * 0.6 + 0.4;
        petals.push({
          x: e.clientX + (Math.random() - 0.5) * 40,
          y: e.clientY + (Math.random() - 0.5) * 40,
          depth,
          size: depth * 14 + 6,
          blur: 0,
          vx: (Math.random() - 0.5) * 3.5,
          vy: (Math.random() - 0.5) * 3.5 - 1.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          oscStep: 0,
          oscSpeed: 0.03,
          isPink: Math.random() > 0.4,
          alpha: 0.8,
        });
      }
      if (petals.length > 90) petals.splice(0, 7);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Sinar Cahaya Emas Pagi/Senja (Volumetric Light Rays / Komorebi)
      const rayGrad = ctx.createRadialGradient(
        width * 0.25, height * 0.05, 10,
        width * 0.35, height * 0.45, width * 0.6
      );
      rayGrad.addColorStop(0, 'rgba(254, 240, 138, 0.12)');
      rayGrad.addColorStop(0.35, 'rgba(217, 119, 6, 0.06)');
      rayGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = rayGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Lentera Teratai Terapung di Permukaan Air (Floating Lanterns)
      for (let i = 0; i < floatingLanterns.length; i++) {
        const l = floatingLanterns[i];
        l.bobStep += 0.025;
        l.flickerStep += 0.05;
        l.x += l.driftSpeed;
        l.y = l.baseY + Math.sin(l.bobStep) * 4;

        if (l.x > width + 40) l.x = -40;
        if (l.x < -40) l.x = width + 40;

        ctx.save();
        ctx.translate(l.x, l.y);

        // Pantulan Cahaya di Air (Water Glow Reflection)
        const glowRadius = l.size * 2.2 * (0.85 + 0.15 * Math.sin(l.flickerStep));
        const lanternGlow = ctx.createRadialGradient(0, l.size * 0.3, 2, 0, l.size * 0.3, glowRadius);
        lanternGlow.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
        lanternGlow.addColorStop(0.5, 'rgba(220, 38, 38, 0.15)');
        lanternGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = lanternGlow;
        ctx.beginPath();
        ctx.arc(0, l.size * 0.3, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Kelopak Teratai Merah/Merah Muda
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.ellipse(0, l.size * 0.25, l.size * 0.9, l.size * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Lilin Lentera Bercahaya Emas
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(0, 0, l.size * 0.28, 0, Math.PI * 2);
        ctx.fill();

        // Api Lilin Hangat
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(0, -2, l.size * 0.14, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 3. Riak Air Halus Berkilau
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 2.2;
        rip.alpha *= 0.955;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 158, 11, ${rip.alpha * 0.65})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        if (rip.radius >= rip.maxRadius || rip.alpha < 0.02) {
          ripples.splice(r, 1);
        }
      }

      // 4. Kunang-kunang Emas Bioluminescent
      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];
        f.x += f.vx;
        f.y += f.vy;
        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;

        f.glowStep += f.glowSpeed;
        const curAlpha = f.alpha * (0.6 + 0.4 * Math.sin(f.glowStep));

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 224, 71, ${curAlpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(250, 204, 21, 0.85)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 5. Kupu-kupu Berpendar Terbang
      for (let i = 0; i < butterflies.length; i++) {
        const b = butterflies[i];
        b.flapStep += b.flapSpeed;
        b.x += b.vx + Math.sin(b.flapStep * 0.5) * 1.3;
        b.y += b.vy + Math.cos(b.flapStep * 0.4) * 0.85;

        if (b.x < -30) b.x = width + 30;
        if (b.x > width + 30) b.x = -30;
        if (b.y < -30) b.y = height + 30;
        if (b.y > height + 30) b.y = -30;

        const wingScale = Math.sin(b.flapStep);
        ctx.save();
        ctx.translate(b.x, b.y);

        ctx.fillStyle = b.color;
        // Sayap Kiri
        ctx.beginPath();
        ctx.ellipse(-b.size * 0.6, 0, b.size * 0.6 * Math.abs(wingScale), b.size, -0.22, 0, Math.PI * 2);
        ctx.fill();

        // Sayap Kanan
        ctx.beginPath();
        ctx.ellipse(b.size * 0.6, 0, b.size * 0.6 * Math.abs(wingScale), b.size, 0.22, 0, Math.PI * 2);
        ctx.fill();

        // Badan Kupu-kupu
        ctx.fillStyle = '#1c1917';
        ctx.beginPath();
        ctx.ellipse(0, 0, 1.6, b.size * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 6. Kelopak Bunga & Daun Willow dengan Depth of Field
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.oscStep += p.oscSpeed;
        p.x += p.vx + Math.sin(p.oscStep) * (1.2 + p.depth);
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Sentuhan Semilir Angin Kursor Mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p.x += (dx / dist) * force * 3.8 + mouse.vx * 0.4;
          p.y += (dy / dist) * force * 3.8 + mouse.vy * 0.4;
          p.rotation += 0.04;
        }

        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) p.x = -30;
        if (p.x < -30) p.x = width + 30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.blur > 0) {
          ctx.filter = `blur(${p.blur}px)`;
        }

        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.quadraticCurveTo(p.size * 0.45, 0, 0, p.size);
        ctx.quadraticCurveTo(-p.size * 0.45, 0, 0, -p.size);

        if (p.isPink) {
          // Kelopak Bunga Persik Lembut (Soft Peach Blossom)
          const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
          grad.addColorStop(0, `rgba(251, 191, 186, ${p.alpha})`);
          grad.addColorStop(1, `rgba(244, 114, 114, ${p.alpha * 0.7})`);
          ctx.fillStyle = grad;
        } else {
          // Daun Teh Longjing Giok (Celadon Jade Leaf)
          const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
          grad.addColorStop(0, `rgba(134, 180, 130, ${p.alpha})`);
          grad.addColorStop(1, `rgba(58, 105, 54, ${p.alpha * 0.75})`);
          ctx.fillStyle = grad;
        }
        ctx.fill();

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
    };
  }, [seasonMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
