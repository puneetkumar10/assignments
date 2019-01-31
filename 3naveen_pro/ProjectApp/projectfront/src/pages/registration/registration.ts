import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../provider/user.service';
import { AlertService } from '../../provider/alert.service';
import { LoaderService } from '../../provider/loader.service';
import { MessageEnums } from '../../constants/constant-enum';
import { LoginPage } from '../login/login';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  errorMessage: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private alertService: AlertService,
    private loaderService: LoaderService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  registerUser(data: any, form: NgForm) {
    this.errorMessage='';
    if (!this.validateField(form)) {
      this.alertService.showAlert('Error in form', this.errorMessage, ['OK']);
      form.reset();
    } else {
      let loader = this.loaderService.startLoader(MessageEnums.REGISTER_LOADER_MESSAGE);
      this.userService.registerUser(data).subscribe(
        (res) => {
          loader.dismiss();
          this.alertService.showAlert('Success', MessageEnums.REGISTRATION_SUCCESS_MESSAGE, ['OK']);
          this.navCtrl.push(LoginPage);
        },
        (err) => {
          loader.dismiss();
          this.alertService.showAlert('Error', MessageEnums.REGISTRATION_ERROR_MESSAGE + ' ' + err.error.message, ['OK']);
        }
      )
    }
  }

  validateField(form: NgForm) {
    Object.keys(form.controls).forEach(element => {
      console.log(element)
      if (form.control.get(element).invalid) {
        this.errorMessage += this.getErrorMessage(element) + '<br>';
      }
    })
    return this.errorMessage == '' ? true : false;
  }

  getErrorMessage(controlName: string) {
    let errorMessage = controlName.toUpperCase() + ' is required';
    return errorMessage;
  }
}
