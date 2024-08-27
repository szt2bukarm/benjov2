import styled from 'styled-components'
import TrackList from './components/Player/TrackList'
import PlayerWrapper from './components/Player/PlayerWrapper'
import Homepage from './Screens/Homepage'
import AppWrapper from './Screens/AppWrapper'
import { BrowserRouter } from 'react-router-dom'
import useStore from './store'
import Auth from './Screens/Auth'
import { useEffect } from 'react'
import ApiStatus from './Screens/ApiStatus'

const removePreloader = () => {
  const preloader = document.querySelector('.preloader');
  console.log(preloader);
  if (preloader) {
      preloader.remove();
  }
};

const Wrapper = styled.div`
  background-color: #0b090a;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 700px;

  @media (max-width: 1200px) {
    opacity: 0;
  }
`

const SizeOutOfRange = styled.div`
  display: none;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: #fff;
  font-size: 3rem;
  padding: 3rem;
  text-align: cen;

  @media (max-width: 1200px) {
    display: flex;
  }
`

function App() {
  const {User: {loggedIn}, APICheck: {status}} = useStore();

  useEffect(() => {
    removePreloader();
  }, [])

  return (<>
    {status ? loggedIn ? 
    <BrowserRouter>
    <SizeOutOfRange>
      Benjo requires a minimum screen width of 1200px
    </SizeOutOfRange>
    <Wrapper>
      <AppWrapper/>
      <PlayerWrapper/>
    </Wrapper>
    </BrowserRouter>
  : <Auth/> : <ApiStatus />}
  </>)
}

export default App
