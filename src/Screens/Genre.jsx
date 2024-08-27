import styled from "styled-components"
import Genres from "../components/Genre/Genres"
import GenreTracks from "../components/Genre/GenreTracks"
import { useState } from "react"
import useStore from "../store"
import { TransitionGroup,CSSTransition } from "react-transition-group"
import '../transitions.css'

const Wrapper = styled.div`
    position: relative;
    width: 100%;
`

function Genre() {
    const {Genres: {tracksOpen}} = useStore();

    return (
        <TransitionGroup>
            <CSSTransition
                key={tracksOpen ? "tracksOpen" : "tracks"}
                timeout={300}
                classNames="fade"
            >
                <Wrapper>
                    {tracksOpen ? <GenreTracks /> : <Genres />}
                </Wrapper>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default Genre
