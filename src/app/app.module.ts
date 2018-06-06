import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TreeDiagram} from './tree';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        TreeDiagram
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
