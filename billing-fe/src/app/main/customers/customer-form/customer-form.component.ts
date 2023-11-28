import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { contactNumberValidator } from 'app/common/directives/contact-number.directive';
import { Barangay } from 'app/common/models/barangay';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  public contentHeader: object;
  public customerForm: FormGroup;
  public submitted: boolean = false;
  public barangays: Barangay[] = [];

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
  get f() {
    return this.customerForm.controls  }

  ngOnInit(): void {
    const title = this.activatedRoute.snapshot.data.title;
    const breadcrumb = this.activatedRoute.snapshot.data.breadcrumb;
    this.barangays = this.activatedRoute.snapshot.data.Barangays;

    console.log(this.barangays);

    this.contentHeader = {
      headerTitle: title,
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Customers',
            isLink: true,
            link: '/customers'
          },
          {
            name: breadcrumb,
            isLink: false
          }
        ]
      }
    }
    //template driven
    //ngModel
    this.customerForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      middleName: [null, []],
      lastName: [null, [Validators.required]],
      street: [null, [Validators.required]],
      barangayId: [null, [Validators.required]],
      municipality: [null, [Validators.required]],
      province: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      contactNumber: [null, [Validators.required, contactNumberValidator()]],
    })
  }
  onSubmit(): void {
    this.submitted = true;
    console.log(this.customerForm.getRawValue());
  }
}
