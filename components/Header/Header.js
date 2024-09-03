import styled from "styled-components";
import Image from "next/image";

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 0rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Image src="/logo.png" alt="Logo" width={90} height={90} />
    </StyledHeader>
  );
}
