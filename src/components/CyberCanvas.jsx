import React, { useEffect, useRef } from 'react';

export default function CyberCanvas({ theme, matrixMode }) {
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
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle Constellation Network
    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const mouse = { x: null, y: null, radius: 150 };
    const shockwaves = [];

    const getColors = () => {
      if (matrixMode) {
        return { primary: '0, 255, 128', secondary: '0, 200, 80' };
      }
      if (theme === 'emerald') {
        return { primary: '0, 245, 160', secondary: '0, 217, 245' };
      }
      if (theme === 'amber') {
        return { primary: '255, 183, 3', secondary: '255, 84, 0' };
      }
      return { primary: '0, 242, 254', secondary: '157, 78, 221' };
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          size: Math.random() * 2 + 1,
          baseSize: Math.random() * 2 + 1,
        });
      }
    };
    initParticles();

    // Mouse Listeners
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const onClick = (e) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 180,
        alpha: 0.8,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('click', onClick);

    // Matrix Rain Setup
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF<>/*{}[]!#';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(1);

    const render = () => {
      const colors = getColors();

      if (matrixMode) {
        ctx.fillStyle = 'rgba(6, 7, 13, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00f5a0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Glowing lead character
          if (Math.random() > 0.9) {
            ctx.fillStyle = '#ffffff';
          } else {
            ctx.fillStyle = '#00f5a0';
          }

          ctx.fillText(text, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      } else {
        ctx.clearRect(0, 0, width, height);

        // Render shockwaves
        for (let s = shockwaves.length - 1; s >= 0; s--) {
          const sw = shockwaves[s];
          sw.radius += 4;
          sw.alpha *= 0.94;

          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.primary}, ${sw.alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          if (sw.radius >= sw.maxRadius || sw.alpha < 0.02) {
            shockwaves.splice(s, 1);
          }
        }

        // Update & Render Particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Mouse attraction
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
              const force = (mouse.radius - dist) / mouse.radius;
              p.x -= (dx / dist) * force * 1.5;
              p.y -= (dy / dist) * force * 1.5;
              p.size = p.baseSize + force * 2.5;
            } else {
              p.size = p.baseSize;
            }
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.primary}, 0.6)`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${colors.primary}, 0.8)`;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Connect nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 115) {
              const alpha = (1 - dist / 115) * 0.28;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${colors.primary}, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('click', onClick);
    };
  }, [theme, matrixMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: matrixMode ? 0.85 : 0.65,
        transition: 'opacity 0.4s ease',
      }}
    />
  );
}
