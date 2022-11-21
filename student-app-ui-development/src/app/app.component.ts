import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  options = {
    timeOut: 5000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: true,
    preventDuplicates: true,
    maxLength: 10,
    position: ['top', 'center'],
    animate: ['fromTop']
};
}
