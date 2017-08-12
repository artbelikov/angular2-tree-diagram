# Angular tree diagramm
#### This is Angular 2+ Hierarchical UI module.

### Preview
<img src="http://i.imgur.com/WOpAOfv.png" width="500">

### Features
- Drag and drop
- Zoom and pan
- Configurable node width/height
- Add/remove nodes
- Tree-like UI
- Pure CSS relation lines
- No dependencies

### Installation
```
npm i angular2-tree-diagramm
```

### Usage
- Import module in your project
- Use tree-diagram directive
- Pass array of nodes and config

### Example
```
<tree-diagram [data]="data"></tree-diagram>
...
data = {
  json: [
    {
      "guid": "bc4c7a02-5379-4046-92be-12c67af4295a",
      "displayName": "Elentrix",
      "children": [
        "85d412c2-ebc1-4d56-96c9-7da433ac9bb2",
        "28aac445-83b1-464d-9695-a4157dab6eac"
      ]
    },
    ...
  ],
  config: {
    nodeWidth: 200,
    nodeHeight: 100
  }
}
```

This project is based on [Angular4 Webpack Starter](https://github.com/AngularClass/angular-starter)
