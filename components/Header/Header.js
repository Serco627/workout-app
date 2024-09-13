import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

const HiddenAppName = styled.h1`
  display: none;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 4px 10px -2px rgba(52, 152, 219, 0.7);
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const AppName = styled.h1`
  font-size: 2.5rem;
  color: #3498db;
  margin: 0;
  font-weight: bold;
`;

const Slogan = styled.p`
  font-size: 1.2rem;
  color: #3498db;
  margin: 0;
  font-style: italic;
`;
export default function Header() {
  const router = useRouter();
  const headerContent = getHeaderContent(router.pathname);

  function getHeaderContent(pathname) {
    switch (pathname) {
      case "/exercises/[id]":
        return (
          <LogoContainer>
            <Image
              src="/Logo_ohne_Schrift.png"
              alt="Logo"
              width={90}
              height={90}
            />
            <div>
              <AppName>Gym Log</AppName>
              <Slogan>Crush your goals</Slogan>
            </div>
            <HiddenAppName>GYM LOG - Crush your Goals</HiddenAppName>
          </LogoContainer>
        );

      default:
        return (
          <LogoContainer>
            <Image
              src="/Logo_ohne_Schrift.png"
              alt="Logo"
              width={90}
              height={90}
            />
            <div>
              <AppName>Gym Log</AppName>
              <Slogan>Crush your goals</Slogan>
            </div>
            <HiddenAppName>GYM LOG - Crush your Goals</HiddenAppName>
          </LogoContainer>
        );
    }
  }
  return <StyledHeader>{headerContent}</StyledHeader>;
}
