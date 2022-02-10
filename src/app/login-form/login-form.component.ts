import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  usermodel = new User('', '')

  handleFormSubmit(){
    console.log('form submitted', this.usermodel)
  
  }

  ngOnInit(): void {
  }

}
