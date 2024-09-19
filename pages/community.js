import useSWR from "swr";
import styled from "styled-components";
import Image from "next/image";
import sortByNewestTime from "@/utils/sortByNewestTime";

export default function Community() {
  const { data, error, isLoading } = useSWR("/api/messages");
  const { mutate } = useSWR("/api/messages");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load messages</p>;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataMessage = Object.fromEntries(formData);
    const date = new Date().toLocaleString();
    const newMessage = { ...dataMessage, date: date };
    const response = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(newMessage),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      mutate();
    }
    event.target.reset();
  }

  const sortedData = sortByNewestTime(data);

  return (
    <StyledBackground>
      <InputFormWrapper onSubmit={handleSubmit}>
        <StyledLabel htmlFor="name">Name</StyledLabel>
        <StyledInput
          type="text"
          placeholder="name"
          name="name"
          id="name"
          required
        />
        <StyledLabel htmlFor="message">Name</StyledLabel>
        <StyledInput
          type="text"
          placeholder="your message..."
          id="message"
          name="message"
          required
        />
        <StyledSendButton type="submit">
          <StyledPaperplane src="/paperplane.svg" width={20} height={20} />
        </StyledSendButton>
      </InputFormWrapper>
      <CommunityWrapper>
        {sortedData.map((message) => (
          <MessageBubble key={message._id}>
            <MessageAuthor>{message.name}</MessageAuthor>
            <p>{message.message}</p>
            <MessageTimestamp>{message.date}</MessageTimestamp>
          </MessageBubble>
        ))}
      </CommunityWrapper>
    </StyledBackground>
  );
}

const StyledPaperplane = styled(Image)`
  transform: rotate(-30deg);
  color: #fff;
`;

const StyledLabel = styled.label`
  display: none;
`;

const StyledBackground = styled.section`
  background-color: #fff;
`;

const CommunityWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  padding-bottom: 0;
  padding-top: 0;
  max-width: 300px;
  margin: 0 auto;
`;

const MessageBubble = styled.div`
  background: #f5f5f5;
  border-radius: 15px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  box-shadow:
    0 4px 8px #0000001a,
    0 -0.5px 5px #0000000d;
  display: flex;
  flex-direction: column;
`;

const MessageAuthor = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const MessageTimestamp = styled.p`
  font-size: 0.75rem;
  color: #888;
  margin-top: 5px;
  align-self: flex-end;
`;

const InputFormWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  margin-top: 8px;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #3498db;
  border-radius: 15px;
  margin-right: 5px;
  outline: none;
  width: 30%;

  &::placeholder {
    color: #3498db;
  }
`;

const StyledSendButton = styled.button`
  padding: 7px 12px;
  border-radius: 15px;
  background-color: #27ae60;
  border: 1px solid #27ae60;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #d35400;
  }
`;
