import { useEffect, useState } from "react";
import TerminalAnimation from "@/components/react/TerminalAnimation";
import { WarpBackground } from "@/components/magicui/warp-background";

export default function PageLoader({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hasSeen = sessionStorage.getItem("animationRendered");
        setIsLoading(!hasSeen); // Show animation only if not seen
    }, []);

    const handleTerminalComplete = () => {
        sessionStorage.setItem("animationRendered", "true");
        setIsLoading(false);
    };

    return isLoading ? (
        <div className="fixed inset-0 w-screen h-screen overflow-hidden m-0 p-0 z-50">
            <WarpBackground
                perspective={80}
                beamsPerSide={4}
                beamSize={6}
                beamDelayMax={0}
                beamDelayMin={0}
                beamDuration={7}
                className="flex items-center justify-center w-full h-full"
            >
                <div className="flex items-center justify-center w-full h-full">
                    <TerminalAnimation onComplete={handleTerminalComplete} />
                </div>
            </WarpBackground>
        </div>
    ) : (
        <>{children}</>
    );
}
