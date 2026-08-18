'use client';

import { useEffect, useRef } from 'react';

interface TrailingCursorProps {
  element?: HTMLElement;
  particles?: number;
  rate?: number;
  baseImageSrc?: string;
}

const TrailingCursor: React.FC<TrailingCursorProps> = ({
  element,
  particles = 15,
  rate = 0.4,
  baseImageSrc = '/icons/pointer.png',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<
    Array<{
      position: { x: number; y: number };
      image: HTMLImageElement;
      move: (context: CanvasRenderingContext2D) => void;
    }>
  >([]);
  const animationFrameRef = useRef<number>(undefined);
  const cursorsInittedRef = useRef(false);

  useEffect(() => {
    class Particle {
      position: { x: number; y: number };
      image: HTMLImageElement;

      constructor(x: number, y: number, image: HTMLImageElement) {
        this.position = { x, y };
        this.image = image;
      }

      move(context: CanvasRenderingContext2D) {
        context.drawImage(
          this.image,
          this.position.x - this.image.width / 2,
          this.position.y - this.image.height / 2,
        );
      }
    }

    const baseImage = new Image();
    baseImage.src = baseImageSrc;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const hasWrapperEl = element !== undefined;
    const targetElement = hasWrapperEl ? element : document.body;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) return;

    canvasRef.current = canvas;
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';

    if (hasWrapperEl) {
      canvas.style.position = 'absolute';
      targetElement.appendChild(canvas);
      canvas.width = targetElement.clientWidth;
      canvas.height = targetElement.clientHeight;
    } else {
      canvas.style.position = 'fixed';
      document.body.appendChild(canvas);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (hasWrapperEl && element) {
        const boundingRect = element.getBoundingClientRect();
        cursorRef.current.x = e.clientX - boundingRect.left;
        cursorRef.current.y = e.clientY - boundingRect.top;
      } else {
        cursorRef.current.x = e.clientX;
        cursorRef.current.y = e.clientY;
      }

      if (cursorsInittedRef.current === false) {
        cursorsInittedRef.current = true;
        for (let i = 0; i < particles; i++) {
          particlesRef.current.push(
            new Particle(cursorRef.current.x, cursorRef.current.y, baseImage)
          );
        }
      }
    };

    const onWindowResize = () => {
      if (hasWrapperEl && element) {
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const updateParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      let x = cursorRef.current.x;
      let y = cursorRef.current.y;

      particlesRef.current.forEach((particle, index) => {
        const nextParticle =
          particlesRef.current[index + 1] || particlesRef.current[0];

        particle.position.x = x;
        particle.position.y = y;
        particle.move(context);
        x += (nextParticle.position.x - particle.position.x) * rate;
        y += (nextParticle.position.y - particle.position.y) * rate;
      });
    };

    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = '*, *::before, *::after { cursor: none !important; }';

    if (!prefersReducedMotion.matches) {
      document.head.appendChild(cursorStyle);
      targetElement.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onWindowResize);
      loop();
    }

    return () => {
      cursorStyle.remove();
      if (canvasRef.current) {
        canvasRef.current.remove();
        canvasRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      particlesRef.current = [];
      cursorsInittedRef.current = false;
      targetElement.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [element, particles, rate, baseImageSrc]);

  return null;
};

export default TrailingCursor;
