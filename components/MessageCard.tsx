// Packages imports
import { useContext } from "react";

// Components Imports
import GlobalContext from "./../contexts/GlobalContext";
import { MessageCardProps } from "../types/ComponentTypes";
import RecievedMessage from "./RecievedMessage";
import SendMessage from "./SendMessage";

// function component for MessageCard
function MessageCard(props: MessageCardProps) {
  // Get Current User
  const { User } = useContext(GlobalContext);

  // If user is not logged in, return null
  if (!User) return null;

  // render
  return User._id === props.sender_id ? (
    <SendMessage {...props} />
  ) : (
    <RecievedMessage {...props} />
  );
}

// Exports
export default MessageCard;
