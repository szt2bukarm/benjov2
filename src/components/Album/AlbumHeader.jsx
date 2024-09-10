import styled from "styled-components"
import useStore from "../../store"
import { extractColors } from "extract-colors"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap/gsap-core"
import { useNavigate } from "react-router-dom"
import { FaRegHeart,FaHeart } from "react-icons/fa";
import useFavoritesFetcher from "../../services/favoritesFetcher"

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 3rem;
    width:100%;
    height: 100rem;
    margin-top: -35rem;
    transition: background 200ms;
    z-index: 0;
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

const Artists = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
`

const Artist = styled.p`
    position: relative;
    font-size: 1.4rem;
    color: #d6d6d6;

    &:hover {
        color: #fff;
        cursor: pointer;
        text-decoration: underline;
    }

    &:not(:last-child)::after {
    content: "●";
    position: absolute;
    right: -1.2rem;
    padding-left: 10px; /* Space between item and separator */
}
`

const Like = styled.span`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -2rem;
    right:-2rem;
    font-size: 2.4rem;
    color: #000;
    padding: 1rem;
    background-color: #fff;
    border-radius: 50%;
    width: 4.4rem;
    height: 4.4rem;

    &:hover {
        cursor: pointer;
        background-color: #d6d6d6;
    }
`

const Release = styled.p`
    font-size: 1.4rem;
    color: #d6d6d6;
`

function AlbumHeader() {
    const {Album: {data},Favorites: {albumIDs,setChangedAlbums}, User: {guest}} = useStore();
    const [color,setColor] = useState("");
    const navigate = useNavigate();
    const WrapperRef = useRef(null);
    const { addFavoriteAlbum } = useFavoritesFetcher();

    const handleFavorite = (id) => {
        setChangedAlbums(true);
        addFavoriteAlbum(id);
    }

    const getDate = (d) => {
        const date = new Date(d);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return `${day} ${months[month]}, ${year}`;
    }

    useEffect(() => {
        try {
            const fetchAndExtractColors = async () => {
                const response = await fetch(data?.image, { mode: 'cors' });
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
        
                const extractedColors = await extractColors(imageUrl);
                URL.revokeObjectURL(imageUrl);
                setColor(extractedColors.sort((a, b) => b.area - a.area)[1].hex);
            };
            fetchAndExtractColors();
        } catch (error) {}

        if (WrapperRef.current){
            gsap.set(WrapperRef.current, {
                y: 20,
                opacity: 0,
            });
    
            gsap.to(WrapperRef.current, {
                y: 0,
                opacity: 1,
                duration: .3,
            });
        }
    
      }, [data?.image]);

    return (
        <Wrapper ref={WrapperRef} style={{background: `linear-gradient( ${color}, #0b090a)`}}>
            <ImageWrapper>
                <Image src={data?.image} />
                {!guest && 
                <Like onClick={() => handleFavorite(data?.id)}>
                    {albumIDs && albumIDs.includes(data?.id) ? <FaHeart /> : <FaRegHeart />}
                </Like>
                }
            </ImageWrapper>
            <InfoWrapper>
                <Title>{data?.name}</Title>
                <Artists>
                    {data?.artist.map((artists,index) => <Artist onClick={() => navigate("/artist/" + artists.id)} key={index}>{artists.name}</Artist>)}
                    <Release>{data?.release? getDate(data?.release) : ""}</Release>
                </Artists>
            </InfoWrapper>
        </Wrapper>
    )
}

export default AlbumHeader
