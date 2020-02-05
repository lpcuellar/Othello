const root = document.getElementById('root');

// Se generan y se muestran las casillas, se genera el tablero
const renderBoard = (turn, state, i, j) => {
    const board = document.createElement('div');
    board.style.width = '60px';
    board.style.height = '60px';
    board.style.backgroundColor = 'green';
    board.style.borderColor = 'darkgreen';
    board.style.borderWidth = '2px';
    board.style.borderStyle = 'solid';
    board.style.alignItems = 'center';

    const disc = renderDisc(turn, state, i, j);
    board.appendChild(disc);

    return board;
}

// Se generan las fichas de ambos jugadores y los botones de los posibles movimientos
const renderDisc = (turn, state, i, j) => {
    const disc = state === 1 || state === 2 ? document.createElement('div') : document.createElement('button');
    disc.style.height = '50px';
    disc.style.width = '50px';
    disc.style.borderRadius = '50%';
    disc.style.borderStyle = 'solid';
    disc.style.borderWidth = '2px';
    disc.style.borderColor = state === 1 ? 'white' : 'black';
    disc.style.marginTop = '4px';
    disc.style.marginLeft = '4px';
    disc.style.backgroundColor = state === 1 ? 'black' : 'white';

    if (state === 0) {
        disc.style.opacity = '0';
    } else if (state === -1) {
        disc.style.opacity = '0.25';
        disc.onclick = () => {
            appState.grid[i][j] = turn;
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (appState.grid[i][j] === -1) {
                        appState.grid[i][j] = 0;
                    }
                }
            }
            flipDisc(turn, i, j, appState.grid);
            appState.turn = turn === 1 ? 2 : 1;
            root.innerHTML = ' ';
            render(root, appState);
        }
    }
    return disc;
}

// Se hace una lista con posibles movimientos
const possibleMoves = (turn, grid) => {
    const chart = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (grid[i][j] === 0) {
                let n = validMove(turn, -1, 0, i, j, appState.grid);
                let nW = validMove(turn, -1, -1, i, j, appState.grid);
                let w = validMove(turn, 0, -1, i, j, appState.grid);
                let sW = validMove(turn, 1, -1, i, j, appState.grid);
                let s = validMove(turn, 1, 0, i, j, appState.grid);
                let sE = validMove(turn, 1, 1, i, j, appState.grid);
                let e = validMove(turn, 0, 1, i, j, appState.grid);
                let nE = validMove(turn, -1, 1, i, j, appState.grid);

                if (n || nW || w || sW || s || sE || e || nE) {
                    chart[i][j] = turn;
                }
            }
        }
    }
    return chart;
}

// Se revisa que sea un posible movimiento, regresa true o false
const validMove = (turn, r, c, i, j, grid) => {
    const opposite = turn === 1 ? 2 : 1;
    if ((r + i < 0) || (r + i > 7)) {
        return false;
    }

    if ((c + j < 0) || (c + j > 7)) {
        return false;
    }

    if (grid[r + i][c + j] != opposite) {
        return false;
    }

    if ((r + r + i < 0) || (r + r + i > 7)) {
        return false;
    }

    if ((c + c + j < 0) || (c + c + j > 7)) {
        return false;
    }

    return checkMatch(turn, r, c, r + r + i, c + c + j, grid);
}

// Hace el recorrido en el grid para ver movimientos son legales
const checkMatch = (turn, r, c, i, j, grid) => {
    if (grid[i][j] === turn) {
        return true;
    }

    if ((r + i < 0) || (r + i > 7)) {
        return false;
    }

    if ((c + j < 0) || (c + j > 7)) {
        return false;
    }

    return checkMatch(turn, r, c, r + i, c + j, grid);
}

// Se encarga de cambiar las fichas de color cuando sea necesario
const flipDisc = (turn, i, j, grid) => {
    flipLine(turn, -1, 0, i, j, grid);
    flipLine(turn, -1, -1, i, j, grid);
    flipLine(turn, 0, -1, i, j, grid);
    flipLine(turn, 1, -1, i, j, grid);
    flipLine(turn, 1, 0, i, j, grid);
    flipLine(turn, 1, 1, i, j, grid);
    flipLine(turn, 0, 1, i, j, grid);
    flipLine(turn, -1, 1, i, j, grid);
}

// Hace el recorrido en el grid para ver qué fichas tiene que cambiar de color
const flipLine = (turn, r, c, i, j, grid) => {
    if ((r + i < 0) || (r + i > 7)) {
        return false;
    }

    if ((c + j < 0) || (c + j > 7)) {
        return false;
    }

    if (grid[r + i][c + j] === 0) {
        return false;
    }

    if (grid[r + i][c + j] === turn) {
        return true;
    } else {
        if (flipLine(turn, r, c, i + r, j + c, grid)) {
            grid[r + i][c + j] = turn;
            return true;
        } else {
            return false;
        }
    }
}

// Donde son llamadas todas las funciones, renderiza el background,
// título, marcador, fichas y tablero. 
const render = (mount, state) => {
    const { turn } = state;
    const { grid } = state;

    const gameTable = document.createElement('div');
    gameTable.style.width = '512px';
    gameTable.style.height = '512px';
    gameTable.style.backgroundColor = 'black';
    gameTable.style.alignItems = 'center';
    gameTable.style.display = 'flex';
    gameTable.style.flexDirection = 'row';
    gameTable.style.flexWrap = 'wrap';
    gameTable.style.justifyContent = 'center';
    gameTable.style.padding = '5px';

    // se genera un array con los posibles movimientos, los cuales
    // son metidos en el array principal como "-1" para que se puedan
    // generar los botones de "posibles movimientos"
    const possibilities = possibleMoves(turn, grid);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((possibilities[i][j] === turn) && (grid[i][j] != 1) && (grid[i][j] != 2)) {
                grid[i][j] = -1;
            }
        }
    }

    // Se renderiza el tablero con las fichas de ambos jugadores
    const renderGrid = grid;
    renderGrid.map(
        (row, i) => row.map(
            (column, j) => renderBoard(turn, renderGrid[i][j], i, j)
        ).forEach(
            section => gameTable.appendChild(section)
        )
    );

    // Se edita el root para que tenga una mejor apariencia
    mount.style.backgroundColor = '#1b2630';
    mount.style.width = '100%';
    mount.style.height = '100%';
    mount.style.alignItems = 'center';
    mount.style.justifyContent = 'center';
    mount.style.display = 'flex';
    mount.style.flexDirection = 'column';
    mount.style.padding = ' 20px';

    // Se crea el título del juego
    const title = document.createElement('h1');
    title.style.color = '#ffffff';
    title.textContent = 'OTHELLO';
    title.style.fontFamily = "Arial, Helvetica, sans-serif";
    title.style.fontSize = '48px';

    // Se crea un flex para que contenga toda la información del marcador
    const score = document.createElement('div');
    score.style.display = 'flex';
    score.style.flexDirection = ' row';
    score.style.justifyContent = 'center';
    score.style.alignItems = 'center';
    score.style.marginTop = '16px';
    score.style.marginBottom = '16px';

    // Se crea una ficha blanca para acompañar al marcador de las fichas blancas
    const whiteChip = document.createElement('div');
    whiteChip.style.height = '50px';
    whiteChip.style.width = '50px';
    whiteChip.style.borderRadius = '50%';
    whiteChip.style.borderStyle = 'solid';
    whiteChip.style.borderWidth = '2px';
    whiteChip.style.borderColor = 'black';
    whiteChip.style.marginTop = '4px';
    whiteChip.style.marginRight = '12px';
    whiteChip.style.backgroundColor = 'white';
    score.appendChild(whiteChip);

    // Se encarga de verificar que todavía hayan movimientos disponibles, cuenta cuantas
    // fichas hay de cada color
    var fichasN = 0;
    var fichasB = 0;
    var disponible = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (grid[i][j] === 1) {
                fichasN += 1;
            } else if (grid[i][j] === 2) {
                fichasB += 1;
            } else {
                disponible += 1;
            }
        }
    }

    // Un texto que indica cuántas fichas blancas tiene el jugador, se incorpora al marcador
    const blancas = document.createElement('h2');
    blancas.textContent = "Blancas: " + fichasB + "   ";
    blancas.style.fontFamily = "Arial, Helvetica, sans-serif";
    blancas.style.fontSize = '24px';
    blancas.style.color = 'white';
    blancas.style.marginRight = '8px';
    score.appendChild(blancas);

    // Un texto que indica cuántas fichas negras tiene el jugador, se incorpora al marcador
    const negras = document.createElement('h2');
    negras.textContent = "-    " + fichasN + " :Negras";
    negras.style.fontFamily = "Arial, Helvetica, sans-serif";
    negras.style.fontSize = '24px';
    negras.style.color = 'white';
    score.appendChild(negras);

    // Se crea una ficha negra para acompañar al marcador de las fichas negras
    const blackChip = document.createElement('div');
    blackChip.style.height = '50px';
    blackChip.style.width = '50px';
    blackChip.style.borderRadius = '50%';
    blackChip.style.borderStyle = 'solid';
    blackChip.style.borderWidth = '2px';
    blackChip.style.borderColor = 'white';
    blackChip.style.marginTop = '4px';
    blackChip.style.marginLeft = '12px';
    blackChip.style.backgroundColor = 'black';
    score.appendChild(blackChip);

    // Mensaje del ganador del juego
    if (disponible === 0) {
        if (fichasN > fichasB) {
            alert("Felicidades! \nHa ganado las fichas negras con " + fichasN + " fichas!");
        } else {
            alert("Felicidades! \nHa ganado las fichas blancas con " + fichasB + " fichas!");

        }
    }

    mount.appendChild(title);
    mount.appendChild(gameTable);
    mount.appendChild(score);

}

const appState = {
    grid: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    turn: 1,
};

render(root, appState);