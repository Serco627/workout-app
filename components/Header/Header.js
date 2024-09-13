import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const BackLinkSvg = styled.svg`
  position: fixed;
  left: 5px;
  top: 5px;
  padding: 8px;
  z-index: 3;
  border: 2px solid #3498db;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px #00000033;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background-color: #f0f8ff;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
  }
`;

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
          <>
            <Image src="/logo.png" alt="Logo" width={90} height={90} />
            <Link href={`/`} aria-label="back to homepage">
              <BackLinkSvg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3498db"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </BackLinkSvg>
            </Link>
            <HiddenAppName>GYM LOG - Crush your Goals</HiddenAppName>
          </>
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
