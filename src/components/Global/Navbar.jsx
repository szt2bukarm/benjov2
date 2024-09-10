import styled from "styled-components"
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import Search from "./Search";
import '../Global/Navbar.css'
import { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import useSearchFetcher from "../../services/searchFetcher";
import useStore from "../../store";

const Wrapper = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    width: 100%;
    height: 11rem;
    padding: 3.5rem 2.8rem;
    z-index: 5;
    transition: all 0.2s;
    background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`

const SearchWrapper = styled.div`
    width: 100%;
    height: 4rem;
    position: relative;
    border-radius: .5rem;
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: 0;
    background-color: #161a1d;
    border-radius: .5rem;
    padding: 1rem;
    padding-left: 3.5rem;
    color: #d3d3d3;
`

const SearchIcon = styled(FaSearch)`
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    color: #f5f3f4;
    font-size: 1.6rem;
`


const SignUp = styled.button`
    position: relative;
    width: 8rem;
    height: 4rem;
    background-color: #161a1d;
    border: 0;
    color: #fff;
    border-radius: .5rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 100ms;

    &:hover .ball, &:focus .ball {
        top: -3rem;
        left: 50%;
        transform: translateX(-50%);
    }
`

const SignUpBall = styled.div`
    background-color: #fff;
    position: absolute;
    top: -11rem;
    left: 0;
    transform: translateX(-50%);
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    mix-blend-mode: difference;
    transition: all 250ms;
`

const SidebarButton = styled.button`
    display: none;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background-color: #161a1d;
    border: 0;
    color: #fff;
    border-radius: .5rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 100ms;

    @media (max-width: 1500px) {
        display: flex;
    }

    &:hover {
        background-color: #fff;
        color: #000;
    }
`

function Navbar() {
    const [searchQuery,setSearchQuery] = useState("");
    const {Search: {searchOpen,setSearchOpen}, Sidebar: {setShowSidebar,showSidebar}} = useStore();
    const {fetchSearchData} = useSearchFetcher();

    const handleSearch = (e) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);
        setSearchOpen(newQuery.length > 0);
        fetchSearchData(newQuery);
    }
    
    const handleSidebarClick = () => {
        setShowSidebar(!showSidebar);
        setSearchOpen(false);
    }

    return (
        <Wrapper>
            <SidebarButton className="border" onClick={handleSidebarClick}>{showSidebar ? <IoClose /> : <GiHamburgerMenu /> }</SidebarButton>
            <SearchWrapper className="border">
                <SearchInput onChange={(e) => handleSearch(e)} value={searchQuery} onClick={() => {searchQuery.length > 0 ? setSearchOpen(true) : setSearchOpen(false); setShowSidebar(false)}} placeholder="Type here to search"/>
                <SearchIcon />
                <TransitionGroup>
                <CSSTransition key={searchOpen} timeout={80} classNames="fade">
                    {searchOpen ? <Search /> : <></>}
                </CSSTransition>
                </TransitionGroup>
            </SearchWrapper>
            {/* <SignUp className="border signup" style={{width: searchOpen ? "0" : "10rem",opacity: searchOpen ? "0" : "1"}}>
                <SignUpBall className="ball"/>
                <p>Sign Up</p>
            </SignUp> */}
        </Wrapper>
    )
}

export default Navbar
