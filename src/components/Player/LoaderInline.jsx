import styled from "styled-components";


const Spinner = styled.div`
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side,#ffffff 94%,#0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%,#ffffff);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 3px),#000 0);
  animation: l13 .5s infinite linear;

  @keyframes l13{ 
    100%{transform: rotate(1turn)}
  }
`

function LoaderInline() {
    return (
        <Spinner />
    )
}

export default LoaderInline
