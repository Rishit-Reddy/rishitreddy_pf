"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface TextSegment {
  text: string;
  highlight?: boolean;
  color?: string;
}

interface ColoredTypingAnimationProps extends MotionProps {
  segments: TextSegment[];
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
}

export function ColoredTypingAnimation({
  segments,
  className,
  duration = 50,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  ...props
}: ColoredTypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<ReactNode[]>([]);
  const [started, setStarted] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const elementRef = useRef<HTMLElement | null>(null);
  const totalChars = segments.reduce((sum, segment) => sum + segment.text.length, 0);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    const typingEffect = setInterval(() => {
      if (currentCharIndex < totalChars) {
        setCurrentCharIndex(prev => prev + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [currentCharIndex, duration, started, totalChars]);

  useEffect(() => {
    if (currentCharIndex === 0) return;

    let charCount = 0;
    const renderedSegments: ReactNode[] = [];

    for (const segment of segments) {
      const segmentLength = segment.text.length;
      const charsToShow = Math.min(
        segmentLength,
        Math.max(0, currentCharIndex - charCount)
      );
      
      if (charsToShow > 0) {
        const visibleText = segment.text.substring(0, charsToShow);
        
        if (segment.highlight) {
          renderedSegments.push(
            <span 
              key={charCount} 
              className={cn("font-medium", segment.color ? "" : "text-[#4a93dc]")}
              style={segment.color ? { color: segment.color } : {}}
            >
              {visibleText}
            </span>
          );
        } else {
          renderedSegments.push(visibleText);
        }
      }
      
      charCount += segmentLength;
    }

    setDisplayedText(renderedSegments);
  }, [currentCharIndex, segments]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
}
