import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Subject, merge } from 'rxjs';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { LoggingService } from './core/logging/logging.service';
import { Maze } from './models/maze';
import { MazeLink } from './models/maze-link';
import { MazeTileType } from './models/maze-tile-type';
import { Position } from './models/position';
import { StuffService } from './services/stuff.service';

@Component({
  selector: 'valant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  public userPositionSubject: Subject<any> = new Subject();
  public mazeIdSubject: Subject<number> = new Subject();
  public title = 'Valant demo';
  public data: string[];

  constructor(private logger: LoggingService, private stuffService: StuffService) {}

  public mazes$ = this.stuffService.getAvailableMazes();
  public mazeSession$ = this.mazeIdSubject.pipe(
    switchMap(mazeId => {
      if (mazeId === null || mazeId === undefined) return of(null);
      return this.stuffService.getMazeSession(mazeId);
    }),
    shareReplay(1)
  );

  public userPosition$ = merge(
    this.userPositionSubject,
    this.mazeSession$.pipe(
      switchMap(session => {
        return of(session.start);
      })
    )
  );

  public availableMoves$ = this.userPosition$.pipe(
    switchMap(() => {
      return this.mazeSession$.pipe(
        switchMap(session => {
          return this.stuffService.getAvailableMoves(session.id);
        })
      );
    })
  );

  public onMove(direction: string) {
    this.mazeSession$.pipe(
      switchMap(session => {
        return this.stuffService.setMove(session.id, direction);
      }),
      take(1)
    ).subscribe(pos => this.userPositionSubject.next(pos));
  }

  ngOnInit() {
    this.logger.log('Welcome to the AppComponent');
  }

  public stringify(obj) {
    return JSON.stringify(obj);
  }

  public setMaze(mazeId) {
    console.log('setting maze subject to ' + mazeId);

    this.mazeIdSubject.next(mazeId);
  }
}
