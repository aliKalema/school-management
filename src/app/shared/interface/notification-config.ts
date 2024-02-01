import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
export declare type NotificationType = 'warn' | 'success' | 'danger' ;
export interface NotificationInput{
  action?: string,
  duration?: number,
  horizontalPosition?: MatSnackBarHorizontalPosition,
  verticalPosition?: MatSnackBarVerticalPosition,
  notificationType?: NotificationType
};
export interface NotificationConfig {
  message: string,
  notificationType?: NotificationType,
  action?: string,
  duration?: number,
  horizontalPosition?: MatSnackBarHorizontalPosition,
  verticalPosition?: MatSnackBarVerticalPosition
}
