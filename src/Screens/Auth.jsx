import styled from "styled-components"
import Register from "../components/Auth/Register"
import Login from '../components/Auth/Login'
import useStore from "../store"

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

    &:hover {
        text-decoration: underline;
        color: #fff;
    }
`

function Auth() {
    const {Auth: {showLogin,setShowLogin,setError}} = useStore();

    return (
        <Wrapper>
            {showLogin ? <Login /> : <Register />}
          <ChangeView    onClick={() => {
            setShowLogin(!showLogin)
            setError(null)
            }}>SWITCH TO {showLogin ? "REGISTER" : "LOGIN"}</ChangeView>
        </Wrapper>
    )
}

export default Auth
