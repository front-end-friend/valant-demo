import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Maze } from '../../models/maze';
import { MazeTileType } from '../../models/maze-tile-type';
import { Position } from '../../models/position';

@Component({
  selector: 'valant-maze-runner',
  templateUrl: './maze-runner.component.html',
  styleUrls: ['./maze-runner.component.less']
})
export class MazeRunnerComponent implements OnInit {
  public show = false;
  public leftDisabled: boolean = true;
  public rightDisabled: boolean = true;
  public upDisabled: boolean = true;
  public downDisabled: boolean = true;

  @Output() move: EventEmitter<string> = new EventEmitter();
  @Input()
  set moves(values: string[]) {
    console.log('moves');
    console.log(values);

    if (!values) return;
    this._moves = values;
    console.log('setting moves');

    this.leftDisabled = !this._moves.includes('Left');
    this.upDisabled = !this._moves.includes('Up');
    this.downDisabled = !this._moves.includes('Down');
    this.rightDisabled = !this._moves.includes('Right');
  }
  private _moves: string[];

  get moves() {
    return this._moves;
  }

  @Input()
  set mazeSession(value: any) {
    this.show =true;
    console.log('Session');
    console.log(value);

    const tiles = [];
    value.tiles.forEach(row => {
      row.forEach(tile => {
        tiles.push(tile);
      });
    });
    this.maze = new Maze(
      value.width,
      value.height,
      tiles
    );
    this.position = new Position(value.start.x, value.start.y);
  }
  @Input()
  set position(value: any) {
    if (!value) return;
    this._position = new Position(value.x, value.y);
  }
  get position() {
    return this._position;
  }

  private _position: Position;


  constructor() { }
  // temp
  public maze: Maze;

  ngOnInit(): void {
  }

  public moveLeft() {
    if (this.leftDisabled) return;
    this.move.emit('Left');
    // const { x, y } = this.position;
    // if (y - 1 >= 0) this.position = new Position(x, y - 1);
  }
  public moveRight() {
    if (this.rightDisabled) return;
    this.move.emit('Right');
    // const { x, y } = this.position;
    // if (y + 1 < this.maze.width) this.position = new Position(x, y + 1);
  }
  public moveUp() {
    if (this.upDisabled) return;
    this.move.emit('Up');
    // const { x, y } = this.position;
    // if (x - 1 >= 0) this.position = new Position(x - 1, y);
  }
  public moveDown() {
    if (this.downDisabled) return;
    this.move.emit('Down');
    // const { x, y } = this.position;
    // if (x + 1 < this.maze.height) this.position = new Position(x + 1, y);
  }

}
