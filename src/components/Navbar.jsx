import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled from "styled-components";
import { MenuRounded } from "@mui/icons-material";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0 20px;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  height: 80px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const NavLogo = styled(LinkR)`
  font-weight: 600;
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;

  @media screen and (max-width: 780px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ThemeToggle = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
`;


const MobileIcon = styled.div`
  display: none;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  height: 100%;
  display: none;
  align-items: center;

  @media screen and (max-width: 780px) {
    display: flex;
  }
`;

const MobileMenu = styled.ul`
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  background: ${({ theme }) => theme.card_light + 99};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 40px;
  list-style: none;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
  transition: all 0.4s ease-in-out;
`;

const Navbar = ({ themeMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <NavbarContainer>
        <Left>
          <NavLogo to="/">Portfolio</NavLogo>
        </Left>

        <NavItems>
          <NavLink href="#About">About</NavLink>
          <NavLink href="#Skills">Skills</NavLink>
          <NavLink href="#Projects">Projects</NavLink>
          <NavLink href="#Certificates">Certificates</NavLink>
          <NavLink href="#Journey">Journey</NavLink>
        </NavItems>

        <Right>
          <ThemeToggle onClick={toggleTheme}>
            {themeMode === "dark" ? "🌞 Light" : "🌙 Dark"}
          </ThemeToggle>

          <MobileIcon onClick={() => setIsOpen(!isOpen)}>
            <MenuRounded />
          </MobileIcon>
        </Right>
      </NavbarContainer>

      {isOpen && (
        <MobileMenu isOpen={isOpen}>
          <NavLink onClick={() => setIsOpen(false)} href="#About">About</NavLink>
          <NavLink onClick={() => setIsOpen(false)} href="#Skills">Skills</NavLink>
          <NavLink onClick={() => setIsOpen(false)} href="#Projects">Projects</NavLink>
          <NavLink onClick={() => setIsOpen(false)} href="#Certificates">Certificates</NavLink>
          <NavLink onClick={() => setIsOpen(false)} href="#Journey">Journey</NavLink>
        </MobileMenu>
      )}
    </Nav>
  );
};

export default Navbar;
