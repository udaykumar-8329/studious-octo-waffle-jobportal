import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatExpansionModule } from "@angular/material/expansion";
import { DragDropModule } from "@angular/cdk/drag-drop"

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    DragDropModule
  ]
})
export class MaterialModule { }
