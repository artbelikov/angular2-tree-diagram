import {TreeDiagramNode} from './node.class';
export class TreeDiagramNodesList{
  private _nodesList = new Map();
  public roots: TreeDiagramNode[];

  constructor(_nodes: any[], config){
    _nodes.forEach(_node => {
      this._nodesList.set(_node.guid, new TreeDiagramNode(_node, config, this.getThisNodeList.bind(this)))
    });
    this._makeRoots()
  }

  private _makeRoots(){
    this.roots = Array.from(this.values()).filter((node:TreeDiagramNode) => node.isRoot())
  }

  public values(){
    return this._nodesList.values()
  }

  public getNode(guid:string):TreeDiagramNode{
    return this._nodesList.get(guid)
  }

  public transfer(origin:string, target:string){
    let _origin = this.getNode(origin);
    if (_origin.parentId === target || origin === target) return;
    let _target = this.getNode(target);
    let remakeRoots = _origin.isRoot();
    if (_origin.parentId){
      let _parent = this.getNode(_origin.parentId);
      _parent.children.delete(origin);
      this._nodesList.set(_origin.parentId, _parent)
    }
    _target.children.add(origin);
    this._nodesList.set(target, _target);

    _origin.parentId = target;
    this._nodesList.set(origin, _origin);
    remakeRoots && this._makeRoots()

    this.serialize()
  }

  public getThisNodeList(){
    return this;
  }

  public toggleSiblings(guid: string){
    let target = this.getNode(guid);
    if (target.parentId){
      let parent = this.getNode(target.parentId)
      parent.children.forEach((nodeGuid) => {
        if (nodeGuid === guid) return;
        this.getNode(nodeGuid).toggle(false)
      })
    } else {
      for (let root of this.roots){
        if (root.guid === guid) continue;
        root.toggle(false)
      }
    }
  }

  public serialize(){
    let out = []
    this._nodesList.forEach((node: TreeDiagramNode)=>{
      let json: any = {
        guid: node.guid,
        displayName: node.displayName,
        parentId: node.parentId
      };
      json.children = Array.from(node.children)

      out.push(json)
    })
    console.warn(JSON.stringify(out))
    return out
  }

}