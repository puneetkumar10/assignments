import { AlertController } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class AlertService {

    constructor(private alertCtrl: AlertController) { }

    showAlert(title: string, message: string, buttons: string[]) {
        this.alertCtrl.create({
            title: title,
            message: message,
            buttons: buttons
        }).present()
    }
}