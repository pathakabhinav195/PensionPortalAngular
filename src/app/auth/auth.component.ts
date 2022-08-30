import { HttpClient } from "@angular/common/http";
import { Component, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component(
    {
        selector:'app-auth',
        templateUrl:'./auth.component.html'
    }
)


export class AuthComponent{
  
    IsLoggedIn = false

    constructor(
        private http : HttpClient,
        private router  :Router
    ){
          if(localStorage.getItem('token') != null)
          {
                   this.IsLoggedIn = true
          }

    }

    Onsubmit(form : NgForm)
    {  
        console.log(form.value.Username)
       
    
        this.http.post(
            "http://20.9.112.113/api/Login",
            {
                "Username" : form.value.Username,
                "Password": form.value.password
            }
        ).subscribe(
            (data : any) =>
           {
            localStorage.setItem('token' , data.token);
            this.IsLoggedIn = true
            this.router.navigateByUrl("/details")
                   },

                   (err:any) =>{
                    console.log(err)
                   }
        )
    }


}