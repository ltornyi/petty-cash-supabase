import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CashGridComponent } from '../grid/cash-grid.component';

@Component({
  selector: 'app-cash-main',
  standalone: true,
  imports: [ToolbarComponent, CashGridComponent],
  templateUrl: './cash-main.component.html',
  styleUrl: './cash-main.component.css'
})
export class CashMainComponent {

}
