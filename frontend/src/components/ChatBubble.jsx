import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import './ChatBubble.css'

function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Bonjour ! Je suis l\'assistant de Noël. Avez-vous une question sur son profil, ses compétences ou ses projets ?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  // Use build-time Vite env var if provided, otherwise fallback to localhost in dev,
  // or use relative paths in production so Caddy can proxy `/api`.
  const apiUrl = import.meta.env.VITE_API_URL ?? (import.meta.env.MODE === 'development' ? 'http://localhost:3001' : '')

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Toggle a root-level class so we can target mobile styles when chat is open
  useEffect(() => {
    const root = document.documentElement
    if (isOpen) {
      root.classList.add('chat-open')
    } else {
      root.classList.remove('chat-open')
    }
    return () => root.classList.remove('chat-open')
  }, [isOpen])

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Prepare conversation history for API
      const conversationHistory = messages
        .filter(msg => msg.id !== 1 || messages.length === 1) // Include welcome message only once
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))

      // Add the new user message
      conversationHistory.push({
        role: 'user',
        content: inputValue
      })

      // Call the backend API
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: conversationHistory })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from API')
      }

      const data = await response.json()

      // Add AI response to chat
      const aiMessage = {
        id: messages.length + 2,
        text: data.message,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)

      // Add error message to chat
      const errorMessage = {
        id: messages.length + 2,
        text: 'Désolé, une erreur s\'est produite. Assurez-vous que le serveur backend est en cours d\'exécution et que la clé API Mistral est configurée.',
        sender: 'ai',
        iserror: true,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        className={`chat-bubble-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-bubble-window">
          {/* Header */}
          <div className="chat-header">
            <h3 className="chat-title">Assistant de Noël</h3>
            <button
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="chat-messages">
            {messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'} ${message.iserror ? 'error-message' : ''}`}
              >
                {message.sender === 'ai' && (
                  <div className="message-avatar ai-avatar">🤖</div>
                )}
                <div className="message-content">
                  <div className="message-text">
                    {message.sender === 'ai' ? (
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    ) : (
                      <p>{message.text}</p>
                    )}
                  </div>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                {message.sender === 'user' && (
                  <div className="message-avatar user-avatar">👤</div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="message ai-message loading-message">
                <div className="message-avatar ai-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Posez une question..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              disabled={isLoading}
              className="chat-input"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="chat-send-btn"
              aria-label="Send message"
            >
              {isLoading ? '⏳' : '➤'}
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatBubble
