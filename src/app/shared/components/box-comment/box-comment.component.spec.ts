import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCommentComponent } from './box-comment.component';

describe('BoxCommentComponent', () => {
  let component: BoxCommentComponent;
  let fixture: ComponentFixture<BoxCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
