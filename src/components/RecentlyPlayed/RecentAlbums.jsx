import styled from "styled-components"
import Subheader from "../Global/Subheader"
import useStore from "../../store"
import { gsap } from "gsap/gsap-core";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Album from "../Global/Album";

const Wrapper = styled.div`
    /* padding-inline: 3rem; */
    margin-bottom: 2rem;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

function RecentAlbums() {
    const {RecentlyPlayed: {albums}} = useStore();
    const albumsRef = useRef([]);
    const singlesRef = useRef([]);

    useEffect(() => {
        if (albumsRef?.current) {
            gsap.set([albumsRef?.current] , {
                opacity: 0,
                y: 25,
            })
            gsap.to([albumsRef?.current,] , {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: "power3.out",
            })
        }
        if (singlesRef?.current) {
            gsap.set([singlesRef?.current] , {
                opacity: 0,
                y: 25,
            })
            gsap.to([singlesRef?.current,] , {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: "power3.out",
            })
        }
    },[albums])

    return (
        <Wrapper>

            {Object.values(albums).filter(album => album.type === "album").length > 0 && <Subheader ref={el => albumsRef.current[0] = el}>ALBUMS</Subheader>}
            <Column>
            {albums && Object.values(albums).filter(album => album.type === "album").map((album,index) => {
                return <Album ref={el => albumsRef.current[index+1] = el} key={index} index={index} image={album.image} id={album.albumID} name={album.albumName} artists={album.artists} />
            })}
            </Column>

            <br></br><br></br>
            {Object.values(albums).filter(album => album.type !== "album").length > 0 && <Subheader ref={el => singlesRef.current[0] = el}>SINGLES & EPs</Subheader>}
            <Column>
            {albums && Object.values(albums).filter(album => album.type !== "album").map((album,index) => {
                return <Album ref={el => singlesRef.current[index+1] = el} key={index} index={index} image={album.image} id={album.albumID} name={album.albumName} artists={album.artists} />
            })}
            </Column>

        </Wrapper>
    )
}

export default RecentAlbums
