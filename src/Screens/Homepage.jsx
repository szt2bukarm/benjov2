import styled from "styled-components"
import NewReleases from "../components/Homepage/NewReleases"
import TopTracks from "../components/Homepage/TopTracks"
import { useEffect, useState } from "react"
import { extractColors } from "extract-colors"
import useStore from "../store"

const Wrapper = styled.div`
    position: relative;
    background-color: #0b090a;
`

const BackgroundTint = styled.div`
    position: absolute;
    top: -12rem;
    left: 0;
    width: 100%;
    height: 80rem;
    z-index: 0;    
    transition: all 200ms;
`

const BackgroundTintShadow = styled.div`
    position: absolute;
    top: -12rem;
    left: 0;
    width: 100%;
    height: 80rem;
    background: linear-gradient(rgba(0, 0, 0, 0.752), #0b090a);
    z-index: 2;
`


function Homepage() {
    const {NewReleases: {color}} = useStore();


    return (
        <Wrapper>
            <BackgroundTint style={{backgroundColor: color ? color : 'black'}}/>
            <BackgroundTintShadow />
            <NewReleases />
            <TopTracks />
        </Wrapper>
    )
}

export default Homepage
