import React, { forwardRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    width: 1rem;
    height: 1rem;
`;

const Circle = styled.div`
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    transform: scale(0.8);
    opacity: 0.5;
    background-color: #ffffff;
    animation: pulse 1s infinite;

    @keyframes pulse {
        50% {
            transform: scale(1.2);
            opacity: 1;
        }
    }
`;

// Forward the ref to the Wrapper element
const NowPlayingIndicator = forwardRef((props, ref) => {
    return (
        <Wrapper ref={ref}>
            <Circle />
        </Wrapper>
    );
});

export default NowPlayingIndicator;
