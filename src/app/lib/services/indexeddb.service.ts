import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Observable, from } from 'rxjs';

interface MyDB extends DBSchema {
  'auth-user': {
    key: string;
    value: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService {
  private dbPromise: Promise<IDBPDatabase<MyDB>>;

  constructor() {
    this.dbPromise = openDB<MyDB>('my-database', 1, {
      upgrade(db) {
        db.createObjectStore('auth-user');
      }
    });
  }

  setUser(key: string, value: string): Observable<string> {
    return from(this.dbPromise.then(db => db.put('auth-user', value, key)));
  }

  getUser(key: string): Observable<string | undefined> {
    return from(this.dbPromise.then(db => db.get('auth-user', key)));
  }

  deleteUser(key: string): Observable<void> {
    return from(this.dbPromise.then(db => db.clear('auth-user')));
  }
}
