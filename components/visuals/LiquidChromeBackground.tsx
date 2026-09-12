"use client";

import React, { useEffect, useRef } from "react";

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

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Subtle floating liquid chrome particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Deep dark base
      ctx.fillStyle = "#050507";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle ambient radial glow in upper third (matching PDF spotlight)
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.25,
        20,
        width * 0.5,
        height * 0.25,
        Math.max(width, height) * 0.65
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.06)");
      gradient.addColorStop(0.3, "rgba(212, 212, 216, 0.02)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle liquid metallic ribbon paths
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
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
      ctx.strokeStyle = "rgba(161, 161, 170, 0.03)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const wave2Y = height * 0.65 + Math.cos(time * 0.4) * 40;
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

      // Render chrome particle specks
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = Math.abs(Math.sin(time * 3 * p.pulseSpeed)) * p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90 transition-opacity duration-1000"
    />
  );
}
