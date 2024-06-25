import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-social-media-campagins',
  templateUrl: './social-media-campagins.component.html',
  styleUrl: './social-media-campagins.component.css',
})
export class SocialMediaCampaginsComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  p: number = 1;
  openMail = false;
  toolbar: any;
  campaigns: any;

  constructor(private http: BackendService) {}
  companyPage = 0;
  listofcampaigns: any;
  selectedPlatforms: Set<string> = new Set();
  postContent: string = '';
  selectedFile: File | null = null;

  activity = 0;

  private url: string =
    'https://www.youtube.com/channel/UChcK61TdP5xZCrK8a79ID8w';
  // Use window.location.href for current page URL
  // private url: string = window.location.href;

  public socialMediaShare: any = {
    whatsapp: `https://api.whatsapp.com/send?text=${this.url}`,
    facebook: `https://facebook.com/sharer/sharer.php?u=${this.url}`,
    twitter: `https://twitter.com/share?url=${this.url}`,
    instagram: `https://www.instagram.com/shareArticle?mini=true&url=${this.url}&title=hello`,
    telegram: `https://t.me/share/url?url=${this.url}`,
    mail: `mailto:?subject=testmail&body=${this.url}`,
    pinterest: `https://www.pinterest.com/=${this.url}`,
  };
  // toggleSelectAll(checked: boolean): void {
  //   const socialMediaSites = Object.keys(this.socialMediaShare);
  //   socialMediaSites.forEach(site => {
  //     const checkbox = document.getElementById(`checkbox-${site}`) as HTMLInputElement;
  //     checkbox.checked = checked;
  //   });
  // }

  share(){
    debugger;
    if(navigator.share)
      {
        navigator.share({
          title:"Social media",
          text:"Check the mail",
          url: "https://www.youtube.com/channel/UChcK61TdP5xZCrK8a79ID8w"
        });
      }
  }
  sharevalidate(name:any,url:any){
    debugger;
    if(name=="whatsapp"){
      navigator.share({
        title:"Social media",
        text:"Check the mail",
        url: this.socialMediaShare.whatsapp
      });
    }
    if(name=="twitter"){
      navigator.share({
        title:"Social media",
        text:"Check the mail",
        url: this.socialMediaShare.twitter
      });
    }
    if(name=="instagram"){
      navigator.share({
        title:"Social media",
        text:"Check the mail",
        url: this.socialMediaShare.instagram
      });
    }
    if(name=="linkedin"){
      navigator.share({
        title:"Social media",
        text:"Check the mail",
        url: this.socialMediaShare.linkedin
      });
    }
    if(name=="facebook"){
      navigator.share({
        title:"Social media",
        text:"Check the mail",
        url: this.socialMediaShare.facebook
      });
    }
    if(name=="email"){
      navigator.share({
        title:"Social media",
        text:"Check the mail",
        url: this.socialMediaShare.mail
      });
    }
    if(name=="pinterest"){
      navigator.share({
        title:"Social media",
        text:"Check the mail",
        url: this.socialMediaShare.pinterest
      });
    }
  }

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
    debugger;
    if(this.whatsappchecked=='true'){
      window.open(this.socialMediaShare['whatsapp'], "w1","status=1,toolbar=1,menubar=1");

    }
    if(this.twitterchecked=='true'){
      window.open(this.socialMediaShare['twitter'], "w2","status=1,toolbar=1,menubar=1");
    }
    if(this.instagramchecked=='true'){
      window.open(this.socialMediaShare['instagram'], "w3","status=1,toolbar=1,menubar=1");
    }
    if(this.linkedinchecked=='true'){
      window.open(this.socialMediaShare['linkedin'], "w4","status=1,toolbar=1,menubar=1");
    }
    if(this.facebookchecked=='true'){
      window.open(this.socialMediaShare['facebook'], "w5","status=1,toolbar=1,menubar=1");
    }
    if(this.mailchecked=='true'){
      window.open(this.socialMediaShare['mail'], "w6","status=1,toolbar=1,menubar=1");
    }
    if(this.pinterestchecked=='true'){
      window.open(this.socialMediaShare['pinterest'], "w7","status=1,toolbar=1,menubar=1");
    }
    // const selectedArray = Array.from(this.url);
    // const postData = {
    //   content: this.postContent,
    //   platforms: selectedArray,
    //   file: this.selectedFile,
    // };

    // this.sendToPlatforms(postData);
  }
  whatsappchecked:any=false;
  toggleSelectwhatsapp(checked: any): void {
    debugger;
    // const checkbox = document.getElementById(
    //   `checkbox-${'whatsapp'}`
    // ) as HTMLInputElement;
    // checkbox.checked = checked.value;
    if(checked.target.checked==true){
      this.whatsappchecked='true';
    }
    // else{
    //   this.whatsappchecked='false';
    // }
  }
  // toggleSelect(site: string, checked: boolean): void {
  //   const checkbox = document.getElementById(`checkbox-${site}`) as HTMLInputElement;
  //   checkbox.checked = checked;
  // }
  twitterchecked:any=false;
  toggleSelecttwitter(checked: any): void {
    if(checked.target.checked==true){
      this.twitterchecked='true';
    }
  }
  instagramchecked:any=false;
  toggleSelectinstagram(checked: any): void {
    if(checked.target.checked==true){
      this.instagramchecked='true';
    }
  }
  linkedinchecked:any=false;
  toggleSelectlinkedin(checked: any): void {
    if(checked.target.checked==true){
      this.linkedinchecked='true';
    }
  }
  facebookchecked:any=false;
  toggleSelectfacebook(checked: any): void {
    if(checked.target.checked==true){
      this.facebookchecked='true';
    }
  }
  mailchecked:any=false;
  toggleSelectmail(checked: any): void {
    if(checked.target.checked==true){
      this.mailchecked='true';
    }
  }
  pinterestchecked:any=false;
  toggleSelectpinterest(checked: any): void {
    if(checked.target.checked==true){
      this.pinterestchecked='true';
    }
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
    console.log(
      `Posting to ${platform} with content: "${content}" and file:`,
      file
    );
    // Add your actual API integration logic here
  }

  sharePage(site: string): void {
    window.open(this.socialMediaShare[site], '_blank');
  }
}
