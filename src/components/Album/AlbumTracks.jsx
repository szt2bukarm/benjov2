import styled from "styled-components"
import useStore from "../../store";
import Track from "../Global/Track";
import Subheader from "../Global/Subheader";
import useMusicFetcher from "../../services/musicFetcher";
import useLyricsFetcher from "../../services/lyricsFetcher";
import { gsap } from "gsap/gsap-core";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
    position: relative;
    padding-inline: 3rem;
    margin-top: -30rem;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
`

function AlbumTracks() {
    const {Album: {data,tracks}} = useStore();
    const { Music: { setSpotifyID,spotifyID, setArtist, setTitle, setDuration, setAlbum,setAlbumID,setArtistID, setImage },
    Lyrics: {setLyrics}, Player: {setLyricsScrolled}, Tracklist: {setTracks} } = useStore();
    const { fetchMusicData } = useMusicFetcher();
    const { fetchLyricsData } = useLyricsFetcher();
    const tracksRef = useRef([]);


    useEffect(() => {
        gsap.set([tracksRef.current] , {
            opacity: 0,
            y: 25,
        })
        setTimeout(() => {
            gsap.to([tracksRef.current] , {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: "power3.out",
            })
        }, 200);
    },[tracks])

    return (
        <Wrapper>
            <Subheader>{tracks && "TRACKS"}</Subheader>
            <Column>
            {tracks && 
                tracks.map((track,index) => {
                    return <Track ref={(el) => (tracksRef.current[index] = el)} key={track?.trackID} index={index}
                    image={track?.image} id={track?.trackID} title={track?.trackName} artists={track?.artists} duration={track?.duration} albumID={data?.id} albumName={data?.name} artistID={track?.artists.length > 1 ? track?.artists[0].id : track?.artists.id} trackToSet={tracks}/>
                })
            }
            </Column>
        </Wrapper>
    )
}

export default AlbumTracks
