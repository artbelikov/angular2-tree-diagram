import {
  Component,
  Input
} from '@angular/core';

import { NodesListService } from '../services/nodesList.service'
import { TreeDiagramNode } from "../classes/node.class"
import { DomSanitizer } from "@angular/platform-browser"
import { TreeDiagramNodeMaker } from "../classes/node-maker.class"

@Component({
  selector: '[treeDiagramNode]',
  styleUrls: [ './node.component.scss' ],
  templateUrl: './node.component.html',
})
export class Node {
  public node: TreeDiagramNode | TreeDiagramNodeMaker;
  public childrenTransform;
  constructor(private nodesSrv: NodesListService,  private sanitizer: DomSanitizer){

  }
  @Input() set treeDiagramNode(guid) {
    this.node = this.nodesSrv.getNode(guid)
    this.childrenTransform = this.sanitizer.bypassSecurityTrustStyle(`translate(calc(-50% + ${Math.round(this.node.width/2)}px), 45px)`)
  }
}
