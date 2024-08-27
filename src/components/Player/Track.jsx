import styled from "styled-components";
import useMusicFetcher from "../../services/musicFetcher";
import useStore from "../../store";
import { useEffect } from "react";
import useRecommendationFetcher from "../../services/recommendationFetcher";
import useLyricsFetcher from "../../services/lyricsFetcher";
import { FaRegHeart,FaHeart } from "react-icons/fa";


const Wrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: #222222;

  &:hover {
    background-color: #333333;
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
`;

const Title = styled.p`
  font-size: 1.6rem;
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
  font-size: 1rem;
  color: #c6c6c6;
`;

const Duration = styled.p`
  font-size: 1.4rem;
  color: #c6c6c6;
  margin-left: auto;
`;

const Like = styled.div`
  margin-left: auto;
  font-size: 1.8rem;
  color: #fff;
  cursor: pointer;
`

function Track({ image, artist, title, duration, album, sID }) {
  const { Music: { setSpotifyID,spotifyID, setArtist, setTitle, setDuration, setAlbum, setImage }, Lyrics: {setLyrics}, Player: {setLyricsScrolled}, Tracklist: {setTracks} } = useStore();
  const { fetchMusicData } = useMusicFetcher();
  const { fetchRecommendationData } = useRecommendationFetcher();
  const { fetchLyricsData } = useLyricsFetcher();

  const handleClick = () => {
    console.log("click");
    if (spotifyID == sID) return;

    setImage(image);
    setArtist(artist.length > 1 ? artist[0].name : artist.name);
    setTitle(title);
    setDuration(duration);
    setAlbum(album);
    setSpotifyID(sID)
    setLyrics(null)
    setLyricsScrolled(false)
    setTracks(null)
    fetchMusicData(
      album,
      artist.length > 1 ? artist[0].name : artist.name,
      title,
      duration
    );
    fetchLyricsData(album, artist.length > 1 ? artist[0].name : artist.name, title, duration);

    fetchRecommendationData(sID);
  };

  return (
    <Wrapper onClick={handleClick}>
      <Image crossOrigin="anonymous" src={image} />
      <InfoWrapper>
        <Title style={{color: sID == spotifyID ? 'gray' : "white"}}>{title}</Title>
        <ArtistWrapper>
          {artist.length > 1 ? (
            artist.map((artist) => {
              return <Artist>{artist.name}</Artist>;
            })
          ) : (
            <Artist>{artist.name}</Artist>
          )}
        </ArtistWrapper>
      </InfoWrapper>
      <Like><FaHeart /></Like>
      <Duration>{new Date(duration).toISOString().slice(14, 19)}</Duration>
    </Wrapper>
  );
}

export default Track;
