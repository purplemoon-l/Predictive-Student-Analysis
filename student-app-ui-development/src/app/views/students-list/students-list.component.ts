import { Component, OnInit } from '@angular/core';
import {
  CardAnimation1, CardAnimation2, CardAnimation3,
  CardAnimation4, CardAnimation5, CardAnimation6,
  FadeIn, FadeIn1, FadeIn2,
  LoopAnimation, SlideInFromRight, SizeChange
} from '../../animation.constants';
import { ActivatedRoute } from '@angular/router'; 
import { HttpService } from '../../services/http/http.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
  animations: [CardAnimation1, CardAnimation2, CardAnimation3, CardAnimation4, CardAnimation5, CardAnimation6, FadeIn, FadeIn1, FadeIn2,
    LoopAnimation, SlideInFromRight, SizeChange
]
})
export class StudentsListComponent implements OnInit {
  isLoaded:boolean;
  studentsList: any =[];
  role: any;
  studentsListFinal: any;
  teacherId: any;
  constructor(private service: HttpService, private route: ActivatedRoute,private router: Router) { 

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.role = params['role'];
      this.teacherId = params['id'];
      this.getAllStudents();
    });
  }
  getAllStudents(){
    this.service.get('/student/all').then((data)=>{
      console.log(data);
      this.studentsList = data;
      let tempArray  = data;
      this.studentsListFinal = this.studentsList/* .slice(0,20) */;
      
      this.calculatePrediction(this.studentsListFinal);

      this.isLoaded = true;
    }).catch((error)=>{

    });
  }
  openProfile(student){
   // [routerLink] = "['/app/profile', {'role':role,'id': student.student_id}]"
    this.router.navigate(['app/profile', this.role, student.student_id, this.teacherId]);
  }
  calculatePrediction(studentsListFinal){
    console.log('called 1');
    
    studentsListFinal.forEach((student,index) => {
      let toSend = {};
      toSend = `{    
        "M1": [`+student.student_marks[0].subject_marks+`],
          "M2": [`+student.student_marks[1].subject_marks+`],
          "M3": [`+student.student_marks[2].subject_marks+`],
          "M4": [`+student.student_marks[3].subject_marks+`],
          "sQ1": [0.0],
          "sQ2": [0.0],
          "sQ3": [0.0],
          "sQ4": [0.0],
          "sQ5": [1.0],
          "TQ1": [1.0],
          "TQ2": [0.0],
          "TQ3": [0.0],
          "TQ4": [0.0],
          "TQ5": [0.0]
          }`;
          
     /*  toSend["M1"] = [];
      toSend["M1"].push(student.student_marks[0].subject_marks); 
      toSend["M2"] = [];
      toSend["M2"].push(student.student_marks[1].subject_marks); 
      toSend["M3"] = [];
      toSend["M3"].push(student.student_marks[2].subject_marks); 
      toSend["M4"] = [];
      toSend["M4"].push(student.student_marks[3].subject_marks); 
       */
     // toSend["M4"].push(student.student_marks[3].subject_marks); 
      console.log('called loop',student);
      this.predictCall(student, toSend);

    });
  }

  predictCall(student, toSend){
    this.service.postLocal('http://localhost:5001/predict', (toSend)).then((data)=>{
        student['prediction'] = data['prediction'].toLowerCase();
        console.log('called 8');
      }).catch((error)=>{
  
      });
  }

}
