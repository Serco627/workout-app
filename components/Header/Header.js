import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 3px #3e4951;
  width: 100%;
  z-index: 5;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-around;

  align-items: center;
  gap: 25px;
`;

const AppName = styled.h1`
  font-size: 2.3rem;
  color: #3498db;
  margin: 0;
  letter-spacing: 6px;
  font-weight: 300;
  border-bottom: 2px solid #3498db;
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
            width={100}
            height={100}
          />
        </Link>
        <div>
          <AppName>
            GYM<StyledLog>LOG</StyledLog>
          </AppName>
          <Slogan>Crush your goals</Slogan>
        </div>
      </LogoContainer>
    </StyledHeader>
  );
}
