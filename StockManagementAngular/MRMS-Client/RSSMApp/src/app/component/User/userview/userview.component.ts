import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { firstValueFrom, map, Subscription } from 'rxjs';
import { UserInfo } from 'src/app/models/Authentication/UserInfo';
import { UserRole, UserStatus } from 'src/app/models/Enum/UserStatus.enum';
import { User } from 'src/app/models/User/User';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { UserRoleService } from 'src/app/services/Shared/user-role.service';
import { UserService } from 'src/app/services/User/User.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  user_data_list: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource(this.user_data_list);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["userName", "loginName", "userStatus", "actions"]
  userRole!: UserInfo;

  currentDate: Date = new Date();
  user_from: FormGroup = new FormGroup({});
  user_data: User = new User;

  model = {
    userData: this.user_data
  }
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];
  role = UserRole;
  paswordBox = '';
  modalRef: any;
  private subscription: Subscription = new Subscription();

  constructor
    (
      private userDataSvc: UserService,
      private _notifitions: NotificationService,
      private _modal: NgbModal,
      private router: Router,
      private _userRole: UserRoleService,
      private authService: AuthenticationService

    ) { }

  ngOnInit() {
    this.getUserRole();
    this.updateColumnList();
    // debugger
    // this.userRole = this._userRole.getUserInfo();
    //console.log("Role", this.userRole)
    this.getItems();
  }

  getItems() {
    this.userDataSvc.userList()
      .subscribe(x => {
        this.user_data_list = x.data;
        this.dataSource.data = this.user_data_list;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load data.',
          timer: 2000,
          showConfirmButton: false,
        });
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  handleFormSubmit(formData: User): void {
    console.log('Form submitted in CompanyViewComponent with data:', formData.userName);
  }

  onCreate(template: TemplateRef<any>) {
    this.generateFormFields();
    this.modalRef = this._modal.open(template);
  }

  onReset(template: TemplateRef<any>) {
    this.generateFormFields();
    this.modalRef = this._modal.open(template);
  }

  generateFormFields() {
    this.fields = [
      {
        fieldGroupClassName: 'display-flex',
        key: 'user-data',
        fieldGroup: [

          {
            className: 'flex-1',
            type: 'input',
            key: 'password',
            props: {
              label: 'পাসওয়ার্ড',
              appearance: 'outline',
              floatLabel: 'always',
              required: true,
              minLength: 3
            },
            validation: {
              messages: { required: "Need to add password" }
            }
          },
        ],
      }
    ]
  }


  onRoleAsign(template: TemplateRef<any>) {
    this.generateRoleFormFields();
    this.modalRef = this._modal.open(template);
  }

  async generateRoleFormFields() {
    const roleList = await this.userDataSvc.roleList().toPromise();
    const data = roleList.map((r: { roleId: number; roleName: string }) => ({
      label: r.roleName,
      value: r.roleId,
    
    }));
    console.log("Role",this.options)
    debugger
    this.fields = [{
      key: 'roleId',
      type: 'select',
      props: {
        label: 'Role',
        valueProp: 'roleId',
        labelProp: 'roleName',
        options: data,
        
        appearance: 'outline',
        
      }
    }];
  }

  // async generateRoleFormFields() {
  //   try {
  //     const roleList = await this.userDataSvc.roleList().toPromise();
  //     console.log(roleList)
  
  //     this.fields = [
  //       {
  //         key: 'roleData',
  //         type: 'select', 
  //         props: {
  //           label: 'Role',
  //           options: roleList,
  //           appearance: 'outline',     
  //         },
  //       },
  //     ];
  //   } catch (error) {
  //     console.error('Error fetching role list:', error);
  //     // Handle error gracefully
  //   }
  // }
  
  

//  async generateRoleFormFields() {
//   var data = await this.userDataSvc.roleList().toPromise();
//   debugger
//     this.fields = [
//       {
//         fieldGroupClassName: 'display-flex',
//         key: 'roleData',
//         fieldGroup: [

//           {
//             className: 'flex-1',
//             type: 'select',
//             key: 'roleId',  
//             props: {
//               label: 'Role',
//               options: data,
//               valueProp: 'roleId',
//               labelProp: 'roleName',
//               appearance: 'outline'  
//             },
           
//           }
          
          
//         ],

//       }
//     ]
    
    
//   }

  showUserApprovalAlert(userId: number, data: any) {
    Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: `আপনি কি অনুমোদন করতে চান?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'বাতিল করুন',
      confirmButtonText: 'হ্যাঁ, অনুমোদন করুন!',
      focusCancel: true,
      focusConfirm: false,
      position: "top"
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(this.userDataSvc.approval(userId, data).subscribe(r => {
          Swal.fire({
            icon: 'success',
            title: 'Approved',
            text: `অনুমোদন করা হল`,
            timer: 2000,
            showConfirmButton: false,
            width: 400,
            position: "top",
          });
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/userview']);

        }));
      }
      if (result.isDismissed) {
        Swal.fire({
          icon: 'warning',
          title: 'Warn!',
          text: 'অনুমোদন টি বাদ দেয়া হল',
          timer: 2000,
          showConfirmButton: false,
          width: 400,
          position: "top",
        });
      }
    });
  }

  showConfirmationAlert(userId: number, data: any) {
    Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: " আপনি কি নিষ্ক্রিয় করতে চান? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'বাতিল করুন',
      confirmButtonText: 'হ্যাঁ, নিষ্ক্রিয় করুন!',
      focusCancel: true,
      focusConfirm: false,
      position: "top"
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(this.userDataSvc.delete(userId, data).subscribe(r => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: 'নিষ্ক্রিয় করা হল',
            timer: 2000,
            showConfirmButton: false,
            width: 400,
            position: "top",
          });
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/userview']);

        }));
      }
      if (result.isDismissed) {
        Swal.fire({
          icon: 'warning',
          title: 'Warn!',
          text: 'নিষ্ক্রিয় করার অনুমোদন টি বাদ দেয়া হল',
          timer: 2000,
          showConfirmButton: false,
          width: 400,
          position: "top",
        });
      }
    });
  }

  getUserStatusName(statusCode: number): string {
    switch (statusCode) {
      case UserStatus.Active:
        return 'Active';
      case UserStatus.Inactive:
        return 'Inactive';
      case UserStatus.Approved:
        return 'Approved';
      case UserStatus.Pending:
        return 'Pending';
      default:
        return 'Unknown';
    }
  }

  getUserRole() {
    this.authService.getCurrentUser().subscribe(
      res => {
      
        this.userRole = res;
      },
      error => {
        console.error('Error occurred while fetching user info:', error);
      }
    );

  }
  updateColumnList() {
    if (this.userRole?.roleId !== this.role.global_admin) { 
      this.columnList = ['userName', 'loginName', 'userStatus', 'actions'];
    } else {
      this.columnList = ['userName', 'loginName', 'userStatus'];
    }
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
