let cards = [];
let playerDeck = [], oppDeck = [], aiDeck = [], gameMode = '', gameActive = false, roomId = '';

const categories = ['books', 'awards', 'poems', 'span', 'translations', 'impact'];

// Load CSV data on game start
async function loadCardsFromCSV() {
    try {
        console.log('🔍 Attempting to fetch CSV file...');
        // Load UTF-8 encoded CSV file from data directory
        const response = await fetch('./data/telugu_authors_utf8.csv');
        console.log('📡 Response status:', response.status, response.statusText);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();
        console.log('📄 CSV text length:', csvText.length);
        console.log('📄 First 100 chars:', csvText.substring(0, 100));

        cards = csvToCards(csvText);
        console.log(`✅ Loaded ${cards.length} Telugu authors from CSV!`);
    } catch (error) {
        console.error('💥 CSV load error details:', error);
        console.error('CSV load failed, using fallback deck');
        // Option 2: Expanded fallback deck with 50+ Telugu authors
        cards = [
            // CLASSICAL LEGENDS
            { name: "Viswanatha Satyanarayana", books: 120, awards: 3, poems: 4500, span: 81, translations: 35, impact: 100, gender: "M" },
            { name: "C. Narayana Reddy", books: 75, awards: 5, poems: 8000, span: 70, translations: 28, impact: 98, gender: "M" },
            { name: "Nannaya", books: 1, awards: 0, poems: 5000, span: 50, translations: 15, impact: 99, gender: "M" },
            { name: "Tikkana", books: 2, awards: 0, poems: 8000, span: 60, translations: 12, impact: 98, gender: "M" },
            { name: "Annamacharya", books: 0, awards: 0, poems: 32000, span: 70, translations: 25, impact: 100, gender: "M" },
            { name: "Potana", books: 1, awards: 0, poems: 12000, span: 65, translations: 20, impact: 99, gender: "M" },
            { name: "Vemana", books: 0, awards: 0, poems: 3000, span: 60, translations: 18, impact: 98, gender: "M" },

            // CLASSICAL WOMEN WRITERS
            { name: "Molla", books: 1, awards: 0, poems: 1500, span: 90, translations: 18, impact: 98, gender: "F" },
            { name: "Tarigonda Vengamamba", books: 1, awards: 0, poems: 10000, span: 70, translations: 15, impact: 97, gender: "F" },
            { name: "Muddupalani", books: 1, awards: 0, poems: 2000, span: 60, translations: 10, impact: 94, gender: "F" },

            // MODERN GIANTS
            { name: "Kandukuri Veeresalingam", books: 65, awards: 1, poems: 1800, span: 75, translations: 28, impact: 97, gender: "M" },
            { name: "Gurram Jashuva", books: 15, awards: 1, poems: 2800, span: 55, translations: 12, impact: 95, gender: "M" },
            { name: "Rayaprolu Subba Rao", books: 12, awards: 2, poems: 3500, span: 92, translations: 18, impact: 96, gender: "M" },
            { name: "Devulapalli Krishnasastri", books: 35, awards: 3, poems: 6500, span: 65, translations: 22, impact: 97, gender: "M" },
            { name: "Kaloji Narayana Rao", books: 20, awards: 4, poems: 4500, span: 85, translations: 20, impact: 96, gender: "M" },

            // REVOLUTIONARY POETS
            { name: "Sri Sri", books: 28, awards: 2, poems: 8500, span: 68, translations: 25, impact: 99, gender: "M" },
            { name: "Srirangam Srinivasa Rao", books: 18, awards: 1, poems: 5200, span: 60, translations: 22, impact: 95, gender: "M" },
            { name: "Gurajada Apparao", books: 5, awards: 1, poems: 1800, span: 45, translations: 20, impact: 95, gender: "M" },

            // MODERN NOVELISTS  
            { name: "Yaddanapudi Sulochana Rani", books: 92, awards: 1, poems: 200, span: 55, translations: 40, impact: 95, gender: "F" },
            { name: "Ranganayakamma", books: 85, awards: 2, poems: 500, span: 60, translations: 25, impact: 93, gender: "F" },
            { name: "Chalam", books: 25, awards: 1, poems: 1200, span: 70, translations: 20, impact: 92, gender: "M" },
            { name: "Volga", books: 18, awards: 3, poems: 1500, span: 50, translations: 30, impact: 94, gender: "F" },

            // SAHITYA AKADEMI WINNERS
            { name: "Tripuraneni Gopichand", books: 22, awards: 1, poems: 1800, span: 45, translations: 15, impact: 92, gender: "M" },
            { name: "Kodavatiganti Kutumbarao", books: 45, awards: 1, poems: 900, span: 70, translations: 18, impact: 91, gender: "M" },
            { name: "Malladi Venkata Krishna Murthy", books: 153, awards: 1, poems: 3000, span: 65, translations: 22, impact: 94, gender: "M" },
            { name: "Potturi Vijayalakshmi", books: 35, awards: 1, poems: 2500, span: 60, translations: 18, impact: 92, gender: "F" },
            { name: "Bhandaru Acchamamba", books: 12, awards: 1, poems: 1800, span: 70, translations: 12, impact: 90, gender: "F" },

            // CONTEMPORARY AUTHORS
            { name: "Kanchala Anjaneya Prasad", books: 68, awards: 2, poems: 3200, span: 55, translations: 25, impact: 93, gender: "M" },
            { name: "Madhuranthakam Rajaram", books: 42, awards: 1, poems: 2800, span: 65, translations: 20, impact: 91, gender: "M" },
            { name: "K. Varalakshmi", books: 28, awards: 2, poems: 2200, span: 58, translations: 18, impact: 92, gender: "F" },
            { name: "Seethadevi Vasireddy", books: 45, awards: 2, poems: 1500, span: 62, translations: 25, impact: 93, gender: "F" },

            // DALIT & FEMINIST VOICES
            { name: "Gogu Shyamala", books: 12, awards: 2, poems: 800, span: 45, translations: 25, impact: 92, gender: "F" },
            { name: "Ampasayya Naveen", books: 28, awards: 1, poems: 2200, span: 50, translations: 22, impact: 91, gender: "M" },
            { name: "Nellutla Ramadevi", books: 35, awards: 1, poems: 1800, span: 55, translations: 20, impact: 90, gender: "F" },

            // ADDITIONAL NOTABLE AUTHORS
            { name: "Aarudra", books: 25, awards: 1, poems: 1200, span: 45, translations: 15, impact: 88, gender: "M" },
            { name: "Adivi Bapiraju", books: 18, awards: 1, poems: 900, span: 50, translations: 12, impact: 87, gender: "M" },
            { name: "Pingali Suranna", books: 3, awards: 0, poems: 2500, span: 55, translations: 10, impact: 95, gender: "M" },
            { name: "Tenali Ramakrishna", books: 2, awards: 0, poems: 1800, span: 40, translations: 8, impact: 94, gender: "M" },
            { name: "Chemakura Venkata Kavi", books: 1, awards: 0, poems: 4500, span: 50, translations: 7, impact: 93, gender: "M" },
            { name: "Tallapaka Timmakka", books: 0, awards: 0, poems: 8000, span: 75, translations: 12, impact: 96, gender: "F" },
            { name: "Atukuri Molla", books: 2, awards: 0, poems: 1200, span: 65, translations: 8, impact: 92, gender: "F" },
            { name: "Buchibabu", books: 38, awards: 1, poems: 800, span: 55, translations: 15, impact: 90, gender: "M" },
            { name: "Vempalli Shariff", books: 22, awards: 1, poems: 3800, span: 50, translations: 20, impact: 94, gender: "M" },
            { name: "Ajjada Adibhatla Narayana Dasu", books: 8, awards: 0, poems: 2500, span: 60, translations: 10, impact: 89, gender: "M" },
            { name: "Anjaneyulu Kundurti", books: 22, awards: 1, poems: 1500, span: 55, translations: 14, impact: 86, gender: "M" },
            { name: "Asavadi Prakasarao", books: 15, awards: 1, poems: 1100, span: 50, translations: 12, impact: 85, gender: "M" },
            { name: "Balagangadhara Tilak", books: 12, awards: 2, poems: 2000, span: 60, translations: 18, impact: 90, gender: "M" },
            { name: "Bhargavi Rao", books: 28, awards: 1, poems: 600, span: 52, translations: 22, impact: 88, gender: "F" },
            { name: "Bulusu Appana Sastry", books: 18, awards: 1, poems: 2500, span: 70, translations: 15, impact: 90, gender: "M" },
            { name: "Chandrabose", books: 10, awards: 3, poems: 5000, span: 45, translations: 25, impact: 92, gender: "M" }
        ];
    }
}

// Parse CSV to cards array
function csvToCards(csvText) {
    const lines = csvText.split('\n').slice(1); // Skip header
    return lines.map((line, index) => {
        // Skip empty lines
        if (!line.trim()) return null;

        const parts = line.split(',');
        // Ensure we have at least 8 parts
        if (parts.length < 8) {
            console.warn(`⚠️ Line ${index + 2} has only ${parts.length} parts:`, line);
            return null;
        }

        const [name, books, awards, poems, span, translations, impact, gender] = parts;

        // Check if name exists (required field)
        if (!name || !name.trim()) {
            console.warn(`⚠️ Line ${index + 2} missing name:`, line);
            return null;
        }

        return {
            name: name ? name.replace(/"/g, '').trim() : 'U',
            books: books === '"NA"' || books === '"unknown"' ? books : parseInt(books) || -1,
            awards: awards === '"NA"' || awards === '"unknown"' ? awards : parseInt(awards) || -1,
            poems: poems === '"unknown"' ? "unknown" : parseInt(poems) || -1,
            span: parseInt(span) || -1,
            translations: parseInt(translations) || -1,
            impact: parseInt(impact) || -1,
            gender: gender ? gender.replace(/"/g, '').trim() : 'U'
        };
    }).filter(card => card && card.name); // Remove null entries and empty names
}

// Update start functions to load CSV first
async function startSinglePlayer() {
    await loadCardsFromCSV();  // Load 250 authors
    gameMode = 'single';
    window.tiedCards = []; // Clear any previous tied cards
    document.getElementById('mode-select').classList.add('hidden');
    document.getElementById('game-status').classList.remove('hidden');
    document.getElementById('game-board').classList.remove('hidden');
    document.getElementById('room-info').classList.remove('hidden'); // Show card counts

    document.getElementById('room-code').textContent = ''; // Clear room code for single player
    dealCards();
    gameActive = true;
    showPlayerCard();
    updateCounts(); // Update counts immediately
    document.getElementById('message').textContent = `VS AI! ${cards.length} authors loaded. Pick category!`;
    document.getElementById('restart-btn').classList.remove('hidden');
}

async function createRoom() {
    await loadCardsFromCSV();  // Load 250 authors
    gameMode = 'multi';
    window.tiedCards = []; // Clear any previous tied cards
    roomId = 'ROOM-' + Math.random().toString(36).substr(2, 4).toUpperCase();

    document.getElementById('mode-select').classList.add('hidden');
    document.getElementById('game-status').classList.remove('hidden');
    document.getElementById('room-info').classList.remove('hidden');
    document.getElementById('game-board').classList.remove('hidden');

    document.getElementById('room-code').textContent = `Room: ${roomId}`;
    dealCards();
    gameActive = true;
    showPlayerCard();
    document.getElementById('message').textContent = `Room ${roomId} created! Share link with friend. ${cards.length} authors loaded.`;
    document.getElementById('restart-btn').classList.remove('hidden');
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function dealCards() {
    const deck = [...cards]; // Copy full deck
    shuffle(deck);
    playerDeck = deck.slice(0, Math.ceil(deck.length / 2));
    if (gameMode === 'single') {
        aiDeck = deck.slice(Math.ceil(deck.length / 2));
        oppDeck = aiDeck; // For compatibility
    } else {
        oppDeck = deck.slice(Math.ceil(deck.length / 2));
    }
    updateCounts();
}

function showPlayerCard() {
    if (playerDeck.length === 0) return;
    const cardDiv = document.getElementById('player-card');
    const nameEl = document.getElementById('player-name');
    const statsDiv = document.querySelector('#player-card .stats');
    const buttonsDiv = document.querySelector('#player-card .buttons');

    nameEl.textContent = playerDeck[0].name;
    statsDiv.innerHTML = '';
    buttonsDiv.innerHTML = '';  // Clear old buttons first

    categories.forEach(cat => {
        const div = document.createElement('div');
        div.innerHTML = `<span>${cat.toUpperCase()}</span><span>${playerDeck[0][cat]}</span>`;
        statsDiv.appendChild(div);

        // Create category button
        const btn = document.createElement('button');
        btn.textContent = `${cat.toUpperCase()}: ${playerDeck[0][cat]}`;
        btn.dataset.category = cat;
        btn.onclick = (e) => playRound(e.target.dataset.category);
        buttonsDiv.appendChild(btn);
    });

    cardDiv.style.display = 'block';
}

function showOppCard(category) {  // ✅ category parameter!
    const currentDeck = gameMode === 'single' ? aiDeck : oppDeck;
    if (currentDeck.length === 0) return;

    const cardDiv = document.getElementById('ai-card');
    const nameEl = document.getElementById('ai-name');
    const statsDiv = document.querySelector('#ai-card .stats');

    nameEl.textContent = gameMode === 'single' ? currentDeck[0].name : currentDeck[0].name;
    statsDiv.innerHTML = '';

    // ✅ HIGHLIGHT ONLY SELECTED CATEGORY
    categories.forEach(cat => {
        const div = document.createElement('div');
        const value = getNumericValue(currentDeck[0][cat]);

        if (cat === category) {
            // 🔥 SELECTED CATEGORY - YELLOW HIGHLIGHT
            div.className = 'stat-highlight';
            div.innerHTML = `<span>⚔️ ${cat.toUpperCase()}</span><span>${value}</span>`;
        } else {
            div.className = 'stat';
            div.innerHTML = `<span>${cat.toUpperCase()}</span><span>${value}</span>`;
        }
        statsDiv.appendChild(div);
    });

    cardDiv.style.display = 'block';
    cardDiv.classList.remove('hidden');
}


function playRound(category) {
    console.log('🎯 SELECTED CATEGORY:', category);  // Debug log
    if (!gameActive || playerDeck.length === 0) return;

    // 🔥 Clone cards immediately
    const playerCard = { ...playerDeck[0] };
    const playerValue = getNumericValue(playerCard[category]);
    let oppValue, oppCategory, currentDeck, oppCard;

    if (gameMode === 'single') {
        // AI mode - AI uses same category as player
        currentDeck = aiDeck;
        oppCard = { ...aiDeck[0] };
        oppCategory = category;
        oppValue = getNumericValue(oppCard[category]);
    } else {
        // Multiplayer - for now, opponent uses same category (simplified)
        currentDeck = oppDeck;
        oppCard = { ...oppDeck[0] };
        oppCategory = category;
        oppValue = getNumericValue(oppCard[category]);
    }

    console.log('📊 VALUES:', { playerValue, oppValue, playerCard: playerCard.name, oppCard: oppCard.name });  // Debug log

    showOppCard(category);

    const opponentName = gameMode === 'single' ? 'AI' : 'Opponent';
    document.getElementById('message').textContent =
        `${category.toUpperCase()}: ${playerCard.name} (${playerValue}) vs ${oppCard.name} (${oppValue})`;

    setTimeout(() => {
        if (playerValue > oppValue) {
            document.getElementById('message').textContent =
                `🎉 YOU WIN ${category.toUpperCase()}! ${playerCard.name}'s ${category} (${playerValue}) > ${oppCard.name}'s ${category} (${oppValue})`;

            // Player wins - gets current cards plus any tied cards
            playerDeck.push(playerDeck.shift(), currentDeck.shift());
            if (window.tiedCards && window.tiedCards.length > 0) {
                playerDeck.push(...window.tiedCards);
                document.getElementById('message').textContent += ` + ${window.tiedCards.length} tied cards!`;
                window.tiedCards = [];
            }
        } else if (oppValue > playerValue) {
            document.getElementById('message').textContent =
                `😢 ${opponentName.toUpperCase()} WINS ${category.toUpperCase()}! ${oppCard.name}'s ${category} (${oppValue}) > ${playerCard.name}'s ${category} (${playerValue})`;

            // Opponent wins - gets current cards plus any tied cards
            currentDeck.push(currentDeck.shift(), playerDeck.shift());
            if (window.tiedCards && window.tiedCards.length > 0) {
                currentDeck.push(...window.tiedCards);
                document.getElementById('message').textContent += ` + ${window.tiedCards.length} tied cards!`;
                window.tiedCards = [];
            }
        } else {
            // TIE - both cards go to winner of next round
            document.getElementById('message').textContent =
                `🤝 TIE ${category.toUpperCase()}! Both have ${category} (${playerValue}). Drawing new cards...`;

            // Remove tied cards and put them in a temporary pot
            const playerTiedCard = playerDeck.shift();
            const oppTiedCard = currentDeck.shift();

            // Check if there are more cards to play
            if (playerDeck.length === 0 || currentDeck.length === 0) {
                document.getElementById('message').textContent = 'Game Over after tie! Click Restart.';
                updateCounts();
                checkWinCondition();
                return;
            }

            // Store tied cards for the winner of next round
            if (!window.tiedCards) window.tiedCards = [];
            window.tiedCards.push(playerTiedCard, oppTiedCard);

            // Show new cards immediately
            setTimeout(() => {
                showPlayerCard();
                document.getElementById('message').textContent = `Tie! Winner of next round gets ${window.tiedCards.length} cards. Pick category!`;
                document.getElementById('ai-card').classList.add('hidden');
            }, 1500);
            return;
        }

        updateCounts();
        checkWinCondition();
        document.querySelector('#player-card .buttons').innerHTML = '';
        document.getElementById('next-btn').classList.remove('hidden');
    }, 2000);
}


// Helper function to handle "NA"/"unknown" values
function getNumericValue(value) {
    if (value === "NA" || value === "unknown" || value === '"NA"' || value === '"unknown"' || value === -1) {
        return 0;  // NA/unknown/-1 loses comparison
    }
    return typeof value === 'number' ? value : parseInt(value) || 0;
}

function nextRound() {
    document.getElementById('ai-card').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');
    document.querySelector('#player-card .buttons').innerHTML = '';

    if (playerDeck.length === 0 || aiDeck.length === 0) {
        document.getElementById('message').textContent = 'Game Over! Click Restart.';
        return;
    }

    showPlayerCard();
    document.getElementById('message').textContent = 'Your turn! Pick a category.';
}

function checkWinCondition() {
    if (playerDeck.length === 0) {
        const opponentName = gameMode === 'single' ? 'AI' : 'Opponent';
        document.getElementById('message').textContent = `${opponentName} Wins! Click Restart.`;
    } else if ((gameMode === 'single' && aiDeck.length === 0) || (gameMode === 'multi' && oppDeck.length === 0)) {
        document.getElementById('message').textContent = 'You Win! Click Restart.';
    }
}


function updateCounts() {
    const potCount = window.tiedCards ? window.tiedCards.length : 0;

    document.getElementById('player-count').textContent = playerDeck.length;
    if (gameMode === 'single') {
        document.getElementById('ai-count').textContent = aiDeck.length;
    } else {
        document.getElementById('ai-count').textContent = oppDeck.length;
    }
    document.getElementById('pot-count').textContent = potCount;
}

// Event Listeners - removed start-btn since HTML uses inline onclick
document.getElementById('next-btn').onclick = nextRound;
document.getElementById('restart-btn').onclick = () => location.reload();

// Add restartGame function for compatibility
function restartGame() {
    location.reload();
}
