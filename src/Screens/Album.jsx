import { useParams } from "react-router-dom";
import useMusicFetcher from "../services/musicFetcher";
import { useEffect } from "react";
import styled from "styled-components";
import AlbumHeader from "../components/Album/AlbumHeader";
import useStore from "../store";
import AlbumTracks from "../components/Album/AlbumTracks";
import Loader from "../components/Player/Loader";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import '../transitions.css'

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    /* height: 50vh; */
`




function Album() {
    const {id} = useParams();
    const {fetchAlbumData} = useMusicFetcher();
    const {Album: {data,albumLoading,setAlbumData,setAlbumTracks}} = useStore();

    useEffect(() => {
        if (data?.id == id) return;
            setAlbumData(null);
            fetchAlbumData(id);
    }, [id])

    return (
        <TransitionGroup>
            <CSSTransition key={albumLoading ? 'albumLoading' : 'album'} timeout={100} classNames="fade">
                <Wrapper>
                    {!albumLoading ? 
                        <div>
                            <AlbumHeader/>
                            <AlbumTracks/>
                        </div> : <Loader />
                    }
                </Wrapper>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default Album
