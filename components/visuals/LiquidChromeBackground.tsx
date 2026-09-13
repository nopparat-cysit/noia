"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  alpha: number;
  pulseSpeed: number;
  phase: number;
}

export default function LiquidChromeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // Dynamic floating liquid chrome particles distributed across entire viewport
    const particleCount = Math.min(85, Math.floor((width * height) / 14000) + 40);
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const speed = Math.random() * 0.35 + 0.15;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        baseVx: Math.cos(angle) * speed,
        baseVy: Math.sin(angle) * speed,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: Math.random() * 0.65 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        phase: Math.random() * Math.PI * 2,
      };
    });

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep dark base
      ctx.fillStyle = "#050507";
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient radial glow in upper section
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        20,
        width * 0.5,
        height * 0.3,
        Math.max(width, height) * 0.7
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.05)");
      gradient.addColorStop(0.35, "rgba(212, 212, 216, 0.018)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient liquid metallic ribbon paths
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1.5;

      // Ribbon 1
      ctx.beginPath();
      const wave1Y = height * 0.35 + Math.sin(time * 0.5) * 30;
      ctx.moveTo(-100, wave1Y);
      ctx.bezierCurveTo(
        width * 0.25,
        wave1Y - 80 + Math.cos(time * 0.4) * 40,
        width * 0.7,
        wave1Y + 120 + Math.sin(time * 0.6) * 50,
        width + 100,
        wave1Y - 20
      );
      ctx.stroke();

      // Ribbon 2 (deeper chrome sheen)
      ctx.strokeStyle = "rgba(161, 161, 170, 0.025)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const wave2Y = height * 0.68 + Math.cos(time * 0.4) * 40;
      ctx.moveTo(-50, wave2Y);
      ctx.bezierCurveTo(
        width * 0.3,
        wave2Y + 90 + Math.sin(time * 0.5) * 35,
        width * 0.75,
        wave2Y - 110 + Math.cos(time * 0.5) * 45,
        width + 50,
        wave2Y + 40
      );
      ctx.stroke();
      ctx.restore();

      // Constellation proximity filaments between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            const filamentAlpha = (1 - dist / 85) * 0.08;
            ctx.strokeStyle = `rgba(255, 255, 255, ${filamentAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & Render chrome particle specks with mouse interactivity
      particles.forEach((p) => {
        // Mouse gentle repulsion physics
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 130;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 1.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Return smoothly to base velocity
        p.vx += (p.baseVx - p.vx) * 0.04;
        p.vy += (p.baseVy - p.vy) * 0.04;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries seamlessly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Twinkling luxury pulsation
        const currentAlpha = Math.abs(Math.sin(time * 2 + p.phase)) * p.alpha * 0.8 + 0.15;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.radius > 1.6) {
          // Subtle glowing halo for larger specks
          ctx.shadowColor = "rgba(255, 255, 255, 0.7)";
          ctx.shadowBlur = 6;
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        } else {
          ctx.fillStyle = `rgba(228, 228, 231, ${currentAlpha})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-100"
    />
  );
}
