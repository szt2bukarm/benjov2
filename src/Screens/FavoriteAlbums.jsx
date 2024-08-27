import styled from "styled-components"
import { gsap } from "gsap/gsap-core";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFavoritesFetcher from "../services/favoritesFetcher";
import Loader from "../components/Player/Loader";
import Subheader from "../components/Global/Subheader";
import useStore from "../store";
import Album from "../components/Global/Album";

const Wrapper = styled.div`
    position: relative;
    margin-bottom: 2rem;
    `

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

function FavoriteAlbums() {
    const {Favorites: {albums,loadingAlbums,albumIDs}} = useStore();
    const { fetchFavoriteAlbums } = useFavoritesFetcher();
    const albumsRef = useRef([]);
    const singlesRef = useRef([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchFavoriteAlbums();
    }, [])


    useEffect(() => {
        if (albumsRef?.current) {
            gsap.set([albumsRef.current] , {
                opacity: 0,
                y: 25,
            })
            gsap.to([albumsRef.current] , {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: "power3.out",
            })
        }

        if (singlesRef?.current) {
            gsap.set([singlesRef.current] , {
                opacity: 0,
                y: 25,
            })
            gsap.to([singlesRef.current] , {
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
            {loadingAlbums ? <Loader /> :
            <div style={{paddingInline: "3rem"}}>
                <Subheader ref={(el) => (albumsRef.current[0] = el)}>{albumIDs?.length} FAVORITE ALBUM{albumIDs?.length > 1 || albumIDs?.length === 0 ? "S" : ""}</Subheader>
                {Object.values(albums).filter(album => album.type === "album").length > 0 ? 
                <>
                <Subheader ref={el => albumsRef.current[0] = el}>ALBUMS</Subheader>
                <Column>
                {albums && Object.values(albums).filter(album => album.type === "album").map((album,index) => {
                    return <Album ref={el => albumsRef.current[index+1] = el} key={index} index={index} image={album.image} id={album.albumID} name={album.albumName} artists={album.artists} />
                })}
                </Column>
                </>
                : null                
                }
                <br></br><br></br>
                {Object.values(albums).filter(album => album.type !== "album").length > 0 ?
                <>
                <Subheader ref={el => singlesRef.current[0] = el}>SIGNLES & EPs</Subheader>
                <Column>
                {albums && Object.values(albums).filter(album => album.type !== "album").map((album,index) => {
                    return <Album ref={el => singlesRef.current[index+1] = el} key={index} index={index} image={album.image} id={album.albumID} name={album.albumName} artists={album.artists} />
                })}
                </Column>
                </> : null }
            </div>
            }
        </Wrapper>
    )
}

export default FavoriteAlbums
