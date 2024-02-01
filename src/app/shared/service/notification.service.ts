import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import {NotificationConfig, NotificationInput, NotificationType} from "../interface/notification-config";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private duration: number =  5;
  private action: string = 'OK';
  private notificationType: NotificationType | undefined = undefined;
  constructor(private snackBar: MatSnackBar) { }

  public notify(notificationConfig: NotificationConfig): void{
    const config = this.validate(notificationConfig.action,
      notificationConfig.duration,
      notificationConfig.notificationType,
      notificationConfig.horizontalPosition,
      notificationConfig.verticalPosition);
    //TODO style according to type
    this.snackBar.open(notificationConfig.message,config.action,this.constructMatSnackBarConfig(config));
  }

  private validate(action?: string | undefined,
                   duration?: number | undefined,
                   notificationType?: NotificationType | undefined,
                   horizontalPosition?: MatSnackBarHorizontalPosition | undefined,
                   verticalPosition?: MatSnackBarVerticalPosition | undefined): NotificationInput{
    let hp: MatSnackBarHorizontalPosition = this.horizontalPosition;
    let vp: MatSnackBarVerticalPosition =  this.verticalPosition;
    let ac: string =  this.action;
    let dur: number = this.duration;
    let nt: NotificationType | undefined = this.notificationType;
    if(horizontalPosition !== undefined)
      hp=horizontalPosition;

    if(verticalPosition !== undefined)
      vp = verticalPosition;

    if(action !== undefined)
      ac = action;

    if(duration !== undefined)
      dur = duration;

    if(notificationType !== undefined)
      nt = notificationType;

    return  {
      action: ac,
      duration: dur,
      notificationType: nt,
      horizontalPosition: hp,
      verticalPosition: vp
    };
  }

  private constructMatSnackBarConfig(notificationInput: NotificationInput): MatSnackBarConfig{
    let panelClass: string[] | undefined = undefined
    if(notificationInput.notificationType == 'warn')
      panelClass = ['warn-snackbar']

    else if(notificationInput.notificationType == 'success')
      panelClass = ['success-snackbar']

    else if(notificationInput.notificationType == 'danger')
      panelClass = ['danger-snackbar']

    return {
      duration: (notificationInput.duration! * 1000),
      horizontalPosition: notificationInput.horizontalPosition,
      verticalPosition: notificationInput.verticalPosition,
      panelClass: panelClass,
    }
  }

}
