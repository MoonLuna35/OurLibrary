import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Manga } from './manga';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  baseUrl = "http://localhost/mangAPI/mangas/";
  constructor(private http: HttpClient) { }


  add(manga : Manga): Observable<any> {
    let payload = {
      data: {
        manga: {
          title: manga.title,
          authors: manga.author,
          volumes: manga.volumes.length,
          state: manga.state
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
