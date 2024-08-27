import styled from "styled-components"
import Subheader from "../Global/Subheader"
import useStore from "../../store"
import Track from "../Global/Track";
import useMusicFetcher from "../../services/musicFetcher";
import useLyricsFetcher from "../../services/lyricsFetcher";
import { useState } from "react";

const Wrapper = styled.div`
    position: relative;
    padding-inline: 3rem;
    margin-top: -20rem;
    margin-bottom: 5rem;
    z-index: 2;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const ShowMore = styled(Subheader)`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
        color: white;

    }    
`

function ArtistTopTracks() {
    const [expanded,setExpanded] = useState(false);
    const {Artist: {toptracks}} = useStore();

    return (
        <Wrapper>
            <Subheader>{toptracks && "TOP TRACKS"}</Subheader>
            <Column>
            {toptracks && toptracks.slice(0,expanded ? toptracks.length : 5).map((track, index) => {
                return <Track key={track?.trackID} index={index}
                image={track?.image} id={track?.trackID} title={track?.trackName} artists={track?.artists} duration={track?.duration} albumID={track?.albumID} albumName={track?.albumName} artistID={track?.artists.length > 1 ? track?.artists[0].id : track?.artists.id} trackToSet={toptracks}/>
            })}
            <ShowMore onClick={() => setExpanded(!expanded)}>{expanded && toptracks ? "Show Less" : "Show More"}</ShowMore>
            </Column>
        </Wrapper>
    )       
}

export default ArtistTopTracks
