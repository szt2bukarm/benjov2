import styled from "styled-components"
import '../Global/Navbar.css'
import Subheader from "../Global/Subheader"
import { useState } from "react"
import usePlaylistFetcher from "../../services/PlaylistFetcher"
import useStore from "../../store"
import Loader from "../Player/Loader"

const Wrapper = styled.div`
    position: absolute;
    top: 4rem;
    right: 0;
    width: 40rem;
    height: 13rem;
    padding: 1.5rem;
    background-color: #161a1d;
    box-shadow: 0 0 1rem rgba(0, 0, 0);
`

const Text = styled.p`
    font-size: 1.6rem;
    color: #fff;
    margin-bottom: 1rem;
`

const InputWrapper = styled.div`
    position: relative;
`

const Input = styled.input`
    font-size: 1.6rem;
    padding: 1rem;
    padding-right: 9rem;
    border-radius: 1rem;
    border: none;
    outline: none;
    background-color: #ddd;
    width: 100%;
    height: 4rem;
`

const Submit = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: .1rem;
    height: 3.9rem;
    background-color: #000;
    color: #fff;
    border-radius: 1rem;
    width: 8rem;
    transition: all 150ms;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
        color: #000;
    }
`



function CreatePlaylist() {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const { createPlaylist } = usePlaylistFetcher();
    const {Playlists: {setShowCreatePlaylist, showCreatePlaylist}} = useStore();

    return (
        <Wrapper className="border">
            <Subheader>CREATE PLAYLIST</Subheader>
            <Text>Create a playlist on Benjo:</Text>
            <InputWrapper>
                <Input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Playlist name" />
                {name && <Submit onClick={() => {createPlaylist(name);setShowCreatePlaylist(false)}}>CREATE</Submit>}
            </InputWrapper>
        </Wrapper>
    )
}

export default CreatePlaylist
