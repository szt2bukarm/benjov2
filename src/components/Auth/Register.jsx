import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FaUserAlt, FaKey, FaSpotify } from "react-icons/fa";
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
  /* height: 60rem; */
`;

const Name = styled.p`
  font-size: 8.4rem;
  letter-spacing: -2px;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #fff;
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 300;
  margin-bottom: 2rem;
  color: #c3c3c3;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
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

const Button = styled.button`
  width: 100%;
  height: 4rem;
  background-color: #0b090a;
  border: 0;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 400;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 150ms;

  &:hover {
    background-color: #fff;
    color: #0b090a;
  }
`;

const Warn = styled.p`
  font-size: 1.4rem;
  color: #ff4d4d;
  /* margin-top: 0.5rem; */
`;

const Column = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Register() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const { Auth: {error}, User: {loggedIn}} = useStore();
  const { registerUser } = useAuthFetcher();

    useEffect(() => {
        localStorage.clear();
    },[])

  const onSubmit = (data) => {
    if (data.password !== data.password2) {
      setError("password2", {
        type: "manual",
        message: "Passwords don't match",
      });
      return;
    }

    registerUser(data);
  };

  return (
    <Wrapper>
      <Name>Benjo</Name>
      <Title>REGISTER</Title>
      <Column onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper className="border">
          <InputIcon><FaUserAlt /></InputIcon>
          <Input 
            {...register("username", { required: "Please enter a username" })} 
            placeholder="Username" 
          />
        </InputWrapper>
        {errors.username && <Warn>{errors.username.message}</Warn>}

        <InputWrapper className="border">
          <InputIcon><FaKey /></InputIcon>
          <Input 
            {...register("password", { required: "Please enter a password" })} 
            type="password" 
            placeholder="Password" 
          />
        </InputWrapper>
        {errors.password && <Warn>{errors.password.message}</Warn>}

        <InputWrapper className="border">
          <InputIcon><FaKey /></InputIcon>
          <Input 
            {...register("password2", { required: "Please confirm your password" })} 
            type="password" 
            placeholder="Password again" 
          />
        </InputWrapper>
        {errors.password2 && <Warn>{errors.password2.message}</Warn>}

        <InputWrapper className="border">
          <InputIcon><FaSpotify /></InputIcon>
          <Input 
            {...register("clientID", { required: "Please enter a Spotify Client ID" })} 
            placeholder="Spotify Client ID" 
          />
        </InputWrapper>
        {errors.clientID && <Warn>{errors.clientID.message}</Warn>}

        <InputWrapper className="border">
          <InputIcon><FaSpotify /></InputIcon>
          <Input 
            {...register("clientSecret", { required: "Please enter a Spotify Client Secret" })} 
            placeholder="Spotify Client Secret" 
          />
        </InputWrapper>
        {errors.clientSecret && <Warn>{errors.clientSecret.message}</Warn>}

        <Button type="submit" className="border">REGISTER</Button>
        {error && <Warn>{error}</Warn>}
      </Column>
    </Wrapper>
  );
}

export default Register;
