import {
  Component,
  Input
} from '@angular/core';

import { NodesListService } from '../services/nodesList.service'

@Component({
  selector: '[treeDiagramNode]',
  styleUrls: [ './node.component.scss' ],
  templateUrl: './node.component.html',
})
export class Node {
  public node;
  constructor(private nodesSrv: NodesListService){

  }
  @Input() set treeDiagramNode(guid) {
    this.node = this.nodesSrv.getNode(guid)
  }

  @Input() onlyChild
}
