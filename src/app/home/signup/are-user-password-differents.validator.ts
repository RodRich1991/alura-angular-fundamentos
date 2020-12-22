import { FormGroup, ValidatorFn } from "@angular/forms";

export const areUserPasswordDifferents: ValidatorFn = (form: FormGroup) => {
    const user = form.get('userName').value;
    const pass = form.get('password').value;

    if (user.trim() + pass.trim()) {
        return user != pass
            ? null
            : { areUserPasswordDifferents: true }
        ;
    }
    return null;
}