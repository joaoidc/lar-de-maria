const LoadingPage = () => (
  <div className="flex flex-col items-center justify-center h-screen w-screen bg-white fixed top-0 left-0 z-50">
    <img
      src="https://res.cloudinary.com/dggewyuon/image/upload/v1739215911/lardemaria-logo_uiyipm.png"
      alt="Loading..."
      className="loader"
      style={{ width: "150px", height: "auto", borderRadius: "0" }}
    />
    <div className="hearts mt-4">
      <span className="heart loading-heart" style={{ animationDelay: "0s" }}>
        ❤️
      </span>
      <span className="heart loading-heart" style={{ animationDelay: "0.5s" }}>
        ❤️
      </span>
      <span className="heart loading-heart" style={{ animationDelay: "1s" }}>
        ❤️
      </span>
    </div>
    <p className="mt-4 text-lg">Carregando...</p>
  </div>
);

// CSS para o logo e corações
const styles = `
.loader {
  border: none; /* Remover borda */
  border-radius: 0; /* Garantir que não tenha borda arredondada */
  animation: none; /* Remover animação de rotação */
}

.hearts {
  display: flex;
  gap: 10px;
}

.loading-heart {
  animation: colorChange 2s linear infinite;
}

@keyframes colorChange {
  0% { color: red; }
  50% { color: white; }
  100% { color: red; }
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.heart {
  font-size: 24px;
  animation: heartbeat 1s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}`;

// Adicionando o estilo ao documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default LoadingPage;
