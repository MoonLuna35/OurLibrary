import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Injectable, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RegEx } from '../controler/regex';
import { Collection } from '../services/collection/collection';
import { CollectionService } from '../services/collection/collection.service';
import { Volume } from '../services/volume/volume';


@Injectable()
export class collectionDialogService {
  collection :EventEmitter<Collection> = new EventEmitter<Collection>();
  private _collection?: Collection;

  setcollection(collection: Collection) {
    this._collection = collection;
    this.collection.emit(this._collection);
  }
}

@Component({
  template:""
})
export class NewEntry implements OnInit {

  constructor(private dialog: MatDialog, private router: Router,
    private route: ActivatedRoute) {
    const dialogRef = this.dialog.open(NewComponent, {
      panelClass: 'custom-modalbox',
      height: '95%',
      width: '1200px',
    });
    
    dialogRef.afterClosed().subscribe(result => { //QUAND il se ferme
      this.router.navigate(['../'], { relativeTo: this.route });
     });
   }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @ViewChildren("volume") volumeList?: QueryList<ElementRef>;
  @ViewChildren("deployer") deployerList?: QueryList<ElementRef>;
  newcollectionForm: FormGroup; //Le formulaire
  volumes: Array<Volume> = [];
  working = false;
  authorLength = 1;
  


  private collection = new Collection({
    title: "",
    author: "",
    editor: "",
    resume: ""
  })
    constructor(
      protected theDialog: MatDialogRef<NewComponent>,
      protected formBuilder: FormBuilder,
      protected collectionService: CollectionService,
      protected collectionDialogService: collectionDialogService,
      private renderer: Renderer2,
      private cdr: ChangeDetectorRef
    ) {
      this.newcollectionForm = this.formBuilder.group({
        title: ["", Validators.compose([
          Validators.required, 
          Validators.pattern(RegEx.ALPHA_PATERN)
        ])],
        editor: ["", Validators.compose([
          Validators.pattern(RegEx.ALPHA_PATERN)
        ])],
        author: this.formBuilder.array([this.createAuthor(undefined)]),
        sameAuthor: [true],
        volumes: this.formBuilder.array([]),
      })
  }
  //ng
  ngOnInit(): void {
    
  }

  //events
  OnAddMainAuthorClicked() {
    const control = <FormArray>this.newcollectionForm.get("author");
    control.push(this.createAuthor(undefined));
    this.authorLength ++
  }
  OnAddAuthorVolumeClicked(event: Event, vol: AbstractControl) {
    event.preventDefault();
    const ctrl = <FormArray>vol.get("author");
    ctrl.push(this.createAuthor(undefined));
    
  }
  OnAddVolumeClicked(): void {
    const control = <FormArray>this.newcollectionForm.get("volumes");
    control.push(this.createVolume(undefined));

    this.cdr.detectChanges();
    
  }
  OnDeployBroClicked(event: Event, i:number) {
    event.preventDefault();
    let to_deploy =  this.volumeList?.get(i);
    if (to_deploy?.nativeElement.classList.contains("gosth")) {
      to_deploy?.nativeElement.classList.remove('gosth');
    }
    else {
      to_deploy?.nativeElement.classList.add('gosth')
    }
  }
  OnRemoveVolumeClicked(event: Event, i:number): void {
    event.preventDefault();
    const control = <FormArray>this.newcollectionForm.get("volumes");
    control.removeAt(i);
    //On modifie les numeros de tomes suivants

  }
  OnRemoveMainAuthorClicked(event: Event, i:number) {
    event.preventDefault();
    const control = <FormArray>this.newcollectionForm.get("author");
    
    control.removeAt(i);
    this.authorLength --

  }
  OnRemoveVolumeAuthorClicked(event: Event, volume: AbstractControl, j: number) {
    event.preventDefault();
    const ctrl = <FormArray>volume.get("author");
    ctrl.removeAt(j);
  }
  onSubmit(event: Event) {
    event.preventDefault();
    this.working =true;
    if(this.newcollectionForm.valid) {
      this.collection = new Collection({
        title: this.newcollectionForm.controls["title"].value,
        author: this.newcollectionForm.controls["author"].value,
        editor: this.newcollectionForm.controls["editor"].value,
        resume: "",
        volumes: this.volumes
      });
      this.collectionService.add(this.collection).subscribe(
        (res: any) => {
          this.collectionDialogService.setcollection(this.collection);
          this.theDialog.close();
        },
      )
    }
  }

  //methodes
 
  private createAuthor(item: any|undefined): FormGroup {
    if (item === undefined) {
      return this.formBuilder.group({
        name: ["", Validators.pattern(RegEx.ALPHA_PATERN)],
        surname: ["", Validators.pattern(RegEx.ALPHA_PATERN)],
        function: ["author"]
      });
    }
    else {
      return this.formBuilder.group({
        name: [item.name, Validators.pattern(RegEx.ALPHA_PATERN)],
        surname: [item.surname, Validators.pattern(RegEx.ALPHA_PATERN)],
        function: [item.function]
      });
    }
    
  }

  private createVolume(item: any|undefined): FormGroup {
    const control = <FormArray>this.newcollectionForm.get("volumes");
    if (item === undefined) {
      return this.formBuilder.group({
        volume_number: [control.length +1],
        title: ["", Validators.pattern(RegEx.ALPHA_PATERN)],
        resume: [""],
        author: this.formBuilder.array([this.createAuthor(undefined)]),
        release_date: [""],
        purchase_link: ["", Validators.pattern(RegEx.URL_PATERN)]

      });
    }
    else {
      return this.formBuilder.group({
        volume_number: [control.length +1],
        title: [item.title, Validators.pattern(RegEx.ALPHA_PATERN)],
        resume: [item.resume],
        author: this.formBuilder.array([this.createAuthor(item.author)]),
        release_date: [item.release_date],
        purchase_link: [item.purchase_link, Validators.pattern(RegEx.URL_PATERN)]
      });
    }
    
  }
  getAuthorControls() {
    return (this.newcollectionForm.get('author') as FormArray).controls;
  }


  getVolumeControls() {
    return (this.newcollectionForm.get('volumes') as FormArray).controls;
  }

  getAuthorOfVolumeControls(vol: AbstractControl) {
    
    return (vol.get('author') as FormArray).controls;
  }

  getAuthorOfVolumeSize(vol: AbstractControl) {
    return (vol.get('author') as FormArray).length;
  }

 

  

 

  
  
}
