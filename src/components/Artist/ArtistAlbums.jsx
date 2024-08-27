import styled from "styled-components"
import useStore from "../../store"
import Subheader from "../Global/Subheader";
import Album from "../Global/Album";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    position: relative;
    padding-inline: 3rem;
    /* margin-top: -20rem; */
    z-index: 2;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 5rem;
`

function ArtistAlbums() {
    const {Artist: {albums}} = useStore();

    return (
        <Wrapper>
            {(albums && albums.filter(album => album.type == "album").length > 0) &&
            <Subheader>ALBUMS</Subheader>
            }
            <Column>
            {albums && albums.filter((album) => album.type == "album").map((album) => {
                return <Album key={album.id} index={album.id} image={album.image} id={album.albumID} name={album.albumName} artists={album.artists} />
            })}
            </Column>

            {(albums && albums.filter(album => album.type == "single").length > 0) &&
            <Subheader>SINGLES & EPs</Subheader>
            }
            <Column>
            {albums && albums.filter((album) => album.type == "single").map((album) => {
                return <Album key={album.id} index={album.id} image={album.image} id={album.albumID} name={album.albumName} artists={album.artists} />
            })}
            </Column>
        </Wrapper>
    )
}

export default ArtistAlbums
