import { Component } from '@angular/core';
import { NotificationService } from '../../services/Shared/notification.service';
import { DashboardServiceService } from 'src/app/services/dashboard/dashboard-service.service';
import { Dashboarddata } from 'src/app/models/dashboard/dashboarddata';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  dashboardModel: Dashboarddata=new Dashboarddata;
  constructor(
    private notificationSvc: NotificationService,
    private dashboardService: DashboardServiceService
  ) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardData()
     .subscribe(x => {
       this.dashboardModel = x;
       console.log(x);
     }, err => {
       this.notificationSvc.message("Failed to load data!!!", "DISMISS");
     });
  }
}
