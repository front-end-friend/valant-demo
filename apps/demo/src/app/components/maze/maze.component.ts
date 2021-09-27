import { Component, Input, OnInit } from '@angular/core';
import { Maze } from '../../models/maze';
import { MazeTileType } from '../../models/maze-tile-type';
import { Position } from '../../models/position';

@Component({
  selector: 'valant-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.less']
})
export class MazeComponent {
  public rows: MazeTileType[][];
  @Input()
  set maze(maze: Maze) {
    this.buildMaze(maze);
  }

private _position: Position;
  @Input()
  set player(position: Position) {
    this._position = new Position(position.y, position.x);
    console.log('building maze from pos change');

    this.buildMaze(this.maze);
  }
  get player() {
    return this._position;
  }

  constructor() { }

  private getTileTypeClass(tileType: MazeTileType) {
    switch(tileType) {
      case MazeTileType.Start:
        return 'tile-start';
      case MazeTileType.End:
        return 'tile-end';
      case MazeTileType.Path:
        return 'tile-path';
      default:
        return 'tile-empty';
    }
  }

  private buildMaze(maze: Maze) {
    if (!maze) return;
    console.log('setting maze');

    this.rows = [];
    for (let i = 0; i < maze.height; i++) {
      const row = [];
      for (let j = 0; j < maze.width; j++) {
        const tileId = i * maze.height + j;
        row.push(this.getTileTypeClass(maze.tiles[tileId]));
      }
      this.rows.push(row);
    }

    console.log(this.rows);

  }
}
