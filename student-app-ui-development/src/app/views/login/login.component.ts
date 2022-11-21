import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http/http.services';
import { NotificationsService } from 'angular2-notifications';

import {
  CardAnimation1, CardAnimation2, CardAnimation3,
  CardAnimation4, CardAnimation5, CardAnimation6,
  FadeIn, FadeIn1, FadeIn2,
  LoopAnimation, SlideInFromRight, SizeChange
} from '../../animation.constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [CardAnimation1, CardAnimation2, CardAnimation3, CardAnimation4, CardAnimation5, CardAnimation6, FadeIn, FadeIn1, FadeIn2,
    LoopAnimation, SlideInFromRight, SizeChange]
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  constructor(private router: Router, private service: HttpService,private _notificationsService: NotificationsService) { }

  ngOnInit() {
    
  }

  login(){
    let toSend = {};
    toSend['email'] = this.username;
    toSend['password'] = this.password;
    this.service.post('/user/login', JSON.stringify(toSend)).then((data)=>{
      console.log(data);
    //  this.profileDetails = data;
    if(data['role_name'] == 'student'){
      this.loginTo('student',data['user_id']);
    }else if(data['role_name'] == 'teacher'){
      this.loginTo('teacher',data['user_id']);
    }else if(data['role_name'] == 'institute'){
      this.loginTo('institute',data['user_id']);
    }
      
    }).catch((error)=>{
    //  this.loginTo('teacher',1);
    this._notificationsService.error('Error', 'Incorrect user credentials');
    });
  }
  loginTo(role, id){
    if(role == 'student'){
      this.router.navigate(['app/profile', role, id]);
    }else if(role == 'teacher'){
      this.router.navigate(['app/students-list', role, id]);
    }else if(role == 'institute'){
      this.router.navigate(['app/dashboard', role, id]);
    }
    
  }

}
