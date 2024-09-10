import styled from "styled-components";
import NowPlayingIndicator from "../Player/NowPlayingIndicator";
import useStore from "../../store";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import useFavoritesFetcher from "../../services/favoritesFetcher";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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

const Like = styled.div`
  margin-left: auto;
  position: relative;
  margin-right: 1rem;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  transform: translateY(2px);

  &:hover {
    color: #c6c6c6;
  }

  &:hover .text {
    opacity: 1;
  }
`

const TextWrapper = styled.div`
    position: absolute;
    opacity: 0;
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
    /* width: 9rem; */
    white-space: nowrap;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #5f5f5f;
    border-radius: 1rem;
    pointer-events: none;
    transition: all .1s;
`

const Text = styled.p`
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
`


const Album = forwardRef(({ index, image, id, name, artists }, ref) => {
  const { Music: { spotifyID },Search: {setSearchOpen},Favorites:{albumIDs,setChangedAlbums},User: {guest} } = useStore();
  const { addFavoriteAlbum } = useFavoritesFetcher();
  const navigate = useNavigate();

  const onClick = () => {
    setSearchOpen(false);
    navigate(`/album/${id}`);
    window.scrollTo(0, 0);
  }

  const handleFavorite = (e,id) => {
    e.stopPropagation();
    setChangedAlbums(true);
    addFavoriteAlbum(id);
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
      {!guest &&       <Like onClick={(e) => {handleFavorite(e,id)}}>
            {albumIDs.includes(id) ? <FaHeart /> : <FaRegHeart />}
            <TextWrapper className="text"><Text>{albumIDs.includes(id) ? "Remove From Favorites" : "Add To Favorites"}</Text></TextWrapper>
        </Like>
}
      </Wrapper>
  );
});


export default Album
