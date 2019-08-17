import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TreeComponent } from './tree.component';
import { NodeComponent } from './node';
import { NodesListService } from './services/nodesList.service';

@NgModule({
    declarations: [
        TreeComponent,
        NodeComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TreeComponent,
        NodeComponent
    ],
    providers: [
        NodesListService
    ]
})
export class TreeDiagramModule {

}
