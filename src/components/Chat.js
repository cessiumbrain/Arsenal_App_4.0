import { useEffect, useState, useRef } from "react";
import { json } from "react-router-dom";

function Chat() {
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "How can I help you" },
  ]);
  const [GPTisTyping, setGPTisTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState();
  
  const scrollRef = useRef();
useEffect(()=>{
    scrollRef.current.scrollIntoView()
})
  //api call
  async function sendMessage() {
   
    const newHistory = chatHistory.concat({
      role: "user",
      content: currentMessage,
    });

    await setChatHistory(newHistory);

    setGPTisTyping(true);

    setCurrentMessage("");
    const response = await fetch(
      "https://personal-server-8kq2.onrender.com/gpt",
      {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(newHistory),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    response.body
      .getReader()
      .read()
      .then((data) => {
        let decoder = new TextDecoder();
        setGPTisTyping(false);
        const decodedObj = decoder.decode(data.value);
        const messageText = JSON.parse(decodedObj).choices[0].message.content;
        console.log(messageText);
        const newMessageObj = {
          role: "assistant",
          content: messageText,
        };
        // console.log(typeof newMessageObj)
        const evenNewerChatHistory = newHistory.concat(newMessageObj);
        setChatHistory(evenNewerChatHistory);
        // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        console.log(
          `scrolltop ${scrollRef.current.scrollTop} scrollhiehgt ${scrollRef.current.scrollHeight}`
        );
      });
  }

  return (
    <div className="Chat">
      <div className="history-div" >
        {chatHistory.map((message, index) => {
          const last = chatHistory.length - 1;
          
          if ((index ==last)) {
            console.log('in the true block')
            return (
              <p>
                <span key={`1_${index}`} className={message.role}>
                  {message.role}:
                </span>
                <span key={index}> {message.content}</span>
              </p>
            );
          } else {
            return (
              <p>
                <span key={`1_${index}`} className={message.role}>
                  {message.role}:
                </span>
                <span key={index}> {message.content}</span>
              </p>
            );
          }
        })}
        <div ref={scrollRef}></div>
      </div>

      <textarea
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            sendMessage();
          }
        }}
      ></textarea>
      <i class="fa-regular fa-paper-plane" onClick={sendMessage}></i>
    </div>
  );
}

export default Chat;
