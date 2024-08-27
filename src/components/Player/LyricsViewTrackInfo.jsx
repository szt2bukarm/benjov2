import styled from "styled-components"
import useStore from "../../store"
import { useLocation, useNavigate } from "react-router-dom"

const Wrapper = styled.div`
    position: absolute;
    display: flex;
    gap: 1rem;
    top: -10rem;
    width: 60rem;
    height: 5rem;
`

const Image = styled.img`
    width: 5rem;
    height: 5rem;
`

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: .2rem;
`

const Title = styled.p`
    font-size: 1.8rem;
    color: white;
    font-weight: 600;

    &:hover {
        cursor: pointer;
        color: #cecece;
        text-decoration: underline;
    }
`

const Artist = styled.p`
    font-size: 1.4rem;
    color: #b7b7b7;
    font-weight: 400;

    &:hover {
        cursor: pointer;
        color: #cecece;
        text-decoration: underline;
    }
`

function LyricsViewTrackInfo() {
    const { Music: {image, artist, title,albumID,artistID} } = useStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClickAlbum = () => {
        if (location.pathname == "/album/" + albumID) return;
        navigate("album/" + albumID);
    }

    const handleClickArtist = () => {
        if (location.pathname == "/artist/" + artist) return;
        navigate("artist/" + artistID);
    }

    return (
        <Wrapper>
            <Image src={image} />
            <InfoWrapper>
                <Title onClick={handleClickAlbum}>{title}</Title>
                <Artist onClick={handleClickArtist}>{artist}</Artist>
            </InfoWrapper>
        </Wrapper>
    )
}

export default LyricsViewTrackInfo
