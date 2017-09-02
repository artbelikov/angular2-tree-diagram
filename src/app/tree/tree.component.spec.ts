import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

/**
 * Load the implementations that should be tested
 */
import { Tree } from './tree.component';
import { NodesListService } from "./services/nodesList.service"

describe(`Tree`, () => {
  let comp: Tree;
  let fixture: ComponentFixture<Tree>;

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tree ],
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
    fixture = TestBed.createComponent(Tree);
    comp    = fixture.componentInstance;

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should have properties`, () => {
    expect(comp.newNode).toBeDefined()
    expect(comp.onmousedown).toBeDefined()
    expect(comp.onmousemove).toBeDefined()
    expect(comp.onmouseup).toBeDefined()
    expect(comp.makeTransform).toBeDefined()
    expect(comp.preventMouse).toBeDefined()
    expect(comp.onmousewheel).toBeDefined()
  });

});
