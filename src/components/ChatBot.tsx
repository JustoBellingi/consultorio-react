import { useState } from "react";
import "./ChatBot.css";
import doctora from "../assets/doctora.png";

interface Message {
  text: string;
  sender: "user" | "bot";
}

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Buenos días. Soy la asistente virtual de la Dra. Rey. ¿En qué puedo ayudarlo?",
      sender: "bot",
    },
  ]);

  const handleOption = (option: string) => {
    const userMessage: Message = { text: option, sender: "user" };
    let botResponse: Message = { text: "", sender: "bot" };

    if (option === "Solicitar turno") {
      botResponse.text =
        "Por favor, diríjase a la sección de turnos para completar el formulario.";
    } else if (option === "Ver horarios") {
      botResponse.text =
        "Los horarios disponibles se actualizan en tiempo real en la sección de turnos.";
    } else if (option === "Contacto") {
      botResponse.text =
        "Puede comunicarse al 221 511 -7589.";
    }

    setMessages([...messages, userMessage, botResponse]);
  };

  return (
    <>
      {/* BOTÓN CIRCULAR CON FOTO */}
      <button className="chat-button" onClick={() => setOpen(!open)}>
        <img src={doctora} alt="Asistente Dra. Martínez" />
        <span className="online-indicator"></span>
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            Dra. Martínez
            <div className="chat-subtitle">Asistente Virtual</div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-options">
            <button onClick={() => handleOption("Solicitar turno")}>
              Solicitar turno
            </button>
            <button onClick={() => handleOption("Ver horarios")}>
              Ver horarios
            </button>
            <button onClick={() => handleOption("Contacto")}>
              Contacto
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;