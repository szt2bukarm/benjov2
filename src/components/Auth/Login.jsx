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

const LoaderWrapper = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`

const Warn = styled.p`
  font-size: 1.4rem;
  color: #ff4d4d;
`;

const Column = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { Auth: {error,loading,setError}} = useStore();
  const { loginUser } = useAuthFetcher();

  useEffect(() => {
      localStorage.clear();
      setError(null)
  },[])

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <Wrapper>
      <Name>Benjo</Name>
      <Title>LOGIN</Title>
      <Column onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper className="border">
          <InputIcon><FaUserAlt /></InputIcon>
          <Input 
            disabled={loading}
            {...register("username", { required: "Please enter a username" })} 
            placeholder="Username" 
          />
        </InputWrapper>
        {errors.username && <Warn>{errors.username.message}</Warn>}

        <InputWrapper className="border">
          <InputIcon><FaKey /></InputIcon>
          <Input 
            disabled={loading}
            {...register("password", { required: "Please enter a password" })} 
            type="password" 
            placeholder="Password" 
          />
        </InputWrapper>
        {errors.password && <Warn>{errors.password.message}</Warn>}

        {loading ? 
          <LoaderWrapper>
          <LoaderInline />
          </LoaderWrapper>
            : 
        <Button type="submit" className="border" disabled={loading}>LOGIN</Button>
        }

        {/* <Button type="submit" className="border" disabled={loading}></Button> */}
        {error && <Warn>{error}</Warn>}
      </Column>
    </Wrapper>
  );
}

export default Login;
