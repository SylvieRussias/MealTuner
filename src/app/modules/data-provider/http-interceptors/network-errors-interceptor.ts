import { DialogService } from './../../ui-elements/services/dialog.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class NetworkErrorsInterceptor implements HttpInterceptor {
    private readonly RETRY_ATTEMPTS = 3;
    private readonly NETWORK_ERROR_MESSAGE = 'Network error. Please check your connection.';

    constructor(private dialogService: DialogService) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(httpRequest).pipe(
            retry(
                this.RETRY_ATTEMPTS
            ),
            catchError(
                (error: HttpErrorResponse) => {
                    this.showNetworkErrorMessage();
                    return this.formatError(error);
                }
            )
        )
    }

    private formatError(error): Observable<never> {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

    private showNetworkErrorMessage(): void {
        this.dialogService.openInfoDialog(this.NETWORK_ERROR_MESSAGE);
    }
}