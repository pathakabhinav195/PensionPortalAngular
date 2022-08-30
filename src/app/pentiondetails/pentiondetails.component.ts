import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { PenstionDetails ,PenstionAmount } from './pentiondetail.model';

@Component({
  selector: 'app-pentiondetails',
  templateUrl: './pentiondetails.component.html',
  styleUrls: ['./pentiondetails.component.css']
})
export class PentiondetailsComponent implements OnInit {

  FlagDetails = false ;
  pentiondetail !: PenstionDetails
  processPention !: PenstionAmount 
  message = "No Details to View"

  constructor(private http : HttpClient,private router:Router){
  }
  ngOnInit(): void {
  }

  onLogout()
  {
    localStorage.removeItem('token');
    this.router.navigateByUrl("/");
  }

  
  getDetailsPost(postform : NgForm) {
   
     console.log(postform)
    
     var tokenheader =  new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})


     const baseurl2 = "http://20.118.4.89/api/ProcessPension"
     this.http.post<any>(baseurl2 , {aadhar : "871401017777"},{headers:tokenheader,responseType : 'json'}).subscribe(
      responseData => {
        this.processPention = responseData
      },(err: any) =>
      {

        console.log(err)
        if(err.status == 401)
        {
   
          this.FlagDetails = false 
          this.message = "Unautherised";
          
        }
      }
  )



    const baseurl = "http://20.221.104.156/api/PensionerDetail"
    const url = `${baseurl}/${"871401017777"}`;
    this.http
      .get<PenstionDetails>(url,{
              headers :tokenheader,
               responseType: 'json'
      })
      .subscribe(
        responseData => {
          this.pentiondetail = responseData
        },(err: any) =>
        {

          console.log(err)
          if(err.status == 401)
          {
            this.FlagDetails = false 
            this.message = "Unautherised";
            
          }
        }
      );
      this.FlagDetails = true
  }



}
