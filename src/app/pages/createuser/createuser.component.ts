import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserApiService } from 'api/user.api';
import { IUserCreateByAdminParams } from 'interfaces/userapi-query';
import { FormService } from 'services/form.service';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-createuser',
    templateUrl: './createuser.component.html',
    styleUrls: ['./createuser.component.less'],
})
export class CreateUserComponent implements OnInit {
    settingsItems: IUserCreateByAdminParams[];
    selectedIndex: number;
    readonly addUserForm = this.formService.createFormManager<IUserCreateByAdminParams>(
        {
            login: {
                validators: [Validators.required, Validators.maxLength(64)],
                errors: ['login_format_invalid', 'duplicate_login'],
            },
            password: {
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(64),
                ],
                errors: ['invalid_password', 'user_not_active', 'unknown'],
            },
            email: {
                validators: [Validators.email],
                errors: [
                    'email_format_invalid',
                    'duplicate_email',
                    'smtp_client_create_error',
                    'email_send_error',
                    'unknown',
                ],
            },
            name: {
                validators: [Validators.maxLength(64)],
            },
            isActive: {},
            isReadOnly: {},
        },
        {
            onSubmit: () => this.addUser(),
        },
    );
    /*
    form = this.formBuilder.group({
        login: [],
        password: [],
        email: [],
        name: [],
        isActive: [],
        isReadOnly: [],
    } as Record<keyof IUserCreateByAdminParams, any>);
   */
    isSubmitting = false;

    constructor(
        private formBuilder: FormBuilder,
        private userApiService: UserApiService,
        private formService: FormService,
    ) {
        this.addUserForm.formData.controls['password'].setValue(this.generatePassword());
    }

    private generatePassword(): string {
        var buf = new Uint8Array(8);
        window.crypto.getRandomValues(buf);
        return btoa(String.fromCharCode.apply(null, buf));
    }
    genPWD() {
        this.addUserForm.formData.controls['password'].setValue(this.generatePassword());
    }

    ngOnInit() {}
    addUser(): void {
        this.isSubmitting = true;

        const params = this.addUserForm.formData.value as any;

        this.userApiService.createUser(params as any).subscribe(
            () => {
                this.isSubmitting = false;
            },
            err => {
                this.addUserForm.onError(err);
                this.isSubmitting = false;
            },
        );
    }
}
