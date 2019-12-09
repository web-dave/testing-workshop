import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import {
  MockBooksService,
  mockBooks
} from './../shared/mocks/mock.book.service';
import { BookService } from '../shared/book.service';

import { BookNewComponent } from './book-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('BookNewComponent', () => {
  let component: BookNewComponent;
  let fixture: ComponentFixture<BookNewComponent>;
  let compiled: HTMLElement;
  let mySpy;
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookNewComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: ':isbn',
            component: BookNewComponent
          }
        ])
      ],
      providers: [{ provide: BookService, useClass: MockBooksService }]
    }).compileComponents();
    service = TestBed.get(BookService);
    mySpy = spyOn(service, 'createBook').and.callThrough();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  }));

  // Tip: This tests based on reactive-forms, take a look at the BookNew Class (form attribute)
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when initialized', () => {
    expect(component.form.invalid).toBeTruthy();
  });

  it('should require title otherwise mark title as invalid', () => {
    const title = compiled.querySelector('#title');
    expect(title.classList.contains('ng-invalid')).toBeTruthy();
    expect(component.form.get('title').hasError('required')).toBeTruthy();
    component.form.get('title').setValue('HundsKatzMAus');
    fixture.detectChanges();
    expect(title.classList.contains('ng-invalid')).toBeFalsy();
    expect(component.form.get('title').hasError('required')).toBeFalsy();
  });

  it('should be valid if all values are valid', () => {
    component.form.patchValue(mockBooks[1]);
    expect(component.form.valid).toBeTruthy();
    const btn = compiled.querySelector('button') as HTMLButtonElement;
    fixture.detectChanges();
    expect(btn.hasAttribute('disabled')).toBeFalsy();
  });

  it('should call service.createBook on submit', () => {
    const book = {
      title: 'Design Patterns',
      isbn: 'hierzufinden',
      publisher: {
        name: 'Addison-Wesley',
        url: 'http://www.addison-wesley.de/'
      }
    };

    const newBook = {
      ...service.getNewBook(),
      ...book
    };
    component.form.patchValue(book);
    fixture.detectChanges();
    compiled.querySelector('button').click();
    expect(mySpy).toHaveBeenCalledWith(newBook);
  });
});
