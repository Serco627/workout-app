import useSWR from "swr";

export default function Community() {
  const { data, error, isLoading } = useSWR("/api/messages");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load messages</p>;
  }

  return (
    <>
      {data.map((message) => {
        return (
          <div key={message._id}>
            <p>{message.message}</p>
            <p>by {message.name}</p>
          </div>
        );
      })}
    </>
  );
}
