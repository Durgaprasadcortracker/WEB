import { Component } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'

  
})

export class UserProfileComponent  {

  page: number = 1;
  count: number = 0;
  p:number=1;
  a: any;
 constructor(private http: BackendService) { }
  data = {
    records: 0
  }
  profilePage = 0
  listOfCompanys:any
  editData:any

  ngOnInit() {
    this.getData()
  }

  addProfile(message: any) {
    console.log(message);
    this.profilePage = 0;
    this.editData = null;
    this.ngOnInit()
  }
  getData(){
    this.http.getapi('api/user-profile/GetProfile').subscribe((res) => {
        console.log(res);
        console.log
        this.listOfCompanys=res.data
      }
    );
  }
  









  activeTab: string = 'about'; // Default active tab

  showTab(tabName: string) {
    this.activeTab = tabName;
  }

  editProfile() {
    // Add your logic to handle profile editing
    console.log('Edit Profile button clicked');
  }
}
