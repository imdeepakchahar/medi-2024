import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/Token/token-storage.service';
import { ApiService } from '../../services/Api/api.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.scss'],
})
export class SpecialitiesComponent implements OnInit {
  constructor(
    private tokenStorage: TokenStorageService,
    private ApiService: ApiService,
    private toaster: Toaster
  ) {}

  ngOnInit(): void {
    this.city = this.tokenStorage.getSession('city');
    this.getSpecialities();
  }

  isLoggedIn: boolean = false;
  myInfo: any = '';
  city: any;
  doctor_count: any = 0;
  sList: any = [];
  visibleCards: number = 12;

  getSpecialities(): void {
    this.ApiService.getSpecialities(this.city).subscribe(
      (data) => {
        if (data.status) {
          this.sList = data.data;
        } else {
          this.toaster.open({
            text: data.message,
            caption: 'Error',
            duration: 4000,
            type: 'danger',
          });
        }
      },
      (err: any) => {}
    );
  }

  onLoadMore(): void {
    this.visibleCards += 12; // Increase the number of visible cards by 12
  }
}
