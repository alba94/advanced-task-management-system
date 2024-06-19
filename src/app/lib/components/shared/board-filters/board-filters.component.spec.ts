import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFiltersComponent } from './board-filters.component';

describe('BoardFiltersComponent', () => {
  let component: BoardFiltersComponent;
  let fixture: ComponentFixture<BoardFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
