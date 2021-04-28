import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Working delete output', () => {
    it('should emit a value', () => {
      component.deleteRow({});
      spyOn(component.delete, 'emit').and.callThrough();
      component.deleteRow({});
      expect(component.delete.emit).toHaveBeenCalled();
    });
  });

  describe('Working edit output', () => {
    it('should emit a value', () => {
      component.editRow({});
      spyOn(component.edit, 'emit').and.callThrough();
      component.editRow({});
      expect(component.edit.emit).toHaveBeenCalled();
    });
  });
});
