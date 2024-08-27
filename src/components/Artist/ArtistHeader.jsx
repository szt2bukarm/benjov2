import styled from "styled-components"
import useStore from "../../store"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap/gsap-core"
import { extractColors } from "extract-colors"

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 3rem;
    width:100%;
    height: 70rem;
    margin-top: -25rem;
    transition: background 200ms;
    z-index: 0;
`

const Image = styled.img`
    width: 10vw;
    height: 10vw;
    object-fit: cover;
    object-position: center;
    /* max-height: 25rem; */
    border-radius: 50%;
    box-shadow: 0 0 20rem rgba(0, 0, 0);
`

const Name = styled.p`
    font-size: 5rem;
    color: #fff;
    font-weight: 600;
`

const Genres = styled.div`
    display:flex;
    flex-wrap: wrap;
    gap: 1rem;
`

const Genre = styled.p`
    font-size: 1.4rem;
    font-weight: 400;
    color: #fff;
    padding: 1rem;
    background-color: #0b090a;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

function ArtistHeader() {
    const {Artist: {data}} = useStore();
    const [color,setColor] = useState();
    const WrapperRef = useRef(null);

    useEffect(() => {
        try {
            const fetchAndExtractColors = async () => {
                const response = await fetch(data?.image, { mode: 'cors' });
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
        
                const extractedColors = await extractColors(imageUrl);
                URL.revokeObjectURL(imageUrl);
                setColor(extractedColors.sort((a, b) => b.area - a.area)[0].hex);
            };
            fetchAndExtractColors();
        } catch (error) {}

        gsap.set(WrapperRef.current, {
            y: 20,
            opacity: 0,
        });

        gsap.to(WrapperRef.current, {
            y: 0,
            opacity: 1,
            duration: .3,
        });
    
      }, [data?.image]);

    return (
        <Wrapper ref={WrapperRef} style={{background: `linear-gradient( ${color}, #0b090a)`}}>
            <Image src={data?.image} />
            <Column>
            <Name>{data?.name}</Name>
            <Genres>
                {data?.genres?.map((genre,i) => <Genre key={i}>{genre}</Genre>)}
            </Genres>
            </Column>
        </Wrapper>
    )
}

export default ArtistHeader
