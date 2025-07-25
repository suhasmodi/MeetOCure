import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Bell, Settings, ArrowLeft,Wallet,ChevronLeft, Phone, Clock, Paperclip, Mic, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
// Header Component
const Header = ({ onBackClick }) => {
  return (
    <div className="bg-white shadow-sm w-full flex items-center justify-between px-4 py-3">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to={"/date-time"}>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-800">Chat with AI</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 mr-8">
          <Link to={"/chat"}>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <MessageCircle className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 "></span>
          </button>
          </Link>
          <Link to={"/user-wallet"}>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Wallet className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 "></span>
          </button>
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 "></span>
          </button>
        </div>
      </div>
  );
};

// Contact Card Component
const ContactCard = ({ name, role, avatar, workingHours, onCallClick }) => {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-start gap-4 mb-4 mt-4">
        <div className="relative">
          <img 
            src={avatar} 
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{name}</h2>
            <div className="w-4 h-4 text-white/80">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
              </svg>
            </div>
          </div>
          <p className="text-white/90 text-sm font-medium">{role}</p>
        </div>
      </div>
      <Link to={"/contact"}>
      <button 
        onClick={onCallClick}
        className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium text-white mb-3"
      >
        <Phone className="w-5 h-5" />
        Call Now
      </button>
      </Link>
      <div className="flex items-center gap-2 text-white/80 text-sm">
        <Clock className="w-4 h-4" />
        <span>{workingHours}</span>
      </div>
    </div>
  );
};

// Typing Indicator Component
const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

// Message Component
const Message = ({ content, timestamp, isUser }) => {
  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${
        isUser 
          ? 'bg-teal-600 text-white rounded-br-md' 
          : 'bg-gray-100 text-gray-800 rounded-bl-md'
      }`}>
        <p className="text-sm">{content}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-teal-100' : 'text-gray-500'}`}>
          {timestamp}
        </p>
      </div>
    </div>
  );
};

// Message Input Component
const MessageInput = ({ value, onChange, onSend, placeholder = "Message..." }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Paperclip className="w-5 h-5" />
        </button>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
        />
        
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Mic className="w-5 h-5" />
        </button>
        
        <button 
          onClick={onSend}
          className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Chat Interface Component
const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Hi',
      timestamp: '11:25',
      isUser: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      isUser: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message! I'm here to help you with appointment booking. How can I assist you today?",
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        isUser: false
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col border-t-1 border border-l-1 h-full">
      {/* Chat Header */}
      {/* <div className="bg-white border-t border-gray-200 p-4"> */}
        {/* <h2 className="text-lg font-semibold text-gray-800 text-center">Chat with AI</h2> */}
      {/* </div> */}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
            isUser={message.isUser}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        placeholder="Message..."
      />
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  const handleCallClick = () => {
    console.log('Initiating call...');
  };

  return (
    <div className="bg-gray-50 p-4 lg:p-6">
      <ContactCard
        name="Sai Kiran"
        role="Appointment Booking Agent"
        avatar="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
        workingHours="6:00 AM - 9:00 PM"
        onCallClick={handleCallClick}
      />
    </div>
  );
};

// Main App Component
function ChatPage() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Header onBackClick={() => setShowSidebar(!showSidebar)} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile: Full screen sidebar or chat */}
        <div className="lg:hidden w-full flex">
          {showSidebar ? (
            <div className="w-full">
              <Sidebar />
              <div className="p-4">
                <button
                  onClick={() => setShowSidebar(false)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3 px-4 font-medium transition-colors"
                >
                  Start Chat
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full bg-white">
              <ChatInterface />
            </div>
          )}
        </div>

        {/* Desktop: Split view */}
        <div className="hidden lg:flex w-full">
          {/* Sidebar */}
          <div className="w-1/3 xl:w-1/4 border-r border-gray-200 bg-gray-50 overflow-y-auto">
            <Sidebar />
          </div>
          
          {/* Chat */}
          <div className="flex-1 bg-white">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;