import {TreeDiagramNodesList} from './nodesList.class'

export class TreeDiagramNode {
    public parentId: string | null;
    public guid: string;
    public width: number;
    public height: number;
    public isDragover: boolean;
    public isDragging: boolean;
    public children: Set<string>;
    public displayName: string;
    private _toggle: boolean;

    constructor(props, config, public getThisNodeList: () => TreeDiagramNodesList) {
        if (!props.guid) {
            return;
        }
        for (let prop in props) {
            if (props.hasOwnProperty(prop)) {
                this[prop] = props[prop]
            }
        }

        this._toggle = false;

        if (config.nodeWidth) {
            this.width = config.nodeWidth
        }
        if (config.nodeHeight) {
            this.height = config.nodeHeight
        }
        this.children = new Set(<string[]>props.children)
    }

    public get isExpanded() {
        return this._toggle
    }

    public destroy() {
        this.getThisNodeList().destroy(this.guid)
    }

    public hasChildren() {
        return !!this.children.size
    }

    public toggle(state = !this._toggle) {
        this._toggle = state;
        state && this.getThisNodeList().toggleSiblings(this.guid)
    }

    public childrenCount() {
        return this.children.size
    }

    public isRoot() {
        return this.parentId == null;
    }

    public dragenter(event) {
        event.dataTransfer.dropEffect = 'move';
    }

    public dragleave(event) {
        this.isDragover = false;
    }

    public dragstart(event) {
        event.dataTransfer.effectAllowed = 'move';
        this.isDragging = true;
        this.toggle(false);
        this.getThisNodeList().draggingNodeGuid = this.guid
    }

    public dragover(event) {
        event.preventDefault();
        if (!this.isDragging) {
            this.isDragover = true;
        }
        event.dataTransfer.dropEffect = 'move';
        return false;
    }

    public dragend(event) {
        this.isDragover = false;
        this.isDragging = false;
    }

    public drop(event) {
        event.preventDefault();
        let guid = this.getThisNodeList().draggingNodeGuid;
        this.getThisNodeList().transfer(guid, this.guid);
        return false;
    }

    public addChild() {
        let newNodeGuid = this.getThisNodeList().newNode(this.guid);
        this.children.add(newNodeGuid);
        this.toggle(true)
    }
}