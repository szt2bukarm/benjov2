import { useEffect, useState } from "react";
import styled from "styled-components";
import Track from "./Track";
import useSearchFetcher from "../../services/searchFetcher";
import useStore from "../../store";

const Wrapper = styled.div`
  background-color: #1f1f1f;
  width: 100%;
  height: 100vh;
  padding: 1rem;
  overflow-y: scroll;
`;

function TrackList() {
  const [tracks, setTracks] = useState([]);
  const { fetchSearchData } = useSearchFetcher();
  const { Search: {searchTrack} } = useStore();

  const handleSearch = (e) => {
    fetchSearchData("track", e.target.value);
    console.log(searchTrack);
  };


  return (
    <Wrapper>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e);
          }
        }}
      />
      {searchTrack &&
        searchTrack.map((track) => {
          return (
            <Track
              key={track.id}
              sID={track.id}
              image={track.image}
              artist={track.artists}
              title={track.trackName}
              album={track.albumName}
              duration={track.duration}
            />
          );
        })}
    </Wrapper>
  );
}

export default TrackList;
