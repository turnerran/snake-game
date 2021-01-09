export const COLORS = {
    WALL: '#383522',
    REGULAR: '#86B5BD',
    SNAKE: '#C8F7C5',
    HEAD: 'blue',
    FOOD: '#EC644B',
    LOST: 'red',
    WIN: 'green'
}

export enum SpotType {
    Wall,
    Empty,
    SnakeBody,
    SnakeHead,
    Food
}

export const MOVES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };

  export const BOARD_SIZE = 10;

  export const TIME_INTERVAL = 1000;