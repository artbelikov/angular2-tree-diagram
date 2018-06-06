import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {Tree} from './tree.component'
import {Node} from './node'
import {NodesListService} from './services/nodesList.service'

@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        Tree,
        Node
    ],
    imports: [
        CommonModule
    ],
    exports: [
        Tree,
        Node
    ],
    providers: [
        NodesListService
    ]
})
export class TreeDiagram {

}