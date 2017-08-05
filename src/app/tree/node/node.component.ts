import {
  Component,
  Input
} from '@angular/core';

import { NodesListService } from '../services/nodesList.service'
import { TreeDiagramNode } from "../classes/node.class"

@Component({
  selector: '[treeDiagramNode]',
  styleUrls: [ './node.component.scss' ],
  templateUrl: './node.component.html',
})
export class Node {
  public node: TreeDiagramNode;
  constructor(private nodesSrv: NodesListService){

  }
  @Input() set treeDiagramNode(guid) {
    this.node = this.nodesSrv.getNode(guid)
  }
}
