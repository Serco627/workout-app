import styled, { keyframes, css } from "styled-components";
import Link from "next/link";
import Header from "./Header/Header";
import { useState } from "react";

// Animation keyframes for sliding up
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <Container>
      <Header />
      <MainContent $mainFilter={menuOpen ? "filter: blur(2px);" : null}>
        {children}
      </MainContent>

      <Footer>
        <Nav>
          <NavSpan onClick={toggleMenu} aria-label="menu">
            &#9776;
          </NavSpan>

          {menuOpen && (
            <>
              <SubNavLink1 $menuOpen={menuOpen} href="/" onClick={toggleMenu}>
                Home
              </SubNavLink1>

              <SubNavLink2
                $menuOpen={menuOpen}
                href="/workoutlist"
                onClick={toggleMenu}
              >
                Workouts
              </SubNavLink2>
              <SubNavLink3
                $menuOpen={menuOpen}
                href="/exercises"
                onClick={toggleMenu}
              >
                Exercises
              </SubNavLink3>
              <SubNavLink4
                $menuOpen={menuOpen}
                href="/prep-and-follow-up"
                onClick={toggleMenu}
              >
                Warm ups & Cool Downs
              </SubNavLink4>
              <SubNavLink5
                $menuOpen={menuOpen}
                href="/community"
                onClick={toggleMenu}
              >
                Chat
              </SubNavLink5>
            </>
          )}
        </Nav>
      </Footer>
    </Container>
  );
}

const NavSpan = styled.span`
  color: #3498db;
  background-color: #fff;
  text-decoration: none;
  border: 2px solid #ffffff;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  display: inline-block;
  border: 3px solid #3498db;
  font-weight: bold;
  box-shadow:
    0 2px 5px #0000001f,
    0 1px 5px #0000001f;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const NavLink = styled(({ isActive, ...props }) => <Link {...props} />)`
  color: ${({ isActive }) => (isActive ? "#3498db" : "#ffffff")};
  background-color: ${({ isActive }) => (isActive ? "#ffffff" : "transparent")};

  text-decoration: none;
  border: 2px solid #ffffff;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  transition: all 0.3s ease-in-out;
  box-shadow: ${({ isActive }) => (isActive ? "0 0 10px #ffffff" : "none")};

  &:hover {
    background-color: #ffffff;
    color: #3498db;
    box-shadow: 0 0 10px #ffffff;
  }

  &:active {
    background-color: #ffffff;
    color: #3498db;
    border: 3px solid #ffffff;
  }
`;

const SubNavLink = styled(NavLink)`
  position: fixed;
  background-color: #3498db;
  opacity: 0; /* Start hidden */
  transform: translateY(20px); /* Start off-screen */
  transition:
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  ${({ $menuOpen }) =>
    $menuOpen &&
    css`
      animation: ${slideUp} 0.3s forwards;
    `}
`;

const SubNavLink1 = styled(SubNavLink)`
  bottom: 70px;
`;

const SubNavLink2 = styled(SubNavLink)`
  bottom: 115px;
`;

const SubNavLink3 = styled(SubNavLink)`
  bottom: 160px;
`;

const SubNavLink4 = styled(SubNavLink)`
  bottom: 205px;
`;

const SubNavLink5 = styled(SubNavLink)`
  bottom: 250px;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 0px;
  margin-bottom: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props) => props.$mainFilter}
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 3;
  width: 100%;
`;
