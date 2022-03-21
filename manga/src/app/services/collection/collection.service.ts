import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Collection } from './collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  baseUrl = "http://localhost/collectionPI/api/collections/";
  constructor(private http: HttpClient) { }


  add(collection : Collection): Observable<any> {
    let payload = {
      data: {
        collection : {
          title: collection.title,
          editor: collection.editor,
          resume: collection.resume,
          state: collection.state
        }
      }
    }
    return this.http.post(`${this.baseUrl}add`, payload).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
}
