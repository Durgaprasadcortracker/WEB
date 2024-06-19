import { Component } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-campagins-main',
  templateUrl: './campagins-main.component.html',
  styleUrl: './campagins-main.component.css'
})
export class CampaginsMainComponent {

  tabs: any[] = ["Campaigns","Email Campaigns","Social Campaigns","SMS Campaigns"]; // Define the correct type for your tabs array
  selectedTab: number | null = null;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  p:number=1;
  openMail=false
toolbar: any;
 
  constructor(private http: BackendService) { }
  companyPage = 0
  listofcampaigns:any
  selectedPlatforms: Set<string> = new Set();
  postContent: string = '';
  selectedFile: File | null = null;
 
  activity = 0
  selectTab(index: number) {
    this.selectedTab = index;
  }
  private url: string = "https://www.youtube.com/channel/UChcK61TdP5xZCrK8a79ID8w";
  // Use window.location.href for current page URL
  // private url: string = window.location.href;

  private socialMediaShare:any  = {

    'whatsapp': `https://api.whatsapp.com/send?text=${this.url}`,
    'facebook': `https://facebook.com/sharer/sharer.php?u=${this.url}`,
    'twitter': `https://twitter.com/share?url=${this.url}`,
    'instagram': `https://www.instagram.com/shareArticle?mini=true&url=${this.url}&title=hello`,
    'telegram': `https://t.me/share/url?url=${this.url}`,
    'mail': `mailto:?subject=testmail&body=${this.url}`,
    'pinterest': `https://www.pinterest.com/=${this.url}`
  };
  // toggleSelectAll(checked: boolean): void {
  //   const socialMediaSites = Object.keys(this.socialMediaShare);
  //   socialMediaSites.forEach(site => {
  //     const checkbox = document.getElementById(`checkbox-${site}`) as HTMLInputElement;
  //     checkbox.checked = checked;
  //   });
  // }
  
  toggleSelect(event: any, platform: string) {
    if (event.target.checked) {
      this.selectedPlatforms.add(platform);
    } else {
      this.selectedPlatforms.delete(platform);
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  // sharePage(platform: string) {
   
  //   console.log(`Sharing on ${platform}`);
  // }

  postNow() {
    const selectedArray = Array.from(this.url);
    const postData = {
      content: this.postContent,
      platforms: selectedArray,
      file: this.selectedFile
    };

    this.sendToPlatforms(postData);
  }

  toggleSelectwhatsapp(checked: any): void {
    const checkbox = document.getElementById(`checkbox-${'whatsapp'}`) as HTMLInputElement;
    checkbox.checked = checked.value;
  }
  // toggleSelect(site: string, checked: boolean): void {
  //   const checkbox = document.getElementById(`checkbox-${site}`) as HTMLInputElement;
  //   checkbox.checked = checked;
  // }
  toggleSelecttwitter(checked: any): void {
    const checkbox = document.getElementById(`checkbox-${'twitter'}`) as HTMLInputElement;
    checkbox.checked = checked.value;
  }
  toggleSelectinstagram(checked: any): void {
    const checkbox = document.getElementById(`checkbox-${'instagram'}`) as HTMLInputElement;
    checkbox.checked = checked.value;
  }
  toggleSelectlinkedin(checked: any): void {
    const checkbox = document.getElementById(`checkbox-${'linkedin'}`) as HTMLInputElement;
    checkbox.checked = checked.value;
  }
  toggleSelectfacebook(checked: any): void {
    const checkbox = document.getElementById(`checkbox-${'facebook'}`) as HTMLInputElement;
    checkbox.checked = checked.value;
  }
  toggleSelectmail( checked: any): void {
    const checkbox = document.getElementById(`checkbox-${'mail'}`) as HTMLInputElement;
    checkbox.checked = checked.value;
  }
  toggleSelectpinterest(checked: any): void {
    const checkbox = document.getElementById(`checkbox-${'pinterest'}`) as HTMLInputElement;
    checkbox.checked = checked.value;
  }
  sendToPlatforms(postData: any) {
    postData.platforms.forEach((platform: string) => {
      console.log(`Sending to ${platform}`);
      // Replace with actual API calls to each platform
      this.fakeApiCall(platform, postData.content, postData.file);
    });
  }

  fakeApiCall(platform: string, content: string, file: File | null) {
    // Simulate an API call
    console.log(`Posting to ${platform} with content: "${content}" and file:`, file);
    // Add your actual API integration logic here
  }

  sharePage(site: string): void {
    window.open(this.socialMediaShare[site], '_blank');
  }

}
