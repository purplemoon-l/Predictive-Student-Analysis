import { Component, OnInit } from '@angular/core';
import {
  CardAnimation1, CardAnimation2, CardAnimation3,
  CardAnimation4, CardAnimation5, CardAnimation6,
  FadeIn, FadeIn1, FadeIn2,
  LoopAnimation, SlideInFromRight, SizeChange
} from '../../animation.constants';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http/http.services';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [CardAnimation1, CardAnimation2, CardAnimation3, CardAnimation4, CardAnimation5, CardAnimation6, FadeIn, FadeIn1, FadeIn2,
    LoopAnimation, SlideInFromRight, SizeChange
  ]
})
export class ProfileComponent implements OnInit {

  currentTab: any;
  isLoaded: boolean;
  questions: any = [
    /* {
      question:'Did you choose this course with passion?',
      answer:'yes'
    } */
  ];
  questions_teacher: any = [
    /* {
      question:'Did you choose this course with passion?',
      answer:'yes'
    } */
  ];
  profileDetails: any;
  semesterDetails: any;
  studentQuestions: any;
  teacherQuestions: any;
  lastQuestionIndex: any;
  lastQuestionTeacherIndex: any;
  progressStage1: any;
  progressStage2: any;
  progressStage3: any;
  progressStage4: any;
  teacherId: any;
  studentId: any;
  flag: any;
  predictedCourse: any;
  userRole: any;
  predictionDetails: any;
  suggestionResult: any;
  suggestions: any/* [{
    "field" : "Creativity",
    "score" : "45"
  },{
    "field" : "Coding concepts",
    "score" : "61"
  },{
    "field" : "Participation",
    "score" : "20"
  },{
    "field" : "Communication",
    "score" : "65"
  }] */;
  constructor(private service: HttpService, private route: ActivatedRoute, private _notificationsService: NotificationsService) {

  }

  ngOnInit() {
    this.currentTab = 'tab1';

    this.route.params.subscribe((params) => {
      this.studentId = params['id'];
      this.teacherId = params['teacherId'];
      this.userRole = params['role'];
      this.getStudentDetails(params['id']);
      this.getSemesterDetails(params['id']);
      this.getStudentQuestions(params['id']);
      this.getTeacherQuestions(params['id']);
    });

    this.predictionDetails = [];
  }

  switchTab(tab) {
    this.currentTab = tab;
  }

  saveTeacherAnswer(answer, question) {
    if (this.lastQuestionTeacherIndex <= 5) {
      this.postTeacherAnswer(answer, question.question_id);
    }
    question.question_answer = answer;
  }

  pushNewTeacherQuestion(answer, question) {
    if (this.lastQuestionTeacherIndex <= 5) {
      this.postTeacherAnswer(answer, question.question_id);
    }
    question.question_answer = answer;
  }


  postTeacherAnswer(answer, questionId) {
    this.questions_teacher.push(this.teacherQuestions[++this.lastQuestionTeacherIndex]);
    let request = {
      teacher_id: this.teacherId,
      student_id: this.studentId,
      question_id: questionId,
      question_answer: answer
    };
    console.log(request);
    this.service.post('/teacher/questions/save', JSON.stringify(request)).then((data) => {
      console.log(data);
    }).catch((error) => {

    });
  }
  saveAnswer(answer, question) {
    if (this.lastQuestionIndex <= 5) {
      this.postStudentAnswer(answer, question.question_id);
    }

    question.question_answer = answer;
  }

  postStudentAnswer(answer, questionId) {
    this.questions.push(this.studentQuestions[++this.lastQuestionIndex]);
    let request = {
      student_id: this.studentId,
      question_id: questionId,
      question_answer: answer
    };
    console.log(request);
    this.service.post('/student/questions/save', JSON.stringify(request)).then((data) => {
      console.log(data);
    }).catch((error) => {

    });
  }

  pushNewQuestion(answer, question) {
    if (this.lastQuestionIndex <= 5) {
      this.postStudentAnswer(answer, question.question_id);
    }

    question.question_answer = answer;
    // console.log(this.questions);

    /* this.questions.push({
      question:'Did you choose this course with passion?',
      answer:'yes'
    }) */
  }

  getStudentDetails(id) {
    this.service.get('/student/' + id).then((data) => {
      console.log(data);
      this.profileDetails = data;
      this.isLoaded = true;
    }).catch((error) => {

    });
  }

  sendMail(predictedCourse) {
    let name = this.profileDetails.student_first_name;
    let recipient_email = this.profileDetails.student_email;


    let salute = "Hi " + name + ",\n\n";

    let content = `
    Your prediction is `+ this.suggestionResult+`<br><br>
    
    
    `;
    if(this.suggestionResult == 'PG'){
      content+=`We can't choose where we come from but we can choose where we go from there.<br>
      Do not go where the path may lead, go instead where there is no path and leave a trail.`
    } else if(this.suggestionResult == 'Job'){
      content+=`Learn certain basic concepts in your technical side like data structures which help you in a long run.`
    } else if(this.suggestionResult == 'DropOut'){
      content+=`Learn about other fields which interests you.<br>
      Talk to the necessary faculties in case they can help you understand in a way you like to learn the concepts.`
    }

/*     <ng-container *ngIf="suggestionResult == 'DropOut'">
    Learn about other fields which interests you.<br>
    Talk to the necessary faculties in case they can help you understand in a way you like to learn the concepts.
</ng-container>
<ng-container *ngIf="suggestionResult == 'Job'">
    Learn certain basic concepts in your technical side like data structures which help you in a long run.
</ng-container>
<ng-container *ngIf="suggestionResult == 'PG'">
    We can't choose where we come from but we can choose where we go from there.<br>
Do not go where the path may lead, go instead where there is no path and leave a trail.
</ng-container>


 */
    let signature = "\n\nRegards,\nTeam Prophet AI";

    let message = salute + content + signature;

    let request :any = {
      recipient_email: recipient_email,
      message: message
    }
    this.service.post('/mail', request).then((data) => {
      // this.isLoaded = true;
      this._notificationsService.success('Success!', 'Analysis report has been sent to your email');

    }).catch((error) => {
      // this._notificationsService.error('Oops!', 'Could not deliver yo');
    });
  }

  getSemesterDetails(id) {
    this.service.get('/student/marks/' + id).then((data) => {
      console.log(data);
      this.semesterDetails = data;
      this.predictOutcomeCall();
      // this.isLoaded = true;
    }).catch((error) => {

    });
  }

  getStudentQuestions(id) {
    this.service.get('/student/questions/' + id).then((data) => {
      console.log(data);
      this.studentQuestions = data;
      // this.isLoaded = true;

      // for(let question of this.studentQuestions){
      for (let i = 0; i < this.studentQuestions.length; i++) {
        let question = this.studentQuestions[i];
        if (question.question_answer != null) {
          this.questions.push(question);
        } else {
          this.questions.push(question);
          this.lastQuestionIndex = i;
          break;
        }
      };
      this.generateValues();
    }).catch((error) => {

    });
  }

  getTeacherQuestions(id) {
    let url = '/teacher/questions/' + 52 + "?student=" + this.studentId;;
    if (this.teacherId) {
      url = '/teacher/questions/' + 52 + "?student=" + this.studentId;
    }
    this.service.get(url).then((data) => {
      console.log(data);
      this.teacherQuestions = data;
      // this.isLoaded = true;

      // for(let question of this.studentQuestions){
      for (let i = 0; i < this.teacherQuestions.length; i++) {
        let question = this.teacherQuestions[i];
        if (question.question_answer != null) {
          this.questions_teacher.push(question);
        } else {
          this.questions_teacher.push(question);
          this.lastQuestionTeacherIndex = i;
          break;
        }
      };
    }).catch((error) => {

    });
  }


  savePrediction(result) {
    var today = new Date().toLocaleString();

    var result = result;


    this.predictionDetails.push({
      date: today,
      status: result
    });

    //console.log(this.predictionDetails);

    localStorage.setItem('prediction', JSON.stringify(this.predictionDetails));

  }
  viewHistory() {

    let predictionDetails = JSON.parse(localStorage.getItem('prediction'));
    this.predictionDetails = predictionDetails;

  }

  showSuccess() {

    this._notificationsService.success('Thanks!', 'Prophet AI will learn from your feedback.');
  }

  showFailure() {

    this._notificationsService.warn('Sorry!', 'Prophet AI will learn from its mistake.');
  }

  showPrediction() {
    this.progressStage1 = true;
    this.progressStage2 = false;
    this.progressStage3 = false;
    this.progressStage4 = false;
    setTimeout(() => {
      this.progressStage1 = false;
      this.progressStage2 = true;
      this.progressStage3 = false;
      this.progressStage4 = false;
    }, 2000);
    setTimeout(() => {
      this.progressStage1 = false;
      this.progressStage2 = false;
      this.progressStage3 = true;
      this.progressStage4 = false;
    }, 4000);
    setTimeout(() => {
      this.progressStage1 = false;
      this.progressStage2 = false;
      this.progressStage3 = false;
      this.progressStage4 = true;
      this.flag = true;
    }, 6000);

    this.service.get('/student/questions/' + this.studentId).then((data) => {
      console.log(data);
      //  this.studentQuestions = data;
      let testData = `{
        "Q1": [`+ (data[0]['question_answer'] == 'yes' ? 1.0 : 0.0) + `],
        "Q2": [`+ (data[1]['question_answer'] == 'yes' ? 1.0 : 0.0) + `],
        "Q3": [`+ (data[2]['question_answer'] == 'yes' ? 1.0 : 0.0) + `],
        "Q4": [`+ (data[3]['question_answer'] == 'yes' ? 1.0 : 0.0) + `],
        "Q5": [`+ (data[4]['question_answer'] == 'yes' ? 1.0 : 0.0) + `]  
    }`;
      this.predictCall(testData);

    }).catch((error) => {

    });

  }

  predictCall(toSend) {
    this.flag = false;
    this.service.postLocal('http://localhost:5002/predict', (toSend)).then((data) => {
      //     student['prediction'] = data['prediction'].toLowerCase();
      //  console.log('called 8');
      this.predictedCourse = data['prediction'];
      if (this.predictedCourse == 'SW') {
        this.predictedCourse = 'Software Developer';
      } else if (this.predictedCourse == 'AI') {
        this.predictedCourse = 'Artificial Intelligence';
      } else if (this.predictedCourse == 'Cyber') {
        this.predictedCourse = 'Cyber Security';
      }
      console.log(this.predictedCourse, 'aa');
      this.sendMail(this.predictedCourse);
      this.savePrediction(this.predictedCourse);
    }).catch((error) => {
        this.flag = false;
      //this.sendMail("dropout");
      //this.savePrediction("dropout");
    });
  }

  predictOutcomeCall(){
   // let toSend = {};
   // let student_marks = this.semesterDetails;
     let toSend = `{    
          "M1": [`+ this.semesterDetails[0].semester_details[0].subject_marks+`],
          "M2": [`+ this.semesterDetails[0].semester_details[1].subject_marks+`],
          "M3": [`+ this.semesterDetails[0].semester_details[2].subject_marks+`],
          "M4": [`+ this.semesterDetails[0].semester_details[3].subject_marks+`],
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
    this.service.postLocal('http://localhost:5001/predict', toSend).then((data)=>{
       
        console.log('called 8');
        this.suggestionResult = data['prediction'];
      }).catch((error)=>{
  
      });
  }
  generateValues(){
    let score1, score2, score3, score4;
   //this.studentQuestions[0]['question_answer'] !=null
    /* this.studentQuestions.forEach(question => {
      if(question['question_answer'] != null){
       score1 = question['question_answer'] == 'yes' ? 1 * 85 : 0;
      }

      if(question['question_answer'] != null){
        score2 = question['question_answer'] == 'yes' ? 1 * 64 : 0;
       }
      
    }); */
    score1 = this.studentQuestions[0]['question_answer'] == 'yes' ? 1 * 65 : 0;
    score2 = this.studentQuestions[1]['question_answer'] == 'yes' ? 1 * 25 : (score1/2 + 10);
    score3 = this.studentQuestions[2]['question_answer'] == 'yes' ? (1 * 6 + score1) : 0;
    score4 = this.studentQuestions[3]['question_answer'] == 'yes' ? ((1 * 2) + score3 ): 0;
    this.suggestions = JSON.parse(`[{
      "field" : "Creativity",
      "score" : "`+score1+`"
    },{
      "field" : "Coding concepts",
      "score" : "`+ score3+`"
    },{
      "field" : "Participation",
      "score" : "`+ score2+`"
    },{
      "field" : "Communication",
      "score" : "`+score4+`"
    }]`);
  }
}
