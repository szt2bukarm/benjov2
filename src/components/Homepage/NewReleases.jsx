import styled from "styled-components";
import Subheader from "../Global/Subheader";
import useStore from "../../store";
import { useEffect, useState, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { gsap } from "gsap";
import { extractColors } from "extract-colors";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import '../../transitions.css'
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    position: relative;
    padding-inline: 3rem;
    margin-bottom: 6rem;
    z-index: 2;
`;

const Container = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 30rem;
    border-radius: 1rem;
    padding: 3rem;
    background: linear-gradient(90deg,rgba(101, 101, 101, 0.226), rgb(0, 0, 0));
    background-size: cover; 
    background-position: center; 
    overflow: hidden;
`;

const ContainerSkeleton = styled.div`
    display: flex;
    width: 100%;
    height: 30rem;
    border-radius: 1rem;
    padding: 3rem;
    background-color: #161a1d;
`;

const Background = styled.img`
    position: absolute;
    opacity: 0.2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
`;

const DataWrapper = styled.div`
    margin-block: auto;
    margin-left: 3.5rem;
    z-index: 1;
`;

const Title = styled.p`
    margin-top: auto;
    font-size: 3vw;
    line-height: 0.9;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #fff;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const ArtistImage = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
`;

const ArtistName = styled.p`
    font-size: 1.8rem;
    font-weight: 300;
    color: #fff;
`;

const OpenAlbum = styled.button`
    margin-top: 3rem;
    width: 12rem;
    height:4.5rem;
    font-size: 1.6rem;
    border-radius: 20px;
    cursor: pointer;
    transition: all 150ms;

    &:hover {
        background-color: #ffffff99;
        color: #000;
    }
`;

const Timer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: .3rem;
    width: 0%;
    background-color: #fff;
`;

const ArrowNext = styled(IoIosArrowForward)`
    position: absolute;
    bottom: 2rem;
    /* transform: translateY(-50%); */
    right: 1rem;
    color: #fff;
    font-size: 4rem;
    z-index: 1;
    cursor: pointer;
`;



function NewReleases() {
    const {NewReleases: {newReleases,setColor}} = useStore();
    const [current, setCurrent] = useState(0);

    const navigate = useNavigate();

    const dataWrapperRef = useRef(null);
    const timerRef = useRef(null);
    const backgroundRef = useRef(null);
    const intervalRef = useRef(null);
    const timerAnimation = useRef(null);

    const goToAlbum = () => {
        navigate("/album/" + newReleases[current].id);
    }

    const resetInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            changeCurrent(1);
        }, 5000);
    };

    const changeCurrent = (direction) => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        timerAnimation.current.restart();

        gsap.timeline()
            .to([dataWrapperRef.current], { y: 25, opacity: 0, duration: 0.30, ease: "power3.out" })
            .set([dataWrapperRef.current], { y: -25 })
            .to([dataWrapperRef.current], { y: 0, opacity: 1, duration: 0.30, ease: "power3.out" });

        gsap.timeline()
            .to(backgroundRef.current, { opacity: 0, duration: 0.30, ease: "power3.out" })
            .to(backgroundRef.current, { opacity: 0.2, duration: 0.30, ease: "power3.out" });

        setTimeout(() => {
            setCurrent(current => {
                return current >= Object.values(newReleases).length - 1 ? 0 : current + direction;
            });
            resetInterval();
        }, 250);
    };

    useEffect(() => {
        if (!newReleases) return;

        timerAnimation.current = gsap.timeline()
            .set([timerRef.current], { width: 0 })
            .to([timerRef.current], { width: "0%", duration: 0.1, ease: "linear" })
            .to([timerRef.current], { width: "100%", duration: 5, ease: "linear" });


        intervalRef.current = setInterval(() => {
            changeCurrent(1);
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, [newReleases]);

    useEffect(() => {
        try {
            const fetchAndExtractColors = async () => {
                const response = await fetch(newReleases[current].image, { mode: 'cors' });
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
        
                const extractedColors = await extractColors(imageUrl);
                URL.revokeObjectURL(imageUrl);
                setColor(extractedColors.sort((a, b) => b.area - a.area)[0].hex);
            };
            fetchAndExtractColors();
        } catch (error) {}
      }, [current]);

    return (
        // <TransitionGroup>
        //     <CSSTransition
        //         key={newReleases ? 'loaded' : 'loading'}
        //         timeout={300}
        //         classNames="fade"
        //     >
        <Wrapper>
        <Subheader>NEW RELEASES</Subheader>
        {newReleases ?
            <Container
                onMouseEnter={() => {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    if (timerAnimation.current) timerAnimation.current.pause();
                }}
                onMouseLeave={() => {
                    resetInterval();
                    if (timerAnimation.current) timerAnimation.current.restart();
                }}
            >
                {/* <ArrowBack onClick={() => changeCurrent(-1)} /> */}
                <ArrowNext onClick={() => changeCurrent(1)} />
                <Background ref={backgroundRef} src={newReleases[current].image} />
                <DataWrapper ref={dataWrapperRef}>
                    <Title>{newReleases[current].name}</Title>
                    <Row>
                        <ArtistImage src={newReleases[current].artistImage} />
                        <ArtistName>{newReleases[current].artist}</ArtistName>
                    </Row>
                    <Row>
                        <OpenAlbum onClick={goToAlbum}>Listen Now</OpenAlbum>
                    </Row>
                </DataWrapper>
                <Timer ref={timerRef}/>
            </Container>
        : <ContainerSkeleton />} 
    </Wrapper>



        //     </CSSTransition>
        // </TransitionGroup>
    );
}

export default NewReleases;
