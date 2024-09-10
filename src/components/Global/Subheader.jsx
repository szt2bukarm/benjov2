import { forwardRef } from "react";
import styled from "styled-components"

const Text = styled.p`
    font-size: 1.4rem;
    letter-spacing: 1px;
    font-weight: 400;
    color: #d3d3d3;
    /* width: max-content; */
    word-break: break-all;
    margin-bottom: 1rem;
`

const Subheader = forwardRef(({ children, className, onClick }, ref) => {
    return (
      <Text ref={ref} className={className} onClick={onClick}>
        {children}
      </Text>
    );
  });

export default Subheader
