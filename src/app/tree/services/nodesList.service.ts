import { Injectable } from '@angular/core';
import { TreeDiagramNodesList } from '../classes/nodesList.class';

@Injectable()
export class NodesListService {
    private _nodesList: TreeDiagramNodesList;

    public loadNodes(nodes: any[], config) {
        this._nodesList = new TreeDiagramNodesList(nodes, config);
        return this._nodesList;
    }

    public getNodes() {
        return this._nodesList.values();
    }

    public getNode(guid) {
        return guid && this._nodesList.getNode(guid);
    }

    public newNode() {
        this._nodesList.newNode();
    }

    public makerNode() {
        return this._nodesList.makerGuid;
    }
}
