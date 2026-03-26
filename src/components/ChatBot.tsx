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
      text: "Hola 👋 Soy la asistente. ¿Qué necesitás?",
      sender: "bot",
    },
  ]);

  const sendMessage = (text: string) => {
    const userMsg: Message = { text, sender: "user" };

    let respuesta = "";

    if (text.includes("turno")) {
      respuesta = "Podés reservar directamente en la sección de turnos 📅";
    } else if (text.includes("horario")) {
      respuesta = "Atendemos de lunes a viernes de 9 a 18 hs 🕒";
    } else if (text.includes("precio")) {
      respuesta = "Los precios varían según el tratamiento. Te recomendamos consultar por WhatsApp 💬";
    } else {
      respuesta = "Podés consultarnos por WhatsApp para una respuesta más rápida 😊";
    }

    const botMsg: Message = { text: respuesta, sender: "bot" };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <>
      {/* BOTÓN */}
      <button className="chat-button" onClick={() => setOpen(!open)}>
        <img src={doctora} alt="Asistente" />
        <span className="online"></span>
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            Asistente Virtual
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-actions">
            <button onClick={() => sendMessage("turno")}>Turno</button>
            <button onClick={() => sendMessage("horario")}>Horarios</button>
            <button onClick={() => sendMessage("precio")}>Precios</button>
          </div>

          <a
            href="https://wa.me/5492215117589"
            target="_blank"
            className="chat-wsp"
          >
            Ir a WhatsApp
          </a>
        </div>
      )}
    </>
  );
}

export default ChatBot;