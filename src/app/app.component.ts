/**
 * Angular 2 decorators and services
 */
import {
    Component, OnInit,
    ViewEncapsulation
} from '@angular/core';

/**
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.css'
    ],
    template: `
        <tree-diagram [data]="tree" 
                      [isEditable]="true"
                      [isMouseActions]="false">
        </tree-diagram>
    `
})
export class AppComponent implements OnInit {
    public treeConfig = {
        nodeWidth: 150,
        nodeHeight: 100
    };
    public tree: any;

  constructor () {
    this.tree = null;
  }

    public async ngOnInit () {
        let json = await System.import('../assets/mock-data/mock-data.json');
        this.tree = {
            json,
            config: this.treeConfig
        };
    }
}
