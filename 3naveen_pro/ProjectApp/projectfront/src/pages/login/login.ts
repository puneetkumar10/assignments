import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UserService } from '../../provider/user.service';
import { AlertService } from '../../provider/alert.service';
import { MessageEnums } from '../../constants/constant-enum';
import { LoaderService } from '../../provider/loader.service';
import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../home/home';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  errorMessage: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private alertService: AlertService,
    private loaderService: LoaderService,
    private menu: MenuController
  ) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // Method created for logging and checking whether user exists or not
  loginUser(data: any, form: NgForm) {
    this.errorMessage = '';
    if (!this.validateField(form)) {
      this.alertService.showAlert('Error in form', this.errorMessage, ['OK']);
      form.reset();
    } else {
      let loader = this.loaderService.startLoader(MessageEnums.LOGIN_LOADER_MESSAGE);
      this.userService.loginUser(data).subscribe(
        (res) => {
          loader.dismiss();
          this.alertService.showAlert('Success', MessageEnums.LOGIN_SUCCESS_MESSAGE, ['OK']);
          this.navCtrl.setRoot(HomePage);
        },
        (err) => {
          loader.dismiss();
          this.alertService.showAlert('Error', MessageEnums.LOGIN_ERROR_MESSAGE + ' ' + err.error.message, ['OK']);
        }
      )
    }
  }

  goToRegistrationPage() {
    this.navCtrl.push(RegistrationPage);
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
