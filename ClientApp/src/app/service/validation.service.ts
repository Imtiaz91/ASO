import { Injectable } from '@angular/core';
import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationService {

    static getValidatorErrorMessage(label: string, validatorName: string,optionalLabel:string, validatorValue?: any) {
        let config = {
            'required': ((label != '') ? label + ' is required' : 'Field is required'),
            'invalidEmailAddress': 'Enter valid email address',
            'invalidPassword': 'Enter valid password. Password must be at least 6 characters long, and contain a number.',
            'invalidConfirmPassword': 'Password does not match.',
            'invalidAlphabet': 'Enter only alphabet character in ' + label,
            'invalidNumber': 'Enter only numbers in ' + label,
            'pattern': label + ' is incorrect',
            'invalidDuplicate': label + ' already exists.',
            'invalidItem': 'invalid item',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'maxlength': `Maximun length ${validatorValue.requiredLength}`,
            'invalidDate': ((label != '') ? label + ' is invalid' : 'Date is invalid'),
            'invalidConversion':label,
            'invalidDiscount':label+' cannot be greater than Sub-Total',
            'invalidQty':optionalLabel,
            'invalidBarCode':label+ ' already exists.',
            'invalidMobileNumber': ((label != '') ?  'Enter valid ' + label + ' number' : 'Enter valid phone number'),
            'minValue': ((label != '') ? label + ' must be greater than 0' : 'Value must be greater than 0'),
            'weightInvalid': 'Qty must be greater than 0',
            'priceInvalid': 'Price must be greater than 0',
            'maxValue': ((label != '') ? label + ' must be Less than 99999999999' : 'Value must be Less than 99999999999'),
            'invalidDisount': 'Discount must be less than sub total',
            'transfer': 'Asset has been transferred',
            'exceedAmount':'Outstanding Amount',
            'unequalAdvance':'Advance Amount and Items Advance subTotal Must be equal'
        };
        return config[validatorName];
    }
    
    static validateDate(control) {
        if (control.hasError('required') || (ValidationService.isBlank(control.value) || (ValidationService.isString(control.value) && control.value.trim() == ""))) {
            return null;
        }
        if (/^\d{2}[./-]\d{2}[./-]\d{4}$/.test(control.value)) {
            return null;
        }
        return { 'invalidDate': true };
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.hasError('required') || (ValidationService.isBlank(control.value) || (ValidationService.isString(control.value) && control.value.trim() == ""))) {
            return null;
        }
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        }
        return { 'invalidEmailAddress': true };

    }

    static mobileValidator(control) {
        let mobFormat = /^(\+?\d{1,3}[- ]?)?\d{7,10}$/;
        if(mobFormat.test(control.value)){
            return null;
        }
        return { 'invalidMobileNumber': true };
    }

    static customRequired(control) {
        return (ValidationService.isBlank(control.value) || ((ValidationService.isString(control.value) && control.value.trim() == "") || control.value==0) ?
            { "required": true } :
            null);
    }

    static isBlank(value) {
        return (typeof value == 'undefined' || !value) ? true : false;
    }

    static isString(value) {
        return (typeof value == 'string') ? true : false;
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        }
        return { 'invalidPassword': true };

    }

    static hasWhiteSpace(control){
        if(/^\s*$/.test(control.value) == false){
            return null;
        }
        return { 'required': true };
    }

    static allowAlphabet(control) {
        // if (control.hasError('required') || (ValidationService.isBlank(control.value) || (ValidationService.isString(control.value) && control.value.trim() == ""))) {
        //     return null;
        // }
        if (/^[A-Za-z ]+$/.test(control.value)) {
            return null;
        }
        return { 'required': true };
    }

    static allowNumeric(control) {
        if (control.hasError('required') || (ValidationService.isBlank(control.value) || (ValidationService.isString(control.value) && control.value.trim() == ""))) {
            return null;
        }
        if (/^[0-9]+$/.test(control.value)) {
            return null;
        }
        return { 'invalidNumber': true };

    }

    static confirmPassValidator(control) {
        if (control.hasError('required')) {
            return null;
        }
        let form = control.root;
        if (!ValidationService.isBlank(form) && !ValidationService.isBlank(form.controls) && form.controls.hasOwnProperty('password')) {
            if (form.controls['password'].value == "" || form.controls['password'].value == control.value) {
                return null;
            }
        }
        return { 'invalidConfirmPassword': true };
    }

    static resetForm(form) {
        for (var name in form.controls) {
            form.controls[name].setErrors(null);
        }
    }

    static validateForm(form, notCheck: string[] = []) {
        for (var name in form.controls) {
            //if(!(notCheck && notCheck.indexOf(name) !== -1)){
            form.controls[name].updateValueAndValidity();
            form.controls[name].markAsTouched();            
            //}

            if (form.controls[name].controls != undefined && form.controls[name].controls.length > 0) {

                for (let i = 0; i < form.controls[name].controls.length; i++) {
                    const element = form.controls[name].controls[i];

                    if(element.controls != undefined){
                        for (var nameSubItem in element.controls) {
                            element.controls[nameSubItem].updateValueAndValidity();
                            element.controls[nameSubItem].markAsTouched();         
                        }
                    }
                }
            }
        }

        return form.valid;
    }

    static isPresent(obj: any): boolean {
        return obj !== undefined && obj !== null;
    }

    static weightValidate(control){
      if(control.value != 0){
          return null;
      }
      return { 'weightInvalid': true };
    }

    static priceValidate(control){
      if(control.value != 0){
          return null;
      }
      return { 'priceInvalid': true };
    }
      
    static max(max: number, cMsg?: string){
        return (control): {[key: string]: any} => {
            if (this.isPresent(Validators.required(control))){
                return null;
            } 
          
            let v: number = control.value;
          
            return v <= max ? null :  { 'maxValue': { 'requiredLength': max, 'actualLength': v } };
        };
    }

    static min(min: number, cMsg?: string){
        return (control): {[key: string]: any} => {
          if (this.isPresent(Validators.required(control))){
                return null;
          } 
          this.weightValidate(control);
          
          let v: number = control.value;
          let msg ;
          switch(cMsg){
              case 'zeroval':
                msg = { [cMsg]: true}
              break;
              default:
                msg = { 'minValue': { 'requiredLength': min, 'actualLength': v } };
          }
          
          return v >= min ? null :  msg;
        };
      }

}