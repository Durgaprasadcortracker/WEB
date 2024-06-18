import { Component, Input } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  menuItems: any = []
  @Input() sideBarvalue: any;
  currentIndex = 0
  subCurrentIndex=0
  constructor(private http: BackendService) {
    this.http.getapi('api/Menu/GetMenus').subscribe((res) => {
      if (res[0].status) {
        this.menuItems = JSON.parse(JSON.stringify(res[0].data));
        this.menuItems.forEach((a: any) => a.submenus = []);
        console.log(this.menuItems);
        let _menuItems: any = []
        for (let i of this.menuItems) {
          if (i.parentId) {
            let parent = _menuItems.find((k: any) => k.id === i.parentId);
            if (parent) {
              parent.submenus.push(i);
            }
          } else {
            _menuItems.push(i);
          }
        }
        this.menuItems = _menuItems
        console.log(this.menuItems);
      }
    });
  }

  ngOnInit() {
    console.log(this.sideBarvalue);
  }
  ngOnChanges() {
    console.log(this.sideBarvalue);
  }
}
