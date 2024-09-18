import useSWR from "swr";
import styled from "styled-components";
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
  console.log(sortedData);
  return (
    <>
      <CommunityWrapper>
        {sortedData.map((message) => (
          <MessageBubble key={message._id}>
            <MessageAuthor>{message.name}</MessageAuthor>
            <p>{message.message}</p>
            <MessageTimestamp>{message.date}</MessageTimestamp>
          </MessageBubble>
        ))}
      </CommunityWrapper>
      <InputFormWrapper onSubmit={handleSubmit}>
        <StyledInput type="text" placeholder="name" name="name" />
        <StyledInput type="text" placeholder="your message..." name="message" />
        <StyledSendButton type="submit">send</StyledSendButton>
      </InputFormWrapper>
    </>
  );
}

const CommunityWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  max-width: 300px;
  margin: 0 auto;
  padding-bottom: 4.5rem;
`;

const MessageBubble = styled.div`
  background: #fff;
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
  margin-top: 1rem;
  width: 100%;
  position: fixed;
  bottom: 90px;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 -0.5px 5px #0000000d;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #3498db;
  border-radius: 15px;
  margin-right: 5px;
  outline: none;
  width: 30%;
`;

const StyledSendButton = styled.button`
  padding: 10px 15px;
  border-radius: 15px;
  background-color: #e67e22;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #d35400;
  }
`;
