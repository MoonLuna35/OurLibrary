import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from './new/new.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'manga';
  constructor(private dialog: MatDialog) {
  }

ngOnInit(): void {
}

openDialog() {
  
 const dialogRef = this.dialog.open(NewComponent, {
   width: '250px'
 });
 console.log(dialogRef);
 dialogRef.afterClosed().subscribe(result => {
   console.log('The dialog was closed');
 });
}
}
