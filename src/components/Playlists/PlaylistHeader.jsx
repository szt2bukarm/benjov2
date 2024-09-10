import styled from "styled-components"
import useStore from "../../store"
import { extractColors } from "extract-colors"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap/gsap-core"
import { useNavigate } from "react-router-dom"
import { FaRegHeart,FaHeart } from "react-icons/fa";
import useFavoritesFetcher from "../../services/favoritesFetcher"
import usePlaylistFetcher from "../../services/PlaylistFetcher"


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 3rem;
    width:100%;
    height: 25rem;
    margin-top: -10rem;
    transition: background 200ms;
    z-index: -1;
`

const ImageWrapper = styled.div`
    position: relative;
    min-width: 15vw;
    border-radius: .5rem;
    `

const Image = styled.img`
    width: 15vw;
    box-shadow: 0 0 20rem rgba(0, 0, 0);
`

const InfoWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    z-index: 2;
`

const Title = styled.p`
    display: inline-block;
    width: fit-content;
    font-size: calc(10px + 1.8vw);
    line-height: .9;
    color: #fff;
    margin-bottom: 1rem;
    font-weight: 600;
`

const Infos = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
`

const Info = styled.p`
    position: relative;
    font-size: 1.4rem;
    color: #d6d6d6;

    &:not(:last-child)::after {
    content: "●";
    position: absolute;
    right: -1.2rem;
    padding-left: 10px; 
}
`

const Button = styled.p`
    position: relative;
    font-size: 1.4rem;
    color: #d6d6d6;

    &:not(:last-child)::after {
    content: "●";
    position: absolute;
    right: -1.2rem;
    padding-left: 10px; 
    }

    &:hover {
        color: #fff;
        cursor: pointer;
        text-decoration: underline;
    }
`

function PlaylistHeader() {
    const headerRef = useRef();
    const {Playlists: {name,username,id,trackNo,isPublic}, User: {username: user}} = useStore();
    const { updatePlaylistVisibility } = usePlaylistFetcher();

    useEffect(() => {
        if (headerRef.current){
            gsap.set(headerRef.current, {
                y: 20,
                opacity: 0,
            });
    
            gsap.to(headerRef.current, {
                y: 0,
                opacity: 1,
                duration: .3,
            });
        }    
    },[])

    return (
        <Wrapper ref={headerRef} style={{background: `linear-gradient( #1f1f1f, #0b090a)`}}>
            <InfoWrapper>
                <Title>{name}</Title>
                <Infos>
                    <Info>created by: {username}</Info>
                    <Info>{trackNo} tracks</Info>
                    {username == user &&
                    <Button onClick={() => updatePlaylistVisibility(id)}>SET TO {isPublic ? "PRIVATE" : "PUBLIC"}</Button>
                    } 
                </Infos>
            </InfoWrapper>
        </Wrapper>
    )
}

export default PlaylistHeader
