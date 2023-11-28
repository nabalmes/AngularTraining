import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CoreConfigService } from "@core/services/config.service";
import { IdentityService } from "app/common/services/identity.service";
import { AuthService } from "app/common/services/auth.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public coreConfig: any;
  public loginForm: FormGroup;
  public submitted = false;
  public passwordTextType: boolean;

  // Private
  private unsubscribeAll: Subject<any>;

  @BlockUI() blockUI: NgBlockUI;

  /**
   * Constructor
   *
   * @param {CoreConfigService} coreConfigService
   * @param {FormBuilder} formBuilder
   */
  constructor(
    private coreConfigService: CoreConfigService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private IdentityService: IdentityService,
    private authService: AuthService
  ) {
    this.unsubscribeAll = new Subject();

    // Configure the layout
    this.coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
      },
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit(): void {
    this.submitted = true;

    this.blockUI.start();
    this.IdentityService
      .login(this.loginForm.getRawValue())
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        this.blockUI.stop();
        console.log(response);
        const helper = new JwtHelperService();
        const tokenDetails = helper.decodeToken(response.data.jwToken);
        console.log("token Details", tokenDetails);
        const fullName = tokenDetails.full_name;
        const firstName = tokenDetails.first_ame;
        const lastName = tokenDetails.last_name;
        this.authService.user = {...response.data, fullName, firstName, lastName}
        sessionStorage.setItem("currentUser", JSON.stringify(this.authService.currentUserValue));
        sessionStorage.setItem("token", this.authService.currentUserValue.jwToken);
        this.router.navigate(['/customers'])

      }, (httpError: HttpErrorResponse) => {
        this.blockUI.stop();
        this.toastr.error('', httpError.error.Message, {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
          toastClass: 'toast ngx-toastr',
        });
      });
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });

    // Subscribe to config changes
    this.coreConfigService.config
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.loginForm.reset();
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
