import styled from "styled-components";


const LoaderWrapper = styled.div`
  position: absolute;
  /* top: 50%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%);  */
  display: flex;
  width:100%;
  height:calc(100vh - 25rem);
  align-items: center;
  justify-content: center;
`

const Spinner = styled.div`
  width: 80px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side,#ffffff 94%,#0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%,#ffffff);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 10px),#000 0);
  animation: l13 .5s infinite linear;

  @keyframes l13{ 
    100%{transform: rotate(1turn)}
  }
`

function Loader() {
    return (
        <LoaderWrapper>
            <Spinner />
        </LoaderWrapper>
    )
}

export default Loader
