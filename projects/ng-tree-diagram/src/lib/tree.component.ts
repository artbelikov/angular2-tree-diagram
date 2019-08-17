import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NodesListService } from './services/nodesList.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tree-diagram',
  styleUrls: ['./tree.component.scss'],
  templateUrl: './tree.component.html'
})
export class TreeComponent {
  public nodes;
  private config = {
    nodeWidth: 200,
    nodeHeight: 100
  };
  private paneDragging = false;
  private paneTransformState;
  private zoom = 1;
  private paneX = 0;
  private paneY = 0;

  public get paneTransform() {
    return this.paneTransformState;
  }

  public set paneTransform(value) {
    this.paneTransformState = value;
  }

  constructor(
    private nodesSrv: NodesListService,
    private sanitizer: DomSanitizer
  ) {}

  @Input() set data(data: { config: any; json: any[] }) {
    if (!data || !Array.isArray(data.json)) {
      return;
    }

    if (typeof data.config === 'object') {
      this.config = Object.assign(this.config, data.config);
    }

    this.nodes = this.nodesSrv.loadNodes(data.json, this.config);
  }

  public get nodeMaker() {
    return this.nodesSrv.makerNode();
  }

  public newNode() {
    this.nodesSrv.newNode();
  }

  public onmousedown() {
    this.paneDragging = true;
  }

  public onmousemove(event) {
    if (this.paneDragging) {
      const { movementX, movementY } = event;

      this.paneX += movementX;
      this.paneY += movementY;
      this.makeTransform();
    }
  }

  public onmouseup() {
    this.paneDragging = false;
  }

  public makeTransform() {
    this.paneTransform = this.sanitizer.bypassSecurityTrustStyle(
      `translate(${this.paneX}px, ${this.paneY}px) scale(${this.zoom})`
    );
  }

  public preventMouse(event) {
    event.stopPropagation();
  }

  public onmousewheel(event) {
    let delta;

    event.preventDefault();
    delta = event.detail || event.wheelDelta;
    this.zoom += delta / 1000 / 2;
    this.zoom = Math.min(Math.max(this.zoom, 0.2), 3);

    this.makeTransform();
  }
}
