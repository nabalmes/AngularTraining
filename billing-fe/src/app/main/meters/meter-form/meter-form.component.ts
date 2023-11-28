import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meter } from 'app/common/models/meter';
import { FlatpickrOptions } from 'ng2-flatpickr';

@Component({
  selector: 'app-meter-form',
  templateUrl: './meter-form.component.html',
  styleUrls: ['./meter-form.component.scss']
})
export class MeterFormComponent implements OnInit {

  public contentHeader: object;
  public meter: Meter = {} as Meter;
  public customDateOptions: FlatpickrOptions = {
    altFormat: 'Y-m-d',
    altInput: true,
    enableTime: false,
    defaultDate: new Date()
  }

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const title = this.activatedRoute.snapshot.data.title;
    const breadcrumb = this.activatedRoute.snapshot.data.breadcrumb;

    this.contentHeader = {
      headerTitle: title,
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Meters',
            isLink: true,
            link: '/meters'
          },
          {
            name: breadcrumb,
            isLink: false
          }
        ]
      }
    }
  }
  onSubmit(meterForm): void {
    console.log(this.meter);
    console.log(meterForm);
  }
}
