import {TreeDiagramNodesList} from './nodesList.class'
export class TreeDiagramNode{
  public parentId: string | null;
  public guid: string;
  public width: number;
  public height: number;
  public isDragover: boolean;
  private _toggle: boolean;
  public children: Set<string>;
  public displayName: string;

  constructor(props, config, private getThisNodeList: () => TreeDiagramNodesList){
    if (!props.guid) return;
    for (let prop in props){
      if (props.hasOwnProperty(prop)){
        this[prop] = props[prop]
      }
    }

    this._toggle = false;

    if(config.nodeWidth){
      this.width = config.nodeWidth
    }
    if(config.nodeHeight){
      this.height = config.nodeHeight
    }
    this.children = new Set(<string[]>props.children)
  }

  public get isExpanded(){
    return this._toggle
  }

  public hasChildren(){
    return !!this.children.size
  }

  public toggle(state = !this._toggle){
    this._toggle = state;
    state && this.getThisNodeList().toggleSiblings(this.guid)
    console.warn(this.displayName)
  }

  public childrenCount(){
    return this.children.size
  }

  public isRoot(){
    return this.parentId == null;
  }

  public dragenter(event){
    this.isDragover = true;
    event.dataTransfer.dropEffect = 'move';

    console.warn(event)

  }

  public dragleave(event){
    this.isDragover = false;
  }

  public dragstart(event){
    event.dataTransfer.effectAllowed = 'move';
    this.toggle(false)
    event.dataTransfer.setData('text/plain', this.guid)
  }

  public dragover(event){
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move'
    return false;
  }

  public drop(event){
    event.preventDefault();
    this.isDragover = false;
    console.warn(event)
    let guid = event.dataTransfer.getData("text")
    this.getThisNodeList().transfer(guid, this.guid)
    return false;
  }

}