const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-screen w-screen bg-white fixed top-0 left-0 z-50">
    <div className="loader"></div>
    <p className="mt-4 text-lg">Carregando...</p>
  </div>
);

// CSS para o spinner
const styles = `
.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

// Adicionando o estilo ao documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default LoadingSpinner;
