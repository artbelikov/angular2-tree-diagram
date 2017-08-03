import {
  Component,
  Input,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';

import { NodesListService } from './services/nodesList.service'
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'tree-diagram',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './tree.component.scss' ],
  templateUrl: './tree.component.html',
})
export class Tree {
  private _config = {
    nodeWidth: 150,
    nodeHeight: 100
  };

  paneDragging = false
  paneTransform
  paneX = 0
  paneY = 0

  public nodes;
  @Input() public set config(settings){
    for (let prop in settings){
      if (settings.hasOwnProperty(prop)){
        this._config[prop] = settings[prop]
      }
    }
  };

  constructor(private nodesSrv: NodesListService, private myElement: ElementRef, private sanitizer: DomSanitizer){

  }

  public ngOnInit() {

    System.import('../../assets/mock-data/mock-data.json')
      .then((json) => {
        console.log('async mockData', json);
        this.nodes = this.nodesSrv.loadNodes(json, this._config);
      });

  }

  private _onmousedown(event){
    if (event.target === this.myElement.nativeElement){
      this.paneDragging = true;
    }
  }

  private _onmousemove(event){
    if (this.paneDragging){
      let {movementX, movementY} = event;
      this.paneX += movementX
      this.paneY += movementY
      this.paneTransform = this.sanitizer.bypassSecurityTrustStyle(`translate(${this.paneX }px, ${this.paneY}px)`)
    }
  }

  private _onmouseup(){
    this.paneDragging = false;
  }

  public ngAfterViewInit(){
    this.myElement.nativeElement.addEventListener('mousedown', this._onmousedown.bind(this))
    this.myElement.nativeElement.addEventListener('mousemove', this._onmousemove.bind(this))
    document.body.addEventListener('mouseup', this._onmouseup.bind(this))
  }

  public ngOnDestroy(){
    this.myElement.nativeElement.removeEventListener('mousedown', this._onmousedown)
    this.myElement.nativeElement.removeEventListener('mousemove', this._onmousemove)
    document.body.removeEventListener('mouseup', this._onmouseup)
  }

}
