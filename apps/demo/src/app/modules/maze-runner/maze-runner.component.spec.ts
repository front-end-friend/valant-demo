import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeRunnerComponent } from './maze-runner.component';

describe('MazeRunnerComponent', () => {
  let component: MazeRunnerComponent;
  let fixture: ComponentFixture<MazeRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
