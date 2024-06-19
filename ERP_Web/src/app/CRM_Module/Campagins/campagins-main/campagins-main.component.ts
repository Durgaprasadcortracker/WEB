import { Component } from '@angular/core';

@Component({
  selector: 'app-campagins-main',
  templateUrl: './campagins-main.component.html',
  styleUrl: './campagins-main.component.css'
})
export class CampaginsMainComponent {
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
  sharePage(site: string): void {
    window.open(this.socialMediaShare[site], '_blank');
  }

}
