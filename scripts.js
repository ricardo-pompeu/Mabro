document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleThemeButton = document.getElementById('toggle-theme');

    // Aplica o tema salvo ao carregar qualquer página
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(savedTheme + "-mode"); // Adiciona a classe corretamente

    // Função para alternar o tema
    function applyTheme(theme) {
        body.classList.remove('dark-mode', 'light-mode'); // Remove classes antigas
        body.classList.add(theme + "-mode"); // Adiciona a nova classe
        localStorage.setItem('theme', theme); // Salva no localStorage
    }

    // Adiciona evento de clique no botão de alternância
    if (toggleThemeButton) {
        toggleThemeButton.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
});







// Código do Sidebar
document.addEventListener("DOMContentLoaded", () => {
    const openSidebar = document.getElementById("openSidebar");
    const closeSidebar = document.getElementById("closeSidebar");
    const overlay = document.getElementById("overlay");
    const sidebar = document.getElementById("sidebar");

    if (openSidebar) {
        openSidebar.onclick = () => {
            sidebar.style.right = "0";
            overlay.style.display = "block";
        };
    }

    if (closeSidebar) {
        closeSidebar.onclick = () => {
            sidebar.style.right = "-280px";
            overlay.style.display = "none";
        };
    }

    if (overlay) {
        overlay.onclick = () => {
            sidebar.style.right = "-280px";
            overlay.style.display = "none";
        };
    }
});










/*----------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.background-image-mireral');
    const leftButton = document.getElementById('leftimg');
    const rightButton = document.getElementById('rightimg');
    const indicatorsContainer = document.querySelector('.indicators');

    // Lista de imagens de fundo
    const images = [
        'url(../Src/imagem1.jpg)',
        'url(../Src/imagem2.jpg)',
        'url(../Src/imagem3.jpg)',
        'url(../Src/imagem4.jpg)',
        'url(../Src/imagem5.jpg)'
    ];

    let currentIndex = 0;
    let autoChangeInterval;

    // Função para atualizar a imagem de fundo e os indicadores
    function updateBackground() {
        banner.style.backgroundImage = images[currentIndex];
        updateIndicators();
    }

    // Função para criar os indicadores (bolinhas)
    function createIndicators() {
        indicatorsContainer.innerHTML = ''; // Limpa o contêiner
        images.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateBackground();
                resetAutoChange(); // Reinicia o intervalo ao clicar em uma bolinha
            });
            indicatorsContainer.appendChild(indicator);
        });
        updateIndicators(); // Atualiza os indicadores ao carregar a página
    }

    // Função para atualizar o estado dos indicadores
    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicators span');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Função para avançar para a próxima imagem
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateBackground();
    }

    // Função para retroceder para a imagem anterior
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateBackground();
    }

    // Função para reiniciar o intervalo de transição automática
    function resetAutoChange() {
        clearInterval(autoChangeInterval); // Para o intervalo atual
        autoChangeInterval = setInterval(nextImage, 12000); // Reinicia o intervalo
    }

    // Navegação para a esquerda
    leftButton.addEventListener('click', function() {
        prevImage();
        resetAutoChange(); // Reinicia o intervalo ao clicar no botão
    });

    // Navegação para a direita
    rightButton.addEventListener('click', function() {
        nextImage();
        resetAutoChange(); // Reinicia o intervalo ao clicar no botão
    });

    // Criar os indicadores ao carregar a página
    createIndicators();

    // Definir a imagem inicial
    updateBackground();

    // Iniciar a transição automática
    autoChangeInterval = setInterval(nextImage, 12000);
});


/*--------------------------------------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const carrossel = document.querySelector('.carrossel');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let autoPlayInterval;
    const intervalTime = 3000; // 5 segundos (ajuste conforme necessário)
    
    // Inicializa o carrossel
    function initCarrossel() {
        updateCarrossel();
        startAutoPlay();
        
        // Event listeners para os botões
        prevBtn.addEventListener('click', () => {
            goToPrevSlide();
            resetAutoPlay();
        });
        
        nextBtn.addEventListener('click', () => {
            goToNextSlide();
            resetAutoPlay();
        });
        
        // Event listeners para os dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.getAttribute('data-index'));
                goToSlide(slideIndex);
                resetAutoPlay();
            });
        });
        
        // Event listeners para touch
        carrossel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carrossel.addEventListener('touchmove', handleTouchMove, { passive: false });
        carrossel.addEventListener('touchend', handleTouchEnd);
        
        // Pausar autoplay quando o mouse estiver sobre o carrossel
        carrossel.addEventListener('mouseenter', pauseAutoPlay);
        carrossel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Atualiza a posição do carrossel
    function updateCarrossel() {
        carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }
    
    // Atualiza os dots ativos
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Navega para o slide anterior
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarrossel();
    }
    
    // Navega para o próximo slide
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarrossel();
    }
    
    // Navega para um slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateCarrossel();
    }
    
    // Handlers para touch events
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        carrossel.style.transition = 'none';
        pauseAutoPlay();
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        
        if (Math.abs(diff) > 10) {
            e.preventDefault();
            carrossel.style.transform = `translateX(calc(-${currentIndex * 100}% - ${diff}px))`;
        }
    }
    
    function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50;
        
        carrossel.style.transition = 'transform 0.5s ease';
        
        if (diff > threshold) {
            goToNextSlide();
        } else if (diff < -threshold) {
            goToPrevSlide();
        } else {
            carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        startAutoPlay();
    }
    
    // Funções para o autoplay
    function startAutoPlay() {
        // Limpa o intervalo existente antes de iniciar um novo
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        autoPlayInterval = setInterval(goToNextSlide, intervalTime);
    }
    
    function pauseAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    function resetAutoPlay() {
        pauseAutoPlay();
        startAutoPlay();
    }
    
    initCarrossel();
});