import {
    Component,
    Input, OnInit
} from '@angular/core';

import { NodesListService } from './services/nodesList.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'tree-diagram',
    styleUrls: ['./tree.component.scss'],
    templateUrl: './tree.component.html',
})
export class TreeComponent {

    public nodes;
    @Input() public isEditable: boolean;
    @Input() public isMouseActions: boolean;
    private paneDragging = false;
    private paneTransform;
    private zoom = 1;
    private paneX = 0;
    private paneY = 0;
    private _config = {
        nodeWidth: 200,
        nodeHeight: 100
    };

    @Input()
    set data(_data) {
        if (!_data || !Array.isArray(_data.json)) {
            return;
        }
        if (typeof _data.config === 'object') {
            this._config = Object.assign(this._config, _data.config);
        }
        this.nodes = this.nodesSrv.loadNodes(_data.json, this._config);
    }

    constructor(private nodesSrv: NodesListService,
                private sanitizer: DomSanitizer) {
        this.isEditable = true;
        this.isMouseActions = true;
    }

    public newNode() {
        this.nodesSrv.newNode();
    }

    public get nodeMaker() {
        return this.nodesSrv.makerNode();
    }

    public onmousedown() {
        if (this.isMouseActions) {
            this.paneDragging = true;
        }
    }

    public onmousemove(event) {
        if (this.isMouseActions) {
            if (this.paneDragging) {
                let {movementX, movementY} = event;
                this.paneX += movementX;
                this.paneY += movementY;
                this.makeTransform();
            }
        }
    }

    public onmouseup() {
        console.log(this.isMouseActions);
        if (this.isMouseActions) {
            this.paneDragging = false;
        }
    }

    public makeTransform() {
        this.paneTransform = this.sanitizer.bypassSecurityTrustStyle
        (`translate(${this.paneX }px, ${this.paneY}px) scale(${this.zoom})`);
    }

    public preventMouse(event) {
        event.stopPropagation();
    }

    public onmousewheel(event) {
        if (this.isMouseActions) {
            let delta;
            event.preventDefault();
            delta = event.detail || event.wheelDelta;
            this.zoom += delta / 1000 / 2;
            this.zoom = Math.min(Math.max(this.zoom, 0.2), 3);
            this.makeTransform();
        }
    }
}
