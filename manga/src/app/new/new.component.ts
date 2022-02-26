import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Injectable, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RegEx } from '../controler/regex';
import { Manga } from '../services/manga/manga';
import { MangaService } from '../services/manga/manga.service';
import { Volume } from '../services/volume/volume';


@Injectable()
export class MangaDialogService {
  manga :EventEmitter<Manga> = new EventEmitter<Manga>();
  private _manga?: Manga;

  setManga(manga: Manga) {
    this._manga = manga;
    this.manga.emit(this._manga);
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
  newMangaForm: FormGroup; //Le formulaire
  volumes: Array<Volume> = [];
  working = false;
  authorLength = 1;
  


  private manga = new Manga({
    title: "",
    author: ""
  })
    constructor(
      protected theDialog: MatDialogRef<NewComponent>,
      protected formBuilder: FormBuilder,
      protected mangaService: MangaService,
      protected mangaDialogService: MangaDialogService,
      private renderer: Renderer2,
      private cdr: ChangeDetectorRef
    ) {
      this.newMangaForm = this.formBuilder.group({
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
    const control = <FormArray>this.newMangaForm.get("author");
    control.push(this.createAuthor(undefined));
    this.authorLength ++
  }
  OnAddAuthorVolumeClicked(event: Event, vol: AbstractControl) {
    event.preventDefault();
    const ctrl = <FormArray>vol.get("author");
    ctrl.push(this.createAuthor(undefined));
    
  }
  OnAddVolumeClicked(): void {
    const control = <FormArray>this.newMangaForm.get("volumes");
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
    const control = <FormArray>this.newMangaForm.get("volumes");
    control.removeAt(i);
    //On modifie les numeros de tomes suivants

  }
  OnRemoveMainAuthorClicked(event: Event, i:number) {
    event.preventDefault();
    const control = <FormArray>this.newMangaForm.get("author");
    
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
    if(this.newMangaForm.valid) {
      this.manga = new Manga({
        title: this.newMangaForm.controls["title"].value,
        author: this.newMangaForm.controls["author"].value,
        volumes: this.volumes
      });
      this.mangaService.add(this.manga).subscribe(
        (res: any) => {
          this.mangaDialogService.setManga(this.manga);
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
    const control = <FormArray>this.newMangaForm.get("volumes");
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
    return (this.newMangaForm.get('author') as FormArray).controls;
  }


  getVolumeControls() {
    return (this.newMangaForm.get('volumes') as FormArray).controls;
  }

  getAuthorOfVolumeControls(vol: AbstractControl) {
    
    return (vol.get('author') as FormArray).controls;
  }

  getAuthorOfVolumeSize(vol: AbstractControl) {
    return (vol.get('author') as FormArray).length;
  }

 

  

 

  
  
}
