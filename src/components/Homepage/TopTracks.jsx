import styled from "styled-components"
import Subheader from "../Global/Subheader";
import useStore from "../../store";
import { useEffect, useRef } from "react";
import { gsap } from "gsap/gsap-core";
import useMusicFetcher from "../../services/musicFetcher";
import useLyricsFetcher from "../../services/lyricsFetcher";
import NowPlayingIndicator from "../Player/NowPlayingIndicator";
import { AiFillFire } from "react-icons/ai";
import { useLocation,NavLink } from "react-router-dom";
import Track from "../Global/Track";

const Wrapper = styled.div`
    position: relative;
    padding-inline: 3rem;
    z-index: 3;
`;

// const Track = styled.div`
//     display: flex;
//     align-items: center;
//     padding: 1rem;
//     width: 100%;
//     /* height: 7rem; */
//     background-color: #161a1d;
//     border-radius: .5rem;
//     margin-block: 1rem;
//     cursor: pointer;

//     &:hover {
//         background-color: #222a2d;
//     }
// `

const Image = styled.img`
  width: 5rem;
  height: 5rem;
  margin-right: 1rem;
`;

const Title = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 600;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArtistWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Artist = styled.p`
  font-size: 1.2rem;
  color: #c6c6c6;
`;

const Duration = styled.p`
  font-size: 1.6rem;
  color: #c6c6c6;
  margin-left: auto;
`;




const ShowAll = styled(NavLink)`
  position: absolute;
  top: -.5rem;
  right: 2rem;
  padding: 1rem;
  font-size: 1.4rem;
  color: #c6c6c6;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function TopTracks() {
  const route = useLocation();
    const topTracksRef = useRef([]);
    const { TopTracks: {topTracks} } = useStore()


    useEffect(() => {
        gsap.set([topTracksRef.current] , {
            opacity: 0,
            y: 25,
        })
        gsap.to([topTracksRef.current] , {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: "power3.out",
        })
    },[topTracks])

    return (        
        <Wrapper>
            {route.pathname == "/" && <ShowAll to="/toptracks">Show all</ShowAll>}
            <Subheader>TOP TRACKS <AiFillFire style={{fontSize: "1.5rem", transform: "translateY(0.2rem)", color: "#e5383b"}}/></Subheader>
            <Column>
            {topTracks && Object.values(topTracks).slice(0, route.pathname == "/" ? 5 : topTracks.length).map((track, index) => 
                <Track ref={(el) => (topTracksRef.current[index] = el)} index={index} image={track?.image} id={track?.trackID} title={track?.trackName} artists={track?.artists} duration={track?.duration} albumID={track?.albumID} albumName={track?.albumName} artistID={track?.artists.length > 1 ? track?.artists[0].id : track?.artists.id} trackToSet={topTracks}/>
              )}
            </Column>
        </Wrapper>
    )
}

export default TopTracks
