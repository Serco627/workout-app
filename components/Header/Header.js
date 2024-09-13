import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { StyledRuler } from "../FilterSection/FilterSection";

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
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
  letter-spacing: 6px;
  font-weight: 300;
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
          <StyledRuler></StyledRuler>
          <Slogan>Crush your goals</Slogan>
        </div>
      </LogoContainer>
    </StyledHeader>
  );
}
