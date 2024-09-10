import styled from "styled-components"
import { NavLink } from "react-router-dom";
import { MdExplore,MdShowChart } from "react-icons/md";
import { PiMusicNoteFill } from "react-icons/pi";
import { BiSolidPlaylist } from "react-icons/bi";
import { TiHeartFullOutline } from "react-icons/ti";
import { IoMdAlbums } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { IoCog,IoTime } from "react-icons/io5";
import Subheader from "./Subheader";
import useStore from "../../store";
import useAuthFetcher from "../../services/AuthFetcher";
import LoaderInline from '../Player/LoaderInline'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #161a1d;
    height: 100vh;
    width: 25rem;
    padding: 3.5rem;
    overflow-y: scroll;
    z-index: 8;
    transition: 150ms;

    @media (max-width: 1500px) {
        position: absolute;
        left: -100%;
    }
`

const Logo = styled.p`
    font-size: 3.4rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 3.4rem;
`


const MenuItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;
`

const MenuItemIcon = styled.span`
    font-size: 2rem;
    width: 2rem;
    height: 2rem;
    color: #fff;
`

const MenuItem = styled(NavLink)`
    position: relative;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-block: 1rem;
    cursor: pointer;
    text-decoration: none;
    overflow: visible;
    

    &:hover .menu-item {
        color: #d3d3d3 !important;
    }

    &.active .highlight {
        opacity: .1;
        width: 25rem;
    }
`

const Highlight = styled.div`
    position: absolute;
    top: 0;
    left: -3.5rem;
    width: 0;
    height: 200%;
    transform: translateY(-25%);
    background: linear-gradient(90deg,#fff 0, transparent 100%);
    opacity: 0;
    transition: all 200ms;
    z-index: 99;
`

const MenuItemText = styled.p`
    font-size: 1.8rem;
    font-weight: 300;
    color: #fff;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
`

const Account = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3rem;
    margin-bottom: 2rem;
`

const Username = styled.p`
    font-size: 1.6rem;
    font-weight: 300;
    color: #fff;
`

const SignOut = styled(FaSignOutAlt)`
    font-size: 2.4rem;
    color: #fff;
    cursor: pointer;

    &:hover {
        color: #d3d3d3;
    }
`

const SubheaderNoSpacing = styled(Subheader)`
    margin-bottom: 0;
`

const IndexingWrapper = styled.div`
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 1rem;
`

const IndexingText = styled.p`
    font-size: 1.6rem;
    font-weight: 300;
    color: #fff;
`

function Sidebar() {
    const {User: {username},Music:{searching}, Sidebar: {showSidebar,setShowSidebar},Search: {setSearchOpen},User: {guest}} = useStore();
    const { signOutUser } = useAuthFetcher();

    const handleLogOut = () => {
        signOutUser();
    }

    const handleClick = () => {
        setSearchOpen(false);
        setShowSidebar(false);
    }

    return (
        <Wrapper style={{left: showSidebar ? 0 : '-100%'}} onClick={() => {setSearchOpen(false)}}>
            <Logo>Benjo</Logo>
            <Subheader>MENU</Subheader>
            {/* <Scrollable> */}
            <MenuItemWrapper>
                <MenuItem to={"/"} activeClassName="active" onClick={handleClick}> 
                    <MenuItemIcon className="menu-item"><MdExplore /></MenuItemIcon>
                    <MenuItemText className="menu-item">Explore</MenuItemText>
                    <Highlight className="highlight"/>
                </MenuItem>
                <MenuItem to={"/genres"} activeClassName="active" onClick={handleClick}> 
                    <MenuItemIcon className="menu-item"><PiMusicNoteFill /></MenuItemIcon>
                    <MenuItemText className="menu-item">Genres</MenuItemText>
                    <Highlight className="highlight"/>

                </MenuItem>
                <MenuItem to={"/toptracks"} activeClassName="active" onClick={handleClick}> 
                    <MenuItemIcon className="menu-item"><MdShowChart /></MenuItemIcon>
                    <MenuItemText className="menu-item">Top Tracks</MenuItemText>
                    <Highlight className="highlight"/>
                </MenuItem>
                <MenuItem to={"/playlists"} activeClassName="active" onClick={handleClick}> 
                    <MenuItemIcon className="menu-item"><BiSolidPlaylist /></MenuItemIcon>
                    <MenuItemText className="menu-item">Playlists</MenuItemText>
                    <Highlight className="highlight"/>
                </MenuItem>
            </MenuItemWrapper>

            {!guest && <>
                <Subheader>LIBRARY</Subheader>
            <MenuItemWrapper>
                <MenuItem activeClassName="active" to={"/recents"} onClick={handleClick}>
                    <MenuItemIcon className="menu-item"><IoTime /></MenuItemIcon>
                    <MenuItemText className="menu-item">Recently Played</MenuItemText>
                    <Highlight className="highlight"/>

                </MenuItem>
                <MenuItem activeClassName="active" to={"/likedtracks"}  onClick={handleClick}>
                    <MenuItemIcon className="menu-item"><TiHeartFullOutline /></MenuItemIcon>
                    <MenuItemText className="menu-item">Liked Tracks</MenuItemText>
                    <Highlight className="highlight"/>

                </MenuItem>
                <MenuItem activeClassName="active" to={"/likedalbums"}  onClick={handleClick}>
                    <MenuItemIcon className="menu-item"><IoMdAlbums /></MenuItemIcon>
                    <MenuItemText className="menu-item">Liked Albums</MenuItemText>
                    <Highlight className="highlight"/>

                </MenuItem>
                <MenuItem activeClassName="active" to={"/myplaylists"}  onClick={handleClick}>
                    <MenuItemIcon className="menu-item"><BiSolidPlaylist /></MenuItemIcon>
                    <MenuItemText className="menu-item">My Playlists</MenuItemText>
                    <Highlight className="highlight"/>
                </MenuItem>
            </MenuItemWrapper>
            <Subheader>ACCOUNT</Subheader>
            <MenuItemWrapper>
                <MenuItem activeClassName="active" to={"/settings"}  onClick={handleClick}>
                    <MenuItemIcon className="menu-item"><IoCog /></MenuItemIcon>
                    <MenuItemText className="menu-item">Settings</MenuItemText>
                    <Highlight className="highlight"/>
                </MenuItem>
            </MenuItemWrapper>
            </>}

            {/* </Scrollable> */}
            {searching && <IndexingWrapper>
                <LoaderInline />
                <IndexingText>Searching track...</IndexingText>
            </IndexingWrapper>
}
            <Account style={{marginTop: searching  ? "3rem" : "auto"}}>
                <Column>
                    <SubheaderNoSpacing>SIGNED IN AS:</SubheaderNoSpacing>
                    <Username>{username ? username : "Guest"}</Username>
                </Column>
                <SignOut onClick={handleLogOut}/>
            </Account>
        </Wrapper>
    )
}

export default Sidebar
