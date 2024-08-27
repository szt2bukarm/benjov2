import { useParams } from "react-router-dom";
import useMusicFetcher from "../services/musicFetcher";
import { useEffect } from "react";
import styled from "styled-components";
import useStore from "../store";
import Loader from "../components/Player/Loader";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import '../transitions.css'
import ArtistHeader from "../components/Artist/ArtistHeader";
import ArtistTopTracks from "../components/Artist/ArtistTopTracks";
import ArtistAlbums from "../components/Artist/ArtistAlbums";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    /* height: 50vh; */
`




function Artist() {
    const {id} = useParams();
    const {fetchArtistData} = useMusicFetcher();
    const {Artist: {setArtistData,setArtistTopTracks,setArtistAlbums,data,toptracks,albums,setLoading,loading}} = useStore();

    useEffect(() => {
        if (data?.id == id) return;
        setArtistData(null);
        setArtistTopTracks(null);
        setArtistAlbums(null);
        fetchArtistData(id);
    }, [id])

    return (
        <TransitionGroup>
            <CSSTransition key={loading ? 'loading' : 'artist'} timeout={100} classNames="fade">
                <Wrapper>
                    {!loading ? 
                        <>
                            <ArtistHeader />
                            <ArtistTopTracks />
                            <ArtistAlbums />
                        </> 
                        : <Loader />
                    }
                </Wrapper>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default Artist
