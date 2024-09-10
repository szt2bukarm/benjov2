import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FaUserAlt, FaKey, FaSpotify } from "react-icons/fa";
import LoaderInline from "../Player/LoaderInline";
import useAuthFetcher from "../../services/AuthFetcher";
import useStore from "../../store";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 40rem;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 1.6rem;
  font-weight: 300;
  margin-bottom: 2rem;
  color: #c3c3c3;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: underline;
`


function AccessGuide() {
  return <Wrapper>
      <Text>1. visit <Link href="https://developer.spotify.com/" target="_blank">https://developer.spotify.com/</Link></Text>
      <Text>2. Click on the "Log in" button on the upper right corner and sign in with your spotify account.</Text>
      <Text>3. After signing in, access the dashboard from your profile tab (located at the same place as the login button before)</Text>
      <Text>4. Click on the purple "Create App" button on the right side.</Text>
      <Text>5. Enter a name, a description and a URL. It can be anything as it is meaningless.</Text>
      <Text>6. After creating your app, click on the "settings" button located on the right side, and there you will be able to find you client ID and client Secret.</Text>
      <Text>Benjo offers more freedom and functionality for signed in users, so it is recommended to complete these steps to aquire private access.</Text>
  </Wrapper>
}

export default AccessGuide;
