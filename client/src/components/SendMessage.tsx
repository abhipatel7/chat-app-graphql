import { useState, FC } from 'react';
import { useMutation } from '@apollo/client';
import { sendMessageMutation } from '../lib/Mutations/sendMessage';

interface SendMessageProps {
  name: string;
}

const SendMessage: FC<SendMessageProps> = ({ name }) => {
  const [input, setInput] = useState<string>('');
  const [sendMessage] = useMutation(sendMessageMutation);

  const handleSend = () => {
    sendMessage({ variables: { name: name, message: input } })
      .then((data) => {
        console.log(data);
        setInput('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        id="message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button onClick={handleSend}>Send message</button>
    </div>
  );
};

export default SendMessage;
