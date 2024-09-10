import styled from "styled-components"
import useStore from "../../store"
import { useEffect, useRef } from "react";
import { gsap } from "gsap/gsap-core";
import Subheader from "../Global/Subheader";
import useRecommendationFetcher from "../../services/recommendationFetcher";
import GenreTracks from "./GenreTracks";

const Wrapper = styled.div`
    padding-inline: 3rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
`

const GenreWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Genre = styled.div`
    width: max-content;
    font-size: 1.6rem;
    margin: .3rem;
    padding: 1rem;
    color: #000;
    border-radius: .5rem;
    font-weight: 500;
    transition: background-color 50ms, color 50ms;

    &:hover {
        cursor: pointer;
        background-color: #000 !important;
        box-shadow: inset 0 0 0.3rem #fff;
        color: #fff;
    }
`

const colors = [
    "#b1a7a6", "#868282", "#897978"
];

function Genres() {
    const {Genres: {genres,setTracksOpen,setSelectedGenre}} = useStore();
    const GenreRef = useRef([]);
    const {fetchGenreRecommendationData} = useRecommendationFetcher();

    const handleClick = (genre) => {
        fetchGenreRecommendationData(genre)
        setSelectedGenre(genre)
        setTracksOpen(true)
    }

    useEffect(() => {
        GenreRef.current.forEach((el) => {
            const randomDegree = (Math.random() * 60) - 30;
            const randomColor = colors[Math.floor(Math.random() * colors.length)]; 
            gsap.set(el, {
                transform: `rotate(${randomDegree}deg)`,
                opacity: 0,
                scale: 0.4,
                backgroundColor: randomColor 
            });
        });
        gsap.to(GenreRef.current, {
            duration: 0.2,
            stagger: 0.015,
            transform: "rotate(0deg)",
            scale: 1,
            opacity: 1,
            ease: "power3.out"
        });
    }, [genres]);


    return (
        <Wrapper>
            <Subheader>GENRES</Subheader>
            <GenreWrapper>
            {genres && genres.map((genre,index) => (
                <Genre key={genre} onClick={() => handleClick(genre)} ref={(el) => GenreRef.current[index] = el}>{genre}</Genre>
            ))}
            </GenreWrapper>
        </Wrapper>
    )
}

export default Genres
