import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { collectionDialogService, NewComponent } from '../new/new.component';
import { Collection } from '../services/collection/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  collections: Array<Collection> = []

  constructor(public collectionDialogService: collectionDialogService) {
    
  }

  ngOnInit(): void {
    this.collectionDialogService.collection.subscribe(
      (res: Collection) => {
        this.collections.push(res);
      }
    )
    
  }
  

}
