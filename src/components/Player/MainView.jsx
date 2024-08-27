import styled from "styled-components"
import useStore from "../../store";
import { useLocation, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
`

const Image = styled.img`
    max-width: 45rem;
    padding: .5rem;
    border-radius: 1.5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    margin-bottom: 1rem;

    @media (max-height: 700px) {
        max-width: 35rem;
    }
`

const Title = styled.p`
    /* width: 50rem ; */
    font-size: 2.8rem;
    text-align: center;
    font-weight: 600;
    color: #fff;
    margin-bottom: .4rem;
    cursor: pointer;

    &:hover {
        color: #b7b7b7;
        text-decoration: underline;
    }
`

const Artist = styled.p`
    font-size: 1.6rem;
    font-weight: 300;
    color: #d4d4d4;
    margin-bottom: 1.2rem;
    cursor: pointer;

    &:hover {
        color: #b7b7b7;
        text-decoration: underline;
    }
`

const NoTrack = styled.p`
    font-size: 2.4rem;
    font-weight: 500;
    color: #d4d4d4;
`

function MainView() {
    const {Music: {image,artist,title,albumID,artistID,musicID}} = useStore();
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
            <Title onClick={handleClickAlbum}>{title}</Title>
            <Artist onClick={handleClickArtist}>{artist}</Artist>
            {(!image && !artist && !title) && <NoTrack>NO TRACK PLAYING</NoTrack>}
        </Wrapper>
    )
}

export default MainView
