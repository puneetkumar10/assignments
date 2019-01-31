import { LoadingController } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class LoaderService {

    constructor(private loaderCtrl: LoadingController) { }

    startLoader(message: string) {
        let loader = this.loaderCtrl.create({
            content: message
        })
        loader.present()
        return loader;
    }

}