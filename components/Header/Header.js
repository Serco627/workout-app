import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const HiddenAppName = styled.h1`
  display: none;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  background-color: #fff;
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
  font-size: 2.2rem;
  color: #3498db;
  margin: 0;
  letter-spacing: 2px;
  font-weight: 200;
`;

const StyledLog = styled.span`
  font-weight: 900;
`;

const Slogan = styled.p`
  font-size: 1.2rem;
  color: #3498db;
  margin: 0;
  font-family: monospace;
`;

export default function Header() {
  return (
    <StyledHeader>
      <LogoContainer>
        <Link href="/">
          <Image
            src="/Logo_ohne_Schrift.png"
            alt="Logo"
            width={90}
            height={90}
          />
        </Link>
        <div>
          <AppName>
            GYM<StyledLog>LOG</StyledLog>
          </AppName>
          <Slogan>Crush your goals</Slogan>
        </div>
        <HiddenAppName>GYM LOG - Crush your Goals</HiddenAppName>
      </LogoContainer>
    </StyledHeader>
  );
}
