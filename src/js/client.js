import _ from 'lodash';

const root = document.getElementById('root');

const renderLayout = (state, turn, i, j) => {
    const color = state;
    const board = document.createElement('div');
    board.style.width = '60px';
    board.style.height = '60px';
    //board.style.borderRadius = '5px';
    board.style.backgroundColor = 'green';
    board.style.borderColor = 'darkgreen';
    board.style.borderWidth = '2px';
    board.style.borderStyle = 'solid';
    board.style.alignItems = 'center';

    const ficha = state === 0 ? document.createElement('button') : document.createElement('div');
    ficha.style.height = '50px';
    ficha.style.width = '50px';
    ficha.style.borderRadius = '50%';
    ficha.style.borderStyle = 'solid';
    ficha.style.borderWidth = '2px';
    ficha.style.marginTop = '4px';
    ficha.style.marginLeft = '4px';
    //console.log(state);

    if (color != 0) {
        ficha.style.backgroundColor = color === 1 ? 'black' : 'white';
        //console.log(state);
    } else {

        //  generar posibles movimientos

        ficha.style.backgroundColor = '#6b8085';
        ficha.style.opacity = '0.25';
        console.log('si entra bro');


        ficha.onclick = () => {
            ficha.style.opacity = '1';
            app_State.grid[i][j] = app_State.turn === 1 ? 1 : 2;
            app_State.turn = turn === 1 ? 2 : 1;
            root.innerHTML = ' ';
            render(root, app_State);
            //console.table(app_State.grid);
        }
    }
    board.appendChild(ficha);
    return board;
}

const movimientosPosibles = (turn, grid, i, j) => {

}

const render = (mount, state) => {

    const { turn } = state;
    const { grid } = state;

    //  Creación del tablero
    const tablero = document.createElement('div');
    tablero.style.alignItems = 'center';
    tablero.style.justifyContent = 'center';
    tablero.style.backgroundColor = 'black';
    tablero.style.borderRadius = '5px';
    tablero.style.display = 'flex';
    tablero.style.flexDirection = 'wrap';
    tablero.style.flexWrap = 'wrap';
    tablero.style.height = '512px';
    tablero.style.padding = '5px';
    tablero.style.width = '512px';
    mount.appendChild(tablero);

    const renderGrid = grid;

    //  Creación de las casillas junto con las fichas
    renderGrid.map(
        (row, i) => row.map(
            (column, j) => renderLayout(renderGrid[i][j], turn, i, j)
        ).forEach(
            section => tablero.appendChild(section)
        ));
};

const app_State = {
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

render(root, app_State);