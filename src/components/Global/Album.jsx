import styled from "styled-components";
import NowPlayingIndicator from "../Player/NowPlayingIndicator";
import useStore from "../../store";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    width: 100%;
    /* height: 7rem; */
    background-color: #161a1d;
    border-radius: .5rem;
    /* margin-block: 1rem; */
    cursor: pointer;

    &:hover {
        background-color: #222a2d;
    }
`

const Image = styled.img`
  width: 5rem;
  height: 5rem;
  margin-right: 1rem;
`;

const Title = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 600;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArtistWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Artist = styled.p`
  font-size: 1.2rem;
  color: #c6c6c6;
`;


const Album = forwardRef(({ index, image, id, name, artists }, ref) => {
  const { Music: { spotifyID },Search: {setSearchOpen} } = useStore();
  const navigate = useNavigate();

  const onClick = () => {
    setSearchOpen(false);
    navigate(`/album/${id}`);
    window.scrollTo(0, 0);
  }

  return (
    <Wrapper key={index} onClick={onClick} ref={ref}>
      <Image src={image} />
      {id === spotifyID && <NowPlayingIndicator />}
      <InfoWrapper style={{ marginLeft: id === spotifyID ? "1rem" : "0" }}>
        <Title>{name}</Title>
        <ArtistWrapper>
          {artists.length > 1 ? (
            artists.map((artist, artistIndex) => (
              <Artist key={artistIndex}>{artist.name}</Artist>
            ))
          ) : (
            <Artist>{artists.name}</Artist>
          )}
        </ArtistWrapper>
      </InfoWrapper>
    </Wrapper>
  );
});


export default Album
