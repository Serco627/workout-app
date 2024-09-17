import styled from "styled-components";
import Link from "next/link";
import Header from "./Header/Header";

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      <MainContent>{children}</MainContent>

      <Footer>
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/workoutlist">Workouts</NavLink>
          <NavLink href="/exercises">Exercises</NavLink>
          <NavLink href="/community">Community</NavLink>
        </Nav>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  border: 2px solid #ffffff;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ffffff;
    color: #3498db;
    box-shadow: 0 0 10px #ffffff;
  }

  &:active {
    background-color: #ffffff;
    color: #3498db;
    font-weight: bold;
    border: 3px solid #ffffff;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  padding-top: 0px;
  margin-bottom: 65px;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: #3498db;
  color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 3;
  width: 100%;
`;
