import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeDiagramModule } from 'ng-tree-diagram';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TreeDiagramModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
