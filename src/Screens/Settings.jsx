import styled from "styled-components"
import Subheader from "../components/Global/Subheader"
import { FaUserAlt, FaKey, FaSpotify } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useStore from "../store";
import useAuthFetcher from "../services/AuthFetcher";
import { useEffect } from "react";


const Wrapper = styled.div`
    padding-inline: 3rem;
`

const Description = styled.p`
    color: #fff;
    font-size: 1.8rem;
    width: 80%;
    margin-bottom: 3rem;
`


const InputWrapper = styled.div`
  position: relative;
  width: 25rem;
  height: 4rem;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  background-color: #0b090a;
  border: 0;
  color: #fff;
  padding-left: 4rem;
  padding-right: 1rem;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 1.6rem;
`;

const Row = styled.form`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Button = styled.button`
  width: 10rem;
  height: 4rem;
  background-color: #0b090a;
  border: 0;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 150ms;
  overflow: hidden;
  border-radius: .5rem;

  &:hover {
    background-color: #fff;
    color: #0b090a;
  }
`;

const Warn = styled.p`
  font-size: 1.4rem;
  color: #ff4d4d;
  margin-top: .5rem;
  /* margin-top: 0.5rem; */
`;


function Settings() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { Auth: {error,setError}} = useStore();
    const { updateAccess } = useAuthFetcher();
  
    useEffect(() => {
        setError(null)
    }, [])

    const onSubmit = (data) => {
        updateAccess(data);
      };

    return (
        <Wrapper>
            <Subheader>SETTINGS - SPOTIFY API ACCESS</Subheader>
            <Description>In case your Spotify access gets limited (ex: genres not loading, tracks aren't recommended) you can change your access details here. (the limitations usually get lifted after a day).</Description>
            <Row onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper className="border">
                <InputIcon><FaSpotify /></InputIcon>
                <Input 
                    {...register("clientID", { required: "Please enter a ID" })}
                    placeholder="Spotify Client ID" 
                />
                {errors.ID && <Warn>{errors.ID.message}</Warn>}
            </InputWrapper>
            <InputWrapper className="border">
                <InputIcon><FaSpotify /></InputIcon>
                <Input 
                    {...register("clientSecret", { required: "Please enter a secret" })}
                    placeholder="Spotify Client Secret" 
                />
                {errors.secret && <Warn>{errors.secret.message}</Warn>}
            </InputWrapper>
            <Button className="border">CHANGE</Button>
            </Row>
            {error && <Warn>{error}</Warn>}

        </Wrapper>
    )
}

export default Settings
