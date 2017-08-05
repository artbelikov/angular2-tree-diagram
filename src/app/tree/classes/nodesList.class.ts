import { TreeDiagramNode } from './node.class';
export class TreeDiagramNodesList {
  private _nodesList = new Map();
  public roots: TreeDiagramNode[];

  constructor (_nodes: any[], config) {
    _nodes.forEach(_node => {
      this._nodesList.set(_node.guid, new TreeDiagramNode(_node, config, this.getThisNodeList.bind(this)))
    });
    this._makeRoots()
  }

  private _makeRoots () {
    this.roots = Array.from(this.values()).filter((node: TreeDiagramNode) => node.isRoot())
  }

  public values () {
    return this._nodesList.values()
  }

  public getNode (guid: string): TreeDiagramNode {
    return this._nodesList.get(guid)
  }

  public transfer (origin: string, target: string) {
    let _origin = this.getNode(origin);
    let _target = this.getNode(target);
    _origin.isDragover = false;
    _origin.isDragging = false;
    _target.isDragover = false;
    if (_origin.parentId === target || origin === target) {
      return;
    }
    let remakeRoots = _origin.isRoot();
    if (_origin.parentId) {
      let _parent = this.getNode(_origin.parentId);
      _parent.children.delete(origin);
      if (!_parent.hasChildren()) {
        _parent.toggle(false)
      }
    }
    _target.children.add(origin);

    _origin.parentId = target;
    remakeRoots && this._makeRoots()

    this.serialize()
  }

  public getThisNodeList () {
    return this;
  }

  public toggleSiblings (guid: string) {
    let target = this.getNode(guid);
    if (target.parentId) {
      let parent = this.getNode(target.parentId)
      parent.children.forEach((nodeGuid) => {
        if (nodeGuid === guid) {
          return;
        }
        this.getNode(nodeGuid).toggle(false)
      })
    } else {
      for (let root of this.roots) {
        if (root.guid === guid) {
          continue;
        }
        root.toggle(false)
      }
    }
  }

  public serialize () {
    let out = []
    this._nodesList.forEach((node: TreeDiagramNode) => {
      let json: any = {
        guid: node.guid,
        displayName: node.displayName,
        parentId: node.parentId
      };
      json.children = Array.from(node.children)

      out.push(json)
    })
    return out
  }

  public destroy (guid: string) {
    let target = this.getNode(guid);
    if (target.parentId) {
      let parent = this.getNode(target.parentId)
      parent.children.delete(guid)
    }
    if (target.hasChildren()) {
      target.children.forEach((child: string) => {
        let theNode = this.getNode(child)
        theNode.parentId = null;
      })
    }
    this._nodesList.delete(guid)
    this._makeRoots()
    console.warn(this.values())
  }

}