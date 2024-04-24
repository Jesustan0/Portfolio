document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const size = 4;
    let board = [];
    let currentScore = 0;
    const currentScoreElem = document.getElementById('current-score');

    let highScore = localStorage.getItem('2048-highScore') || 0;
    const highScoreElem = document.getElementById('high-score'); // Correction de l'ID
    highScoreElem.textContent = highScore;

    const gameOverElem = document.getElementById('game-over');

    // Mise à jour du score //
    function updateScore(value) {
        currentScore += value;
        currentScoreElem.textContent = currentScore;
        if (currentScore > highScore) {
            highScore = currentScore;
            highScoreElem.textContent = highScore;
            localStorage.setItem('2048-highScore', highScore);
        }
    }

    // Redémarrer le jeu//
    function restartGame() {
        currentScore = 0;
        currentScoreElem.textContent = '0';
        gameOverElem.style.display = 'none';
        initializeGame();
    }

    // Initialiser le jeu//
    function initializeGame() {
        board = [...Array(size)].map(e => Array(size).fill(0));
        placeRandom();
        placeRandom();
        renderBoard();
    }

    function renderBoard() {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`); // Utilisation de backticks pour les variables
                const prevValue = cell.dataset.value;
                const currentValue = board[i][j];
                if (currentValue != 0) {
                    cell.dataset.value = currentValue;
                    cell.textContent = currentValue;
                    if (currentValue !== parseInt(prevValue) && !cell.classList.contains('new-tile')) {
                        cell.classList.add('merged-title');
                    }
                } else {
                    cell.textContent = '';
                    delete cell.dataset.value;
                    cell.classList.remove('merged-tile', 'new-title');
                }
            }
        }
        setTimeout(() => {
            const cells = document.querySelectorAll('.grid-cell');
            cells.forEach(cell => {
                cell.classList.remove('merged-tile', 'new-tile');
            });
        }, 300);
    }

    function placeRandom() {
        const available = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board[i][j] == 0) {
                    available.push({ x: i, y: j });
                }
            }
        }

        if (available.length > 0) {
            const randomCell = available[Math.floor(Math.random() * available.length)];
            board[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
            const cell = document.querySelector(`[data-row="${randomCell.x}"][data-col="${randomCell.y}"]`); // Utilisation de backticks pour les variables
            cell.classList.add('new-tile');
        }
    }

    function move(direction) {
        let hasChanged = false;
        if (direction === 'ArrowUp' || direction === 'ArrowDown') {
            for (let j = 0; j < size; j++) {
                const column = [...Array(size)].map((_, i) => board[i][j]);
                const newColumn = transForm(column, direction === 'ArrowUp');
                for (let i = 0; i < size; i++) {
                    if (board[i][j] !== newColumn[i]) {
                        hasChanged = true;
                        board[i][j] = newColumn[i];
                    }
                }
            }
        } else if (direction === 'ArrowLeft' || direction === 'ArrowRight') { // Correction de la direction 'ArrowRigth' en 'ArrowRight'
            for (let i = 0; i < size; i++) {
                const row = board[i];
                const newRow = transForm(row, direction === 'ArrowLeft');
                if (row.join(',') !== newRow.join(',')) {
                    hasChanged = true;
                    board[i] = newRow;
                }
            }
        }
        if (hasChanged) {
            placeRandom();
            renderBoard();
            checkGameOver();
        }
    }

    function transForm(line, moveTowardsStart) {
        let newLine = line.filter(cell => cell !== 0);
        if (!moveTowardsStart) {
            newLine.reverse();
        }
        for (let i = 0; i < newLine.length - 1; i++) {
            if (newLine[i] == newLine[i + 1]) {
                newLine[i] *= 2;
                updateScore(newLine[i]); // Correction de la fonction uptdateScore en updateScore
                newLine.splice(i + 1, 1);
            }
        }
        while (newLine.length < size) {
            newLine.push(0);
        }
        if (!moveTowardsStart) {
            newLine.reverse();
        }
        return newLine;
    }

    function checkGameOver() {
        let gameOver = true;
        let available = false; // Ajout d'un indicateur pour les cellules disponibles
    
        // Vérifiez si une fusion est possible dans toutes les directions
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                // Vérifiez si une cellule adjacente a la même valeur
                if ((j < size - 1 && board[i][j] == board[i][j + 1]) || (i < size - 1 && board[i][j] == board[i + 1][j])) {
                    gameOver = false;
                    break;
                }
                // Vérifiez s'il reste des cellules vides
                if (board[i][j] === 0) {
                    available = true;
                }
            }
            if (!gameOver) break;
        }
    
        // Affichez l'élément game-over si la partie est terminée et s'il n'y a plus de cellules vides
        if (gameOver && !available) {
            const gameOverElem = document.getElementById('game-over');
            gameOverElem.style.display = 'flex';
        }
    }
    

    document.addEventListener('keydown', event => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            move(event.key);
        }
    });
    document.getElementById('restart').addEventListener('click', restartGame);
    initializeGame();
});
