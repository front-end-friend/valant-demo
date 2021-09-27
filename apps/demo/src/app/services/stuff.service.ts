import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValantDemoApiClient } from '../core/api-client/api-client';
import { MazeLink } from '../models/maze-link';

@Injectable({
  providedIn: 'root',
})
export class StuffService {
  private readonly baseUrl =  'Maze';
  constructor(private httpClient: ValantDemoApiClient.Client) {}

  public getStuff(): Observable<string[]> {
    return this.httpClient.maze();
  }


  public getAvailableMazes(): Observable<string[]> {
    return this.httpClient.get(`${this.baseUrl}/mazes`).pipe(
      map(response => this.mapMazes(response))
    );
  }
  public getMazeSession(mazeId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/mazes/${mazeId}`);
  }
  public getAvailableMoves(sessionId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/session/${sessionId}/moves`);
  }

  public setMove(sessionId: number, direction: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/session/${sessionId}/move/${direction}`);
  }

  private mapMazes(response: any) {
    return response.map(maze => new MazeLink(maze.id, maze.title));
  }
}
