import React from 'react'

interface FlashingCursorProps {
    color?: string;
    flashSpeedMs?: number;
    style?: React.CSSProperties;
}

const FlashingCursor: React.FC<FlashingCursorProps> = ({
    color = '--neon-red',
    flashSpeedMs = 1000,
    style = {},
}) => {
    return (
        <span
            className={`h-1 w-1 bg-transparent border-l border-r border-[${color}] animate-flash steps-1 infinite`}
            style={{
                animationDuration: `${flashSpeedMs}ms`,
                ...style
            }}
        />
    )
}

export default FlashingCursor;
