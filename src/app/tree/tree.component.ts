import {
  Component,
  Input,
  ElementRef
} from '@angular/core';

import { NodesListService } from './services/nodesList.service'
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'tree-diagram',
  styleUrls: ['./tree.component.scss'],
  templateUrl: './tree.component.html',
})
export class Tree {
  private _config = {
    nodeWidth: 200,
    nodeHeight: 100
  };
  private mousewheelevt = /Firefox/i.test(navigator.userAgent) !== null ? 'DOMMouseScroll' : 'mousewheel';

  private paneDragging = false
  private paneTransform
  private zoom = 1
  private paneX = 0
  private paneY = 0
  public nodes
  private pane

  @Input()
  public set config (settings) {
    if (typeof settings === 'object') {
      this._config = Object.assign(this._config, settings)
    }
  };

  public get config(){
    return this._config
  }

  constructor (private nodesSrv: NodesListService, private rootElement: ElementRef, private sanitizer: DomSanitizer) {

  }

  public newNode(){
    this.nodesSrv.newNode()
  }

  public ngOnInit () {
    System.import('../../assets/mock-data/mock-data.json')
      .then((json) => {
        this.nodes = this.nodesSrv.loadNodes(json, this._config);
      });
  }

  public get nodeMaker(){
    return this.nodesSrv.makerNode()
  }

  public onmousedown (event) {
    this.paneDragging = true;
  }

  public onmousemove (event) {
    if (this.paneDragging) {
      let { movementX, movementY } = event
      this.paneX += movementX
      this.paneY += movementY
      this._makeTransform()
    }
  }

  public onmouseup () {
    this.paneDragging = false
  }

  public _makeTransform(){
    this.paneTransform = this.sanitizer.bypassSecurityTrustStyle(`translate(${this.paneX }px, ${this.paneY}px) scale(${this.zoom})`)
  }

  public preventMouse(event){
    event.stopPropagation()
  }

  public onmousewheel(event){
    let delta;
    event.preventDefault();
    delta = event.detail || event.wheelDelta;
    this.zoom += delta / 1000 / 2;
    this.zoom = Math.min(Math.max(this.zoom, 0.2), 3);
    this._makeTransform()
  }

  // public ngAfterViewInit () {
  //   this.rootElement.nativeElement.addEventListener('mousedown', this._onmousedown.bind(this), false)
  //   this.rootElement.nativeElement.addEventListener('mousemove', this._onmousemove.bind(this), false)
  //   document.body.addEventListener('mouseup', this._onmouseup.bind(this), false)
  //
  //   this.rootElement.nativeElement.onmousewheel = this._onmousewheel.bind(this)
  // }
  //
  // public ngOnDestroy () {
  //   this.rootElement.nativeElement.removeEventListener('mousedown', this._onmousedown)
  //   this.rootElement.nativeElement.removeEventListener('mousemove', this._onmousemove)
  //   this.rootElement.nativeElement.removeEventListener(this.mousewheelevt, this._onmousewheel)
  //   document.body.removeEventListener('mouseup', this._onmouseup)
  // }

}