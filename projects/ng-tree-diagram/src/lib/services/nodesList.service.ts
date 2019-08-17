import { Injectable } from '@angular/core';
import { TreeDiagramNodesList } from '../classes/nodesList.class';

@Injectable()
export class NodesListService {
  private nodesList: TreeDiagramNodesList;

  public loadNodes(nodes: any[], config) {
    this.nodesList = new TreeDiagramNodesList(nodes, config);

    return this.nodesList;
  }

  public getNode(guid) {
    return guid && this.nodesList.getNode(guid);
  }

  public newNode() {
    this.nodesList.newNode();
  }

  public makerNode() {
    return this.nodesList.makerGuid;
  }
}
