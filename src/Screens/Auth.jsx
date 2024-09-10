import styled from "styled-components"
import Register from "../components/Auth/Register"
import Login from '../components/Auth/Login'
import useStore from "../store"
import AccessGuide from "../components/Auth/AccessGuide"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #000;
`

const ChangeView = styled.p`
    font-size: 1.6rem;
    color: #c6c6c6;
    font-weight: 400;
    cursor: pointer;
    margin-bottom: 1rem;

    &:hover {
        text-decoration: underline;
        color: #fff;
    }
`

const Or = styled.div`
    position: relative;
    width: 50rem;
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
    background-color: #000;
    padding-inline: 1rem;
`

function Auth() {
    const {Auth: {showLogin,setShowLogin,setError,setGuide,showGuide},User: {setLoggedIn,setGuest}} = useStore();

    const handleGuestLogin = () => {
        localStorage.setItem("token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGYxZjAyOWQyMDBmMzJjYjM0YTFhNiIsImlhdCI6MTcyNTg5ODQ5OSwiZXhwIjoyNTg5ODEyMDk5fQ.M3tenA1zDHst90kqQqYEQ0vBfn3gdt10OHrTMuKzr1g');

        setTimeout(() => {
            setLoggedIn(true);
            setGuest(true);
        }, 1);
    }

    return (
        <Wrapper>
            {showGuide ? <AccessGuide /> : <>
            {showLogin ? <Login /> : <Register />}
            <ChangeView    onClick={() => {
              setShowLogin(!showLogin)
              setError(null)
            }}>SWITCH TO {showLogin ? "REGISTER" : "LOGIN"}</ChangeView>
            </>
            }
            <ChangeView onClick={() => setGuide(!showGuide)}>{showGuide ? "HIDE GUIDE" : "HOW TO GET SPOTIFY ACCESS"}</ChangeView>
        <Or>
            <OrText>OR</OrText>
        </Or>
            <ChangeView onClick={handleGuestLogin}>CONTINUE AS GUEST</ChangeView>
        </Wrapper>
    )
}

export default Auth
