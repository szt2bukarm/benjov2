import styled from "styled-components"
import { gsap } from "gsap/gsap-core";
import { useEffect, useRef } from "react";
import useFavoritesFetcher from "../services/favoritesFetcher";
import Loader from "../components/Player/Loader";
import Subheader from "../components/Global/Subheader";
import useStore from "../store";
import Track from "../components/Global/Track";

const Wrapper = styled.div`
    position: relative;
    margin-bottom: 2rem;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

function FavoriteTracks() {
    const {Favorites: {tracks,trackIDs,loadingTracks}} = useStore();
    const { fetchFavoriteTracks } = useFavoritesFetcher();
    const tracksRef = useRef([]);

    
    useEffect(() => {
        fetchFavoriteTracks();
    }, [])


    useEffect(() => {
        if (tracksRef?.current) {
            gsap.set([tracksRef.current] , {
                opacity: 0,
                y: 25,
            })
            gsap.to([tracksRef.current] , {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: "power3.out",
            })
        }
    },[tracks])

    return (
        <Wrapper>
            {loadingTracks ? <Loader /> : 
            <div style={{paddingInline: "3rem"}}>
                <Subheader ref={(el) => (tracksRef.current[0] = el)}>{trackIDs?.length} FAVORITE TRACK{trackIDs?.length > 1 || trackIDs?.length === 0 ? "S" : ""}</Subheader>
                <Column>
                    {tracks && Object.values(tracks).map((track,index) => {
                        return <Track ref={(el) => (tracksRef.current[index+1] = el)} key={track?.trackID} index={index} 
                        image={track?.image} id={track?.trackID} title={track?.trackName} artists={track?.artists} duration={track?.duration} albumID={track?.albumID} albumName={track?.albumName} artistID={track?.artists.length > 1 ? track?.artists[0].id : track?.artists.id} trackToSet={tracks}/>
                    })}
                </Column>
            </div>
            }
        </Wrapper>
    )
}

export default FavoriteTracks
