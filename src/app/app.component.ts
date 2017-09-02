/**
 * Angular 2 decorators and services
 */
import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

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
      <tree-diagram [data]="tree"></tree-diagram>
  `
})
export class AppComponent{
  constructor(
    public appState: AppState
  ) {
  }

  public treeConfig = {
    nodeWidth: 150,
    nodeHeight: 100
  }

  public tree: any


  public async ngOnInit () {
    let json = await System.import('../assets/mock-data/mock-data.json')
    this.tree = {
      json: json,
      config: this.treeConfig
    };
  }

}
