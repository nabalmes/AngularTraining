import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    NgbModule,
    CoreCommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
