import styled from "styled-components"
import useStore from "../store"
import Loader from "../components/Player/Loader";
import RecentTracks from "../components/RecentlyPlayed/RecentTracks";
import useRecentlyPlayedFetcher from "../services/RecentlyPlayedFetcher";
import { useEffect } from "react";
import RecentAlbums from "../components/RecentlyPlayed/RecentAlbums";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    /* padding-inline: 3rem; */
    /* height: 100%; */
`

function RecentlyPlayed() {
    const {RecentlyPlayed: {loading,changed}} = useStore();
    const {fetchRecentlyPlayed} = useRecentlyPlayedFetcher();

    useEffect(() => {
        fetchRecentlyPlayed()
    }, [changed]);

    return (
        <Wrapper>
            {loading ? <Loader /> : (
                <div style={{paddingInline: "3rem"}}>
                    <RecentTracks />
                    <RecentAlbums />
                </div>
            )}
        </Wrapper>
    )
}

export default RecentlyPlayed
