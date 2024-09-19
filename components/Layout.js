import styled from "styled-components";
import Link from "next/link";
import Header from "./Header/Header";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <Container>
      <Header />
      <MainContent>{children}</MainContent>

      <Footer>
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/workoutlist">Work outs</NavLink>
          <NavLink href="/exercises">Exer cises</NavLink>
          <NavLink href="/community">Chat</NavLink>
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

const NavLink = styled(({ isActive, ...props }) => <Link {...props} />)`
  color: ${({ isActive }) => (isActive ? "#3498db" : "#ffffff")};
  background-color: ${({ isActive }) => (isActive ? "#ffffff" : "transparent")};
  text-decoration: none;
  border: 2px solid #ffffff;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 1rem;
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

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  padding-top: 0px;
  margin-bottom: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border-top: 1px solid #fff;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
`;
