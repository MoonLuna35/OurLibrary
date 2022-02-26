import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MangaDialogService, NewComponent } from '../new/new.component';
import { Manga } from '../services/manga/manga';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mangas: Array<Manga> = []

  constructor(public mangaDialogService: MangaDialogService) {
    
  }

  ngOnInit(): void {
    this.mangaDialogService.manga.subscribe(
      (res: Manga) => {
        this.mangas.push(res);
      }
    )
    
  }
  

}
