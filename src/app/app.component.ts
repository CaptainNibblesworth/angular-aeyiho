import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { selectBookCollection, selectBooks } from './state/book.selectors';
import { retrievedBookList, addBook, removeBook } from './state/books.actions';
import { GoogleBooksService } from './book-list/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books$ = this.store.pipe(select(selectBooks));
  bookCollection$ = this.store.pipe(select(selectBookCollection));

  onAdd(bookId) {
    this.store.dispatch(addBook({ bookId }));
  }

  onRemove(bookId) {
    this.store.dispatch(removeBook({ bookId }));
  }

  constructor(private bookService: GoogleBooksService, private store: Store) {}

  nmgOnInit() {
    this.bookService
      .getBooks()
      .subscribe(Book => this.store.dispatch(retrievedBookList({ Book })));
  }
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
