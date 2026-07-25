import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiPhone, FiSend, FiX } from "react-icons/fi";
import chatbotRobot from "../assets/chatbot-robot.gif";

const SERVICES_URL = "https://digital-pintu-backend.onrender.com/api/services";
const SETTINGS_URL = `${import.meta.env.VITE_API_URL}/api/site-settings`;
const quickReplies = ["View services", "Request pricing", "Contact us"];

const defaultSettings = {
  phoneNumber: "+91 86196 27463",
  contactEmail: "hello@digitalpintu.com",
  chatbotGreeting: "Hello! Welcome to Digital Pintu Solutions. How may I assist you today?",
  chatbotServicesMessage: "Here is our complete list of currently active services:",
  chatbotPricingMessage: "Our pricing is tailored to each project's scope and requirements. Please share your requirements through the Contact section, and our team will provide a suitable quotation.",
  chatbotContactMessage: "You can contact our team using the details below. We are now taking you to the contact form.",
  chatbotThanksMessage: "You're welcome. Please let me know if there is anything else I can help you with.",
  chatbotFallbackMessage: "I can assist you with our services, pricing, and contact information. Please select an option below or type your question.",
};

function getBotReply(message, settings) {
  const text = message.toLowerCase();

  if (/\b(hi|hello|hey|namaste)\b/.test(text)) {
    return settings.chatbotGreeting;
  }
  if (
    text.includes("price") ||
    text.includes("pricing") ||
    text.includes("cost") ||
    text.includes("charge") ||
    text.includes("quote")
  ) {
    return settings.chatbotPricingMessage;
  }
  if (text.includes("thank")) {
    return settings.chatbotThanksMessage;
  }

  return settings.chatbotFallbackMessage;
}

export default function AIChatBot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [services, setServices] = useState([]);
  const [servicesError, setServicesError] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: defaultSettings.chatbotGreeting,
    },
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    Promise.allSettled([
      fetch(SERVICES_URL).then((response) => {
        if (!response.ok) throw new Error("Unable to load services");
        return response.json();
      }),
      fetch(SETTINGS_URL).then((response) => {
        if (!response.ok) throw new Error("Unable to load chatbot settings");
        return response.json();
      }),
    ]).then(([servicesResult, settingsResult]) => {
      if (servicesResult.status === "fulfilled") {
        setServices(Array.isArray(servicesResult.value) ? servicesResult.value : []);
        setServicesError(false);
      } else {
        setServicesError(true);
      }

      if (settingsResult.status === "fulfilled") {
        const loadedSettings = { ...defaultSettings, ...settingsResult.value };
        setSettings(loadedSettings);
        setMessages((current) =>
          current.length === 1
            ? [{ ...current[0], text: loadedSettings.chatbotGreeting }]
            : current
        );
      }
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (value) => {
    const text = value.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), sender: "user", text },
    ]);
    setInput("");

    window.setTimeout(() => {
      const normalizedText = text.toLowerCase();
      const asksForContact =
        normalizedText.includes("contact") ||
        normalizedText.includes("call") ||
        normalizedText.includes("email") ||
        normalizedText.includes("whatsapp") ||
        normalizedText.includes("connect");
      const asksForServices =
        normalizedText.includes("service") ||
        normalizedText.includes("website") ||
        normalizedText.includes("app");

      setMessages((current) => [
        ...current,
        asksForContact
          ? {
              id: Date.now() + 1,
              sender: "bot",
              type: "contact",
              text: settings.chatbotContactMessage,
            }
          : asksForServices
          ? {
              id: Date.now() + 1,
              sender: "bot",
              type: "services",
              text: servicesError
                ? "Our services are temporarily unavailable. Please try again shortly or contact our team for assistance."
                : services.length
                  ? settings.chatbotServicesMessage
                  : "Our active services are being updated. Please contact our team for the latest information.",
              services,
            }
          : {
              id: Date.now() + 1,
              sender: "bot",
              text: getBotReply(text, settings),
            },
      ]);

      if (asksForContact) {
        window.setTimeout(() => {
          setIsOpen(false);
          navigate("/");
          window.setTimeout(() => {
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 150);
        }, 1800);
      }
    }, 450);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-44 right-5 z-[60]">
      {isOpen && (
        <section
          aria-label="AI chat assistant"
          className="mb-4 flex h-[min(520px,72vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#07111d]/95 text-white shadow-[0_24px_80px_rgba(6,182,212,0.24)] backdrop-blur-2xl"
        >
          <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-5 py-4">
            <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-19 w-19 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-xl shadow-inner">
                  <img src={chatbotRobot} alt="" className="h-9 w-9 rounded-xl object-cover" />
                </div>
                <div>
                  <h2 className="font-bold">Digital Pintu Assistant</h2>
                  <p className="flex items-center gap-1.5 text-xs text-cyan-50">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    Online • Instant assistance
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 transition hover:bg-white/20"
              >
                <FiX size={20} />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-[#0a1625] to-[#07111d] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-xs text-cyan-300">
                    <img src={chatbotRobot} alt="" className="h-6 w-6 rounded-full object-cover" />
                  </span>
                )}
                <div
                  className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    message.sender === "user"
                      ? "rounded-br-sm bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950"
                      : "rounded-bl-sm border border-white/10 bg-white/[0.07] text-gray-100"
                  }`}
                >
                  <p>{message.text}</p>
                  {message.type === "services" && message.services?.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {message.services.map((service, index) => (
                        <Link
                          key={service._id || service.slug}
                          to={`/services/${service.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] px-3 py-2 text-cyan-100 transition hover:border-cyan-400/40 hover:bg-cyan-400/15"
                        >
                          <span className="text-xs font-semibold text-cyan-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{service.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {message.type === "contact" && (
                    <div className="mt-3 space-y-2">
                      <a
                        href={`tel:${settings.phoneNumber.replace(/[^+\d]/g, "")}`}
                        className="flex items-center gap-2 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] px-3 py-2 text-cyan-100 transition hover:bg-cyan-400/15"
                      >
                        <FiPhone className="shrink-0 text-cyan-400" />
                        <span>{settings.phoneNumber}</span>
                      </a>
                      <a
                        href={`mailto:${settings.contactEmail}`}
                        className="flex items-center gap-2 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] px-3 py-2 text-cyan-100 transition hover:bg-cyan-400/15"
                      >
                        <FiMail className="shrink-0 text-cyan-400" />
                        <span className="break-all">{settings.contactEmail}</span>
                      </a>
                      <p className="pt-1 text-xs text-gray-400">Opening the contact form...</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 overflow-x-auto border-t border-white/5 px-3 pt-3">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => sendMessage(reply)}
                className="shrink-0 rounded-full border border-cyan-400/30 bg-cyan-400/[0.06] px-3 py-1.5 text-xs text-cyan-200 transition hover:border-cyan-400/60 hover:bg-cyan-400/15"
              >
                {reply}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label="Chat message"
              placeholder="Write your message..."
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm outline-none placeholder:text-gray-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/15 transition hover:scale-105"
            >
              <FiSend />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="ml-auto flex h-20 w-20 items-center justify-center border-0 bg-transparent p-0 text-2xl text-white shadow-none outline-none transition-transform duration-300 hover:scale-110 focus:outline-none"
      >
        {isOpen ? <FiX /> : <img src={chatbotRobot} alt="" className="h-20 w-20 object-contain" />}
      </button>
    </div>
  );
}
