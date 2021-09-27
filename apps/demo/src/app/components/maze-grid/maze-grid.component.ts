import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggingService } from '../../core/logging/logging.service';
import { Maze } from '../../models/maze';
import { MazeLink } from '../../models/maze-link';
import { MazeTileType } from '../../models/maze-tile-type';
import { Position } from '../../models/position';

@Component({
  selector: 'valant-maze-grid',
  templateUrl: './maze-grid.component.html',
  styleUrls: ['./maze-grid.component.less']
})
export class MazeGridComponent implements OnInit {
  @Input() mazes: MazeLink[];
  @Output() selectedMaze: EventEmitter<number> = new EventEmitter();

  constructor(private logger: LoggingService) { }

  ngOnInit(): void {
  }

  launchMaze(mazeId: number) {
    this.selectedMaze.emit(mazeId);
  }
}
