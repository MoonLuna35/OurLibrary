import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { collectionDialogService, NewComponent } from '../new/new.component';
import { Collection, CollectionView, fdp } from '../services/collection/collection';
import { CollectionService } from '../services/collection/collection.service';
import { Volume } from '../services/volume/volume';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  collections: Array<CollectionView> = [
  ];
  @ViewChildren("deployable") deployableList!: QueryList<ElementRef>;
  @ViewChildren("deployer") deployerList!: QueryList<ElementRef>;

  constructor(
    public collectionDialogService: collectionDialogService,
    private collectionService: CollectionService  
  ) {
    
  }

  ngOnInit(): void {
    
    this.collectionDialogService.collection.subscribe(
      (res: CollectionView) => {
        this.collections.push(res);
      }
    );
    this.collectionService.get_library().subscribe(
      (res: any) => {
        if(res.collections !== undefined && res.collections.length > 0) {
          
            this.collections = CollectionView.CollectionViewFactoryFromDB(res); 
        }
      }
    );
  }

  OnDeployBroClicked(event: Event, i:number) {
    event.preventDefault();
    
    let to_deploy =  this.deployableList?.get(i);
    if (to_deploy?.nativeElement.classList.contains("gosth")) {
      
      to_deploy?.nativeElement.classList.remove('gosth');
    }
    else {
      to_deploy?.nativeElement.classList.add('gosth')
    }
    this.collections[i].is_deployed = !this.collections[i].is_deployed
  }

  get_deployable(i: number) {
    
    return this.collections[i].is_deployed;
  }
}
