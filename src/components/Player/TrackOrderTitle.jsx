import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useStore from "../../store";

const TitleWrapper = styled.div`
  overflow: hidden;
  /* width: 50rem; */
  white-space: nowrap;

  & > * {
    display: inline-block;
    position: relative;
    animation: ${(props) => (props.shouldAnimate ? `move ${props.duration}s linear infinite` : "none")};
  }

  @keyframes move {
    0%,
    25% {
      transform: translateX(0%);
      left: 0%;
    }
    50% {
      transform: translateX(-100%);
      left: 100%
    }
    75% {
      transform: translateX(-100%);
      left: 100%;
    }
    100% {
      transform: translateX(0%);
      left: 0%;
    }
  }
`;

const Title = styled.span`
  font-size: 1.8rem;
  color: white;
  font-weight: 600;
`;

function TrackOrderTitle({ children,sID }) {
  const { Music: { spotifyID } } = useStore();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [duration, setDuration] = useState(0);
  const titleRef = useRef(null);

  useEffect(() => {
    const checkTitleWidth = () => {
      if (titleRef.current) {
        const titleWidth = titleRef.current.offsetWidth;
        const containerWidth = sID == spotifyID ? 450 : 470;
        const isWider = titleWidth > containerWidth;
        setShouldAnimate(isWider);
        if (isWider) {
             const minDuration = 3;
             const maxDuration = 30;
             const minWidth = 470; 
             const maxWidth = 1000; 
   
             // Map titleWidth to a duration
             const mappedDuration = minDuration + ((titleWidth - minWidth) / (maxWidth - minWidth)) * (maxDuration - minDuration);
             setDuration(Math.max(minDuration, Math.min(mappedDuration, maxDuration)));
        }
      }
    };

    checkTitleWidth();
    window.addEventListener('resize', checkTitleWidth); // Check on resize
    return () => window.removeEventListener('resize', checkTitleWidth); // Cleanup
  }, [spotifyID]); // 

  return (
    <TitleWrapper style={{ width: sID == spotifyID ? 450 : 470 }} shouldAnimate={shouldAnimate} duration={duration}>
      <Title ref={titleRef}>{children}</Title>
    </TitleWrapper>
  );
}

export default TrackOrderTitle;
