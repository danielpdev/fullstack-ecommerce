import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";

import { ErrorComponent } from "./../components/error/error.component";
import { ErrorService } from "./../components/error/error.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private modalService: NgbModal, private errorService: ErrorService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "An unknown error occurred!";
                if (error.error.message) {
                    errorMessage = error.error.message;
                }
                const modalRef = this.modalService.open(ErrorComponent);
                modalRef.componentInstance.errorMessage = errorMessage;

                return throwError(error);
            })
        );
    }
}
