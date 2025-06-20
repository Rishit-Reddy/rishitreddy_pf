"use client";

import { useState, useEffect } from "react";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/magicui/terminal";

interface TerminalAnimationProps {
    onComplete?: () => void;
}

export default function TerminalAnimation({ onComplete }: TerminalAnimationProps) {
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        // Auto-hide after 7 seconds
        const timer = setTimeout(() => {
            setVisible(false)
            onComplete?.();
        }, 7000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <>
            <Terminal className=" w-80 h-55 max-w-[520px] sm:h-auto sm:w-auto md:w-140 md:h-80 text-xs sm:text-sm">
                <TypingAnimation>&gt; ssh rishitreddy.com</TypingAnimation>

                <AnimatedSpan delay={1500} className="text-green-500">
                    <span>✔ Connected to rishitreddy.com</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2000} className="text-green-500">
                    <span>✔ Fetching site manifest...</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3000} className="text-green-500">
                    <span>✔ Compiling layout and styles...</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3500} className="text-green-500">
                    <span>✔ Injecting React islands</span>
                </AnimatedSpan>

                <AnimatedSpan delay={4000} className="text-green-500">
                    <span>✔ Initializing Magic UI animations</span>
                </AnimatedSpan>

                <TypingAnimation delay={4500} className="text-cyan-400">
                    Portfolio ready. Launching...
                </TypingAnimation>
            </Terminal>
        </>

    );
}
