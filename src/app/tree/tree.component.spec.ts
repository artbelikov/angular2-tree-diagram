import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';

/**
 * Load the implementations that should be tested
 */
import { TreeComponent } from './tree.component';
import { NodesListService } from './services/nodesList.servic';

describe(`Tree`, () => {
    let comp: TreeComponent;
    let fixture: ComponentFixture<TreeComponent>;

  /**
   * async beforeEach
   */
    beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [ TreeComponent ],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [NodesListService]
      })
      /**
       * Compile template and css
       */
        .compileComponents();
    }));

  /**
   * Synchronous beforeEach
   */
    beforeEach(() => {
      fixture = TestBed.createComponent(TreeComponent);
      comp    = fixture.componentInstance;
      fixture.detectChanges();
  });

    it(`should be readly initialized`, () => {
      expect(fixture).toBeDefined();
      expect(comp).toBeDefined();
  });

    it(`should have properties`, () => {
      expect(comp.newNode).toBeDefined();
      expect(comp.onmousedown).toBeDefined();
      expect(comp.onmousemove).toBeDefined();
      expect(comp.onmouseup).toBeDefined();
      expect(comp.makeTransform).toBeDefined();
      expect(comp.preventMouse).toBeDefined();
      expect(comp.onmousewheel).toBeDefined();
  });

});
