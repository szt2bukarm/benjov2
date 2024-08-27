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
    background-color: #161a1d;
    border-radius: .5rem;
    cursor: pointer;

    &:hover {
        background-color: #222a2d;
    }
`

const Image = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  margin-right: 1rem;
`;


const Name = styled.p`
  font-size: 1.8rem;
  color: #fff;
`;


const Artist = ({ index, id, image, name }) => {
    const navigate = useNavigate();
    const {Search: {setSearchOpen}} = useStore();

    const onClick = () => {
        setSearchOpen(false);
        navigate(`/artist/${id}`);
        window.scrollTo(0, 0);
    }
    
    return (
      <Wrapper key={index} onClick={onClick}>
        <Image src={image} />
        <Name>{name}</Name>
      </Wrapper>
    );
  };
  

export default Artist
