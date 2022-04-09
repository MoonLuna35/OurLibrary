import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAuthor } from '../author/author';
import { IVolume } from '../volume/volume';
import { Collection } from './collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  baseUrl = "http://localhost/mangAPI/api/books/";
  constructor(private http: HttpClient) { }


  add(collection : Collection): Observable<any> {
    let volumes: Array<IVolume> = [];
    let authors: Array<IAuthor> = [];
    let i: number, j:number = 0;

    const vols = collection.volumes;
    for(i = 0; i < vols.length; i++) { //POUR tout volume FAIRE 
      authors = [];
      for(j = 0; j < vols[i].authors.length; j++) { //POUR tout auteur du volume i FAIRE
        //SI il n'utilise pas d'id ALORS
        
        authors.push({
          //id: vols[i].authors[j].id,
          name: vols[i].authors[j].name,
          surname: vols[i].authors[j].surname,
          function: vols[i].authors[j].function
        });
      }
      volumes.push({
        num: vols[i].num,
        //resume: vols[i].resume,
        //parution_date: vols[i].parution_date,
        //buy_link: vols[i].buy_link,
        is_buyed: vols[i].is_buyed,
        authors: authors
      });
      if (vols[i].title !== "") {
        volumes[i].title = vols[i].title;
      }
      if (vols[i].resume !== "") {
        volumes[i].resume = vols[i].resume;
      }
      if (vols[i].parution_date) {
        volumes[i].parution_date = vols[i].parution_date;
      }
      if (vols[i].buy_link !== "") {
        
        volumes[i].buy_link = vols[i].buy_link;
      }
      console.log(vols[i].parution_date);
    } 
      
    
    let payload = {
      data: {
        collection : {
          title: collection.title,
          editor: collection.editor,
          resume: collection.resume,
          is_conserved: collection.is_conserved,
          volumes: volumes
        }
      }
    }
      return this.http.post(`${this.baseUrl}add`, payload).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  get_library() {
    return this.http.get(`${this.baseUrl}get-library`, {}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
}
