import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {GameSettingsComponent} from './GameSettings/GameSettings.component';
import {CubeComponent} from './Cube/Cube.component';


@NgModule({
  declarations: [
    AppComponent,
    GameSettingsComponent,
    CubeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule { }
