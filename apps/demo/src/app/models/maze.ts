import { MazeTileType } from './maze-tile-type';


export class Maze {
  public tiles: MazeTileType[];
  public width: number;
  public height: number;

  constructor(width: number, height: number, tiles: MazeTileType[]) {
    this.width = width;
    this.height = height;
    this.tiles = tiles;
  }
}
