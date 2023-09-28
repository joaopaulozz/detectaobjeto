// Obtém referências aos elementos HTML que serão usados no aplicativo
const cameraView = document.getElementById('cameraView'); // Elemento de vídeo para a visualização da câmera
const objectNameElement = document.getElementById('objectName'); // Elemento para exibir informações sobre o objeto

// Função para inicializar o aplicativo
async function initializeApp() {
    // Inicia a câmera
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Acessa a câmera do dispositivo
        cameraView.srcObject = stream; // Define a fonte do elemento de vídeo como o fluxo da câmera
    } catch (error) {
        console.error('Erro ao acessar a câmera:', error);
    }

    // Carrega o modelo COCO-SSD
    const model = await cocoSsd.load(); // Carrega o modelo de detecção de objetos COCO-SSD

    // Função para detecção de objetos
    async function detectObjects() {
        const predictions = await model.detect(cameraView); // Faz a detecção de objetos na visualização da câmera

        if (predictions.length > 0) {
            // Exibe informações sobre o objeto reconhecido
            const topPrediction = predictions[0]; // Obtém a primeira previsão (objeto mais provável)
            objectNameElement.textContent = `Objeto: ${topPrediction.class}`; // Exibe o nome do objeto
        } else {
            // Se nenhum objeto for detectado, exibe uma mensagem
            objectNameElement.textContent = 'Nenhum objeto detectado.';
        }

        // Chama a função novamente para detecção contínua
        requestAnimationFrame(detectObjects); // Solicita uma nova animação de quadro para continuar a detecção
    }

    // Inicia a detecção de objetos
    detectObjects(); // Chama a função de detecção para iniciar a detecção contínua
}

// Inicializa o aplicativo quando a página estiver carregada
window.addEventListener('load', initializeApp); // Aguarda o carregamento da página e inicia o aplicativo
