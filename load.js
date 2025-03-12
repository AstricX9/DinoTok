async function loadDinosaurs(type = 'all') {
    try {
        let data;
        if (type === 'all') {
            const response = await fetch('dinosaurs.json');
            data = await response.json();
        } else {
            const response = await fetch(`${type}.json`);
            data = await response.json();
        }
        const container = document.getElementById('container');
        container.innerHTML = '';

        data.dinosaurs.forEach(dino => {
            const card = document.createElement('div');
            card.className = 'dino-card';
            
            card.innerHTML = `
                <img class="dino-image" src="${dino.image_url}" alt="${dino.name}">
                <div class="content">
                    <div class="dino-name">${dino.name}</div>
                    <div class="nickname">${dino.nickname}</div>
                    <div>Period: ${dino.period} (${dino.years_ago})</div>
                    <div>Diet: ${dino.diet}</div>
                    
                    <ul class="quick-facts">
                        ${dino.quick_facts.map(fact => `<li>${fact}</li>`).join('')}
                    </ul>
                    
                    <div class="stats">
                        <div class="stat-item">Length: ${dino.stats.length}</div>
                        <div class="stat-item">Height: ${dino.stats.height}</div>
                        <div class="stat-item">Weight: ${dino.stats.weight}</div>
                        <div class="stat-item">Speed: ${dino.stats.speed}</div>
                    </div>
                    
                    <div class="fun-fact">🤓 ${dino.fun_fact}</div>
                    
                    <div class="hashtags">
                        ${dino.hashtags.map(tag => `<span class="hashtag">${tag}</span>`).join('')}
                    </div>
                    
                    <div class="image-credit">Image: ${dino.image_credit || 'Unknown source'}</div>
                </div>
            `;
            
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading dinosaur data:', error);
    }
}

// Initial load
loadDinosaurs();

// Add event listeners for filter buttons
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Load appropriate dinosaurs
        const type = button.dataset.type;
        loadDinosaurs(type);
    });
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const filterButtons = document.querySelector('.filter-buttons');

hamburger.addEventListener('click', () => {
    filterButtons.classList.toggle('show');
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav')) {
        filterButtons.classList.remove('show');
    }
});

// Close menu when a filter is selected on mobile
if (window.innerWidth <= 768) {
    filterButtons.addEventListener('click', () => {
        filterButtons.classList.remove('show');
    });
}