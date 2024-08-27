import styled from "styled-components"

const Wrapper = styled.button`
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background-color: transparent;
    cursor: pointer;

    &:hover > .text {
        opacity: 1;
    }

    &:disabled {
        cursor: not-allowed;
    }
`

const TextWrapper = styled.div`
    position: absolute;
    opacity: 0;
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
    /* width: 9rem; */
    white-space: nowrap;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #5f5f5f;
    border-radius: 1rem;
    pointer-events: none;
    transition: all .1s;
`

const Text = styled.p`
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
`

const Icon = styled.span`
    width: 100%;
    height: 100%;
    font-size: 2.4rem;
    color: #fff;
    font-weight: 600;
    transition: color .2s;
    z-index: 2;

    &:hover {
        color: #d4d4d4;
    }
`

function PlayerButton({text,children,onClick,disabled}) {
    return (
        <Wrapper disabled={disabled} onClick={onClick}>
            <Icon>{children}</Icon>
            {text && <TextWrapper className="text"><Text>{text}</Text></TextWrapper>}
        </Wrapper>
    )
}

export default PlayerButton
