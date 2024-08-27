import styled from "styled-components"
import Loader from "../components/Player/Loader"
import useAuthFetcher from "../services/AuthFetcher"
import { useEffect } from "react"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:100%;
    height: 100vh;
    background-color: #000;
`

const Text = styled.p`
    color: #fff;
    font-size: 2rem;
    font-weight: 600;
    transform: translateY(80px);
`

function ApiStatus() {
    const {getStatus} = useAuthFetcher();

    useEffect(() => {
        getStatus()
    })

    return (
        <Wrapper>
            <Loader />
            <Text>Api is loading...</Text>  
        </Wrapper>
    )
}

export default ApiStatus
