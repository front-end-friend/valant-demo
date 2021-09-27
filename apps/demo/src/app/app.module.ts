import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MazeGridComponent } from './components/maze-grid/maze-grid.component';
import { MessageComponent } from './components/message/message.component';
import { PopupComponent } from './components/popup/popup.component';
import { LoggingService } from './core/logging/logging.service';
import { StuffService } from './services/stuff.service';
import { ValantDemoApiClient } from './core/api-client/api-client';
import { ButtonComponent } from './components/button/button.component';
import { MazeComponent } from './components/maze/maze.component';
import { MazeRunnerComponent } from './modules/maze-runner/maze-runner.component';

export function getBaseUrl(): string {
  return environment.baseUrl;
}
// for simplicity all components are being loaded into app module.
// In bigger projects this should be extracted into feature modules
@NgModule({
  declarations: [AppComponent, MazeGridComponent, MessageComponent, PopupComponent, ButtonComponent, MazeComponent, MazeRunnerComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    LoggingService,
    StuffService,
    ValantDemoApiClient.Client,
    { provide: ValantDemoApiClient.API_BASE_URL, useFactory: getBaseUrl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
