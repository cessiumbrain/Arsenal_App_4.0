import { useEffect, useState } from "react"
import { json } from "react-router-dom"

function Chat(){
    const [chatHistory, setChatHistory] = useState([{role: "assistant", content: "How can I help you"}])
    const [GPTisTyping, setGPTisTyping] = useState(false)
    const [currentMessage, setCurrentMessage] = useState() 

    
    //api call
    async function sendMessage(){
        const newHistory = chatHistory.concat({role: 'user', content: currentMessage})
        
      
        await setChatHistory(newHistory)

        setGPTisTyping(true)

        setCurrentMessage('')
       const response = await fetch('https://personal-server-8kq2.onrender.com/gpt', {
        mode: 'cors',
         method: "POST",
         body: JSON.stringify(newHistory),
         headers: {
           "Content-type": "application/json",
         },
       }); 
       console.log(response)

        response.body
        .getReader()
        .read()
        .then(data=>{
            let decoder = new TextDecoder
            setGPTisTyping(false)
            const decodedText = decoder.decode(data.value)
            const newMessageObj = {
                role:'assistant',
                content: decodedText
            }
            console.log(newMessageObj)
            const evenNewerChatHistory = newHistory.concat(newMessageObj)
            setChatHistory(evenNewerChatHistory)
        })
    }
    
    return(
        <div className="Chat">
            <div className="history-div">
                <p>{
                chatHistory.map((message, index)=>{
                   return (
                   <>
                   <p key={`1_${index}`} className={message.role}>
                    <span>{message.role}:  </span>
                   </p>
                   <p key={index}>  {message.content}</p>
                   </>)
                   
                })
            }</p>
            </div>
            
            <textarea value={currentMessage} onChange={(e)=>{setCurrentMessage(e.target.value)}} onKeyDown={(e)=>{if(e.code==='Enter'){
                sendMessage()
            }}}>
            
            </textarea>
            <i class="fa-regular fa-paper-plane"
            onClick={sendMessage}></i>
        </div>
    )
}

export default Chat