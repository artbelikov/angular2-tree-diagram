import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import json from './mock-data.json';

@Component({
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.css'
    ],
    template: `
        <tree-diagram [data]="tree"></tree-diagram>
    `
})
export class AppComponent implements OnInit {

    public treeConfig = {
        nodeWidth: 150,
        nodeHeight: 100
    };

    public tree: any;


    public ngOnInit() {
        this.tree = {
            json,
            config: this.treeConfig
        };
    }

}
