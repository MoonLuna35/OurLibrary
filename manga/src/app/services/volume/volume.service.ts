import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Volume } from './volume';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {

  baseUrl = "http://localhost/mangAPI/api/books/";
  constructor(private http: HttpClient) { }

  update_is_buyed(volume: Volume): Observable<any> {
    let payload = {
      data: {
        volume: {
          id: volume.id,
          is_buyed: volume.is_buyed
        }
      }
    }
    return this.http.post(`${this.baseUrl}buy_volume`, payload).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
}
