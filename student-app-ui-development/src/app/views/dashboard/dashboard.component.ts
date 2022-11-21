import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import {
  CardAnimation1, CardAnimation2, CardAnimation3,
  CardAnimation4, CardAnimation5, CardAnimation6,
  FadeIn, FadeIn1, FadeIn2,
  LoopAnimation, SlideInFromRight, SizeChange
} from '../../animation.constants';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [CardAnimation1, CardAnimation2, CardAnimation3, CardAnimation4, CardAnimation5, CardAnimation6, FadeIn, FadeIn1, FadeIn2,
    LoopAnimation, SlideInFromRight, SizeChange
]
})
export class DashboardComponent implements OnInit {
  role:any;
  instituteId:any;
  constructor(private _notificationsService: NotificationsService, private route: ActivatedRoute) { }

  ngOnInit() {
   // this._notificationsService.success('Success', 'Added successfully');
    this.route.params.subscribe((params) => {
      this.role = params['role'];
      this.instituteId = params['id'];
    });
  }

}
