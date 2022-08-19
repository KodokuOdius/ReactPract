import React from "react";
import "./MouseObserver.css";

const MouseObserver: React.FC = () => {
    const containerRef = React.useRef<null | HTMLDivElement>(null);
    const mouseRef = React.useRef<null | HTMLDivElement>(null);

    React.useEffect(() => {
        if (!containerRef.current) { return };
        const containerNode = containerRef.current;

        const handleMouseMove = (event: MouseEvent) => {
            if (mouseRef.current === null) { return };

            mouseRef.current.style.left = `${event.offsetX - 15}px`;
            mouseRef.current.style.top = `${event.offsetY - 15}px`;
        };

        containerNode.addEventListener("mousemove", handleMouseMove);

        return () => containerNode.removeEventListener("mousemove", handleMouseMove);

    }, [])

    return (
        <div ref={containerRef} className="mouse-observer">
            <div ref={mouseRef} className="mouse-observer__mouse">
                +
            </div>
        </div>
    );
};

export default MouseObserver;
