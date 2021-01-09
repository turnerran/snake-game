import { Spot } from './spot';
import  {MOVES} from '../consts/game-const';

export interface Snake{
    body: Spot[];
    direction: Number;
}