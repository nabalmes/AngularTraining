import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { MeterService } from 'app/common/services/meter.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MetersComponent implements OnInit {

  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  public contentHeader: object;
  public rows = [];
  private unsubscribeAll: Subject<any> = new Subject();
  public page = {
    pageNumber: 0,
    size: 10,
    totalCount: undefined,
    search: null,
  };
  @BlockUI() blockUI: NgBlockUI;

  //dependency injection
  constructor(private meterService: MeterService) {}

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Meters",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Meters",
            isLink: false,
          },
        ],
      },
    };

    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.blockUI.start();
    console.log("pageInfo:", pageInfo);
    this.page.pageNumber = pageInfo.offset;
    this.meterService
      .getMeters(this.page.search, this.page.pageNumber + 1, this.page.size)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          const { data, page, totalCount } = response;
          this.rows = data;
          this.page.totalCount = totalCount;
          console.log("response", this.rows);
          this.blockUI.stop();
        },
        () => {
          //error
          this.blockUI.stop();
        }
      );
  }

  filterMeters(evt) {
    console.log(evt.target.value);
    this.page.search = evt.target.value;
    this.setPage({ offset: 0 });
  }

  onDeleteMeter(row) {
    console.log(row);
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then((result) => {
      this.blockUI.start()
      this.meterService.deleteMeter(row.id).pipe(takeUntil(this.unsubscribeAll)).subscribe(response => {
        this.setPage({offset: 0})
        this.blockUI.stop();

        Swal.fire({
          title: 'Great!',
          text: `Meter has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#7367F0',
          confirmButtonText: 'Ok',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        });
      }, () => {
        this.blockUI.stop();
      })
    });
  }
}
