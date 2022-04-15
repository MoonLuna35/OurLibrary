import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { collectionDialogService, NewComponent } from '../new/new.component';
import { Collection, CollectionView, fdp } from '../services/collection/collection';
import { CollectionService } from '../services/collection/collection.service';
import { Volume } from '../services/volume/volume';
import { VolumeService } from '../services/volume/volume.service';

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
  is_working: boolean = true

  constructor(
    public collectionDialogService: collectionDialogService,
    private collectionService: CollectionService,
    private volumeService: VolumeService 
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

    this.is_working = false;
  }

  OnBuyerClicked(event: Event, i: number, j: number) {
    event.preventDefault();
    let vol: Volume = this.collections[i].volumes[j];
    if(
      !this.collections[i].volumes[j].is_buyed
      &&
      !this.is_working
    ) {
      this.is_working = true;
      vol.is_buyed = true;
      this.volumeService.update_is_buyed(vol).subscribe(
        (res: any) => {
          if(res.status !== undefined && res.status === "ok") {
            this.collections[i].set_volume_buyed(j, true);
          }
          this.is_working = false;
        }
        
      );
    }
  }

  OnUnbuyerClicked(event: Event, i: number, j: number) {
    event.preventDefault();
    let vol: Volume = this.collections[i].volumes[j];
    if(
      this.collections[i].volumes[j].is_buyed
      &&
      !this.is_working
    ) {
      this.is_working = true;
      vol.is_buyed = false;
      this.volumeService.update_is_buyed(vol).subscribe(
        (res: any) => {
          if(res.status !== undefined && res.status === "ok") {
            this.collections[i].set_volume_buyed(j, false);
          }
          this.is_working = false;
        }
        
      );
    }
    
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
