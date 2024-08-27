import styled from "styled-components"
import useCorrectionFetcher from "../../services/correctionFetcher"
import useStore from "../../store"
import { useEffect, useState } from "react"
import Loader from "./Loader"

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    height: 100vh;
`

const Title = styled.p`
    color: #fff;
    font-size: 3.2rem;
`

const Description = styled.p`
    color: #fff;
    font-size: 1.8rem;
    width: 80%;

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
    width: 40rem;
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

const Or = styled.div`
    position: relative;
    width: 100%;
    border-bottom: 1px solid #dddddd30;
    margin-block: 2rem;
`

const OrText = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ddd;
    font-size: 1.6rem;
`

const RemoveRequest = styled.button`
    height: 3.9rem;
    background-color: #ddd;
    color: #000;
    border-radius: 1rem;
    width: 17rem;
    border: none;
    outline: none;
    transition: all 150ms;
    cursor: pointer;

    &:hover {
        background-color: #000;
        color: #ddd;
    }
`

function CorrectTrack() {
    const { correctTrack, reindexTrack } = useCorrectionFetcher();
    const { TrackCorrection: {loading, message,setMessage}, Music: {album,artist,title,duration}} = useStore();
    const [id,setId] = useState("");
    
    useEffect(() => {
        return () => setMessage("")
    }, [])
    return (
        <Wrapper>
            {loading ? <Loader /> : <>
                <Title>Track correction</Title>
                <Description>In case you suspect that a track is incorrectly indexed, please provide a correct YouTube ID. The ID can be found in YouTube links like "https://www.youtube.com/watch?v=<span style={{color: "red"}}>ID</span>", from which the highlighted part is needed.</Description>
                <InputWrapper>
                <Input type="text" placeholder="YouTube ID (ex: bddaaJOJDSw)" onChange={(e) => setId(e.target.value)} value={id}/>
                {id && <Submit onClick={() => correctTrack(id,title,artist,duration)}>SUBMIT</Submit>}
                </InputWrapper>
                <Description>{message}</Description>
                <Or><OrText>OR</OrText></Or>
                <RemoveRequest onClick={() => reindexTrack(album,title,artist,duration)}>REQUEST RE-INDEXING</RemoveRequest>
            </>
            }
        </Wrapper> 
    )
}

export default CorrectTrack
