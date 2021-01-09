import { Component, OnInit, HostListener } from '@angular/core';
import {COLORS, MOVES, BOARD_SIZE, SpotType, TIME_INTERVAL} from '../consts/game-const';
import {Spot} from '../models/spot';
import {Snake} from '../models/snake';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.css']
})
export class GameContainerComponent implements OnInit {
  board: SpotType[][];
  public edges = [0, BOARD_SIZE - 1];
  public isGameOver = false;
  private snake: Snake;
  private food: Spot;
  public isWin: boolean;
  validSpots = [SpotType.Food, SpotType.Empty];
  validMoves = [MOVES.DOWN, ,MOVES.LEFT, MOVES.RIGHT, MOVES.UP];
  private spotType = SpotType;
  private snakeBodyType: SpotType;
  public score = 0;
  private currentMove: number;

  constructor() { 
    this.setBoard();
    this.food = {column: 0, row: 0}
  }

  ngOnInit() {
    this.setFoodPosition();
    let halfPosition = Math.round(BOARD_SIZE / 2) - 1;
    this.snake = {direction: MOVES.DOWN, body: [{row: halfPosition, column: halfPosition}, {row: halfPosition, column: halfPosition + 1}, {row: halfPosition, column: halfPosition + 2}]};
    this.currentMove = MOVES.DOWN;
    this.playMove()
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.isGameOver){
      return;
    }
    if (this.validMoves.includes(event.keyCode)) {
      if (event.keyCode === MOVES.DOWN) {
        if (this.snake.direction !== MOVES.UP){
            this.currentMove = MOVES.DOWN;
        }
      }
      else if (event.keyCode === MOVES.UP) {
        if (this.snake.direction !== MOVES.DOWN){
          this.currentMove = MOVES.UP;
        }
      }
      else if (event.keyCode === MOVES.RIGHT) {
        if (this.snake.direction !== MOVES.LEFT){
          this.currentMove = MOVES.RIGHT;
        }
      }
      else if (event.keyCode === MOVES.LEFT) {
        if (this.snake.direction !== MOVES.RIGHT){
          this.currentMove = MOVES.LEFT;
        }
      }
    }
  }
  
  playMove(): void{
  const head = this.GetSnakeHead();
    let spot = {} as Spot;
    if (this.isGameOver || this.isWin){
      return;
    }

    if (this.currentMove === MOVES.DOWN){
      spot = {column: head.column, row: head.row + 1};
    }
    else if (this.currentMove === MOVES.UP){
      spot = {column: head.column, row: head.row - 1};
    }
    else if (this.currentMove === MOVES.RIGHT){
      spot = {column: head.column + 1, row: head.row};
    }

    else if (this.currentMove === MOVES.LEFT){
      spot = {column: head.column - 1, row: head.row};
    }

    if (this.shouldGameOver(this.currentMove)){
      this.isGameOver = true;
      return;
    }

    this.board[spot.row][spot.column] = SpotType.SnakeBody;
    this.snake.body.push(spot);
    this.snake.direction = this.currentMove;

    if (this.isBoardFull()){
      this.isWin = true;
      return;
    }

    if (!this.isFood(spot)) {
      const spot = this.snake.body.shift();
      this.board[spot.row][spot.column] = SpotType.Empty;
    }
    else {
      this.setFoodPosition();
      this.setScore();
    }

    setTimeout(() => {
      this.playMove();
    }, TIME_INTERVAL);
  }

  setBoard() : void {
    this.board = Array.from({ length: BOARD_SIZE  }, () => 
      Array.from({ length: BOARD_SIZE }, () => SpotType.Empty)
    );
    
    for (let i = 0; i < BOARD_SIZE; i++){
      for (let j = 0; j < BOARD_SIZE; j++){
        if (this.edges.includes(i) || this.edges.includes(j)){
          this.board[i][j] = SpotType.Wall;
        }
      }
    }
  }

  setGameColors(row: number, column: number) : string {
    const spot = {row, column} as Spot;
    if (this.isWall(spot)){
      return COLORS.WALL;
    }
    if (this.isSnakeHead(spot)){
      return COLORS.HEAD;
    }
    if (this.isSnakeBody(spot)){
      return COLORS.SNAKE;
    }
    if (this.isFood(spot)){
      return COLORS.FOOD;
    }
    return COLORS.REGULAR;
  }

  isSnakeBody(spot: Spot): boolean {
    return this.snake.body.some(x => x.column === spot.column && x.row === spot.row); 
  }

  isFood(spot: Spot): boolean {
    return this.food.column === spot.column && this.food.row === spot.row;
  }

  setFoodPosition(): void {
   this.food = this._getRandomFreeSpot();
   this.board[this.food.row][this.food.column] = SpotType.Food;
  }

  setScore(): void{
  this.score += 10;
  }

  _getRandomFreeSpot(): Spot {
    const freeSpots = [];
    for (let i = 0; i < BOARD_SIZE; i++){
      for (let j = 0; j < BOARD_SIZE; j++){
        if (this.board[i][j] === SpotType.Empty){
          freeSpots.push({row: i, column: j});
        }
      }
    }
    return freeSpots[Math.floor(Math.random() * freeSpots.length)];
  }

  isSnakeHead(spot: Spot) : boolean {
    const snakeLastElement = this.GetSnakeHead();
    return snakeLastElement.column === spot.column && snakeLastElement.row === spot.row;
  }

  GetSnakeHead(): Spot {
    return this.snake.body[this.snake.body.length - 1];
  }

  isWall(spot: Spot){
    return this.edges.includes(spot.row) || this.edges.includes(spot.column);
  }

  shouldGameOver(keyCode: number): boolean {
    const head = this.GetSnakeHead();
    const currentMove = { column: head.column, row: head.row };
    let isGameOver = false;
    
    if (keyCode === MOVES.UP) {
      currentMove.row--;
    }
    else if (keyCode === MOVES.DOWN) {
      currentMove.row++;
    }
    if (keyCode === MOVES.RIGHT) {
      currentMove.column++;
    }
    if (keyCode === MOVES.LEFT) {
      currentMove.column--;
    }
    const nextSpot = this.board[currentMove.row][currentMove.column];
    if (!this.validSpots.includes(nextSpot)){
        isGameOver = true;
    }

    return isGameOver;
  }

  isBoardFull(): boolean{
    for (let i = 0; i < BOARD_SIZE; i++){
      for (let j = 0; j < BOARD_SIZE; j++){
        if (this.board[i][j] == SpotType.Empty) {
          return false;
        }
      }
    }

    return true;
  }

}
