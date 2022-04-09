import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { collectionDialogService, NewComponent } from '../new/new.component';
import { Collection } from '../services/collection/collection';
import { CollectionService } from '../services/collection/collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  collections: Array<Collection> = [
  ]

  constructor(
    public collectionDialogService: collectionDialogService,
    private collectionService: CollectionService  
  ) {
    
  }

  ngOnInit(): void {
    this.collectionDialogService.collection.subscribe(
      (res: Collection) => {
        this.collections.push(res);
      }
    );
    this.collectionService.get_library().subscribe(
      (res: any) => {
        if(res.collections !== undefined && res.collections.length > 0) {
          console.log(res.collections);
          for(let i = 0;  i < res.collections.length; i++) {
            this.collections.push(res.collections[i] as Collection);
          } 
          
        }
        
      }
    );
    
  }
  

}
