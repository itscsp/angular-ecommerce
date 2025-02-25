import { Component, effect, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../shared/services/user.service";
import { CommonModule } from "@angular/common";
import { User } from "../../shared/services/user.model";

@Component({
    selector: 'app-billing',
    standalone: true,
    templateUrl: 'billing.component.html',
    imports: [CommonModule, ReactiveFormsModule]
})

export class BillingCompoent implements OnInit {
    addressForm: FormGroup;
    currentUser;
    
    constructor(
        private fb: FormBuilder,
        private authService: UserService
    ) {
        this.currentUser = this.authService.getCurrentUser();
        this.addressForm = this.fb.group({
            street: ['', Validators.required],
            number: ['', Validators.required],
            city: ['', Validators.required],
            zipcode: ['', Validators.required],
            email: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required]
        });

        effect(() => {
            const user = this.currentUser();
            if (user) {
              console.log('Updating form with user data:', user.address);
              this.updateFormWithUserAddress(user);
            }
          });
    }

    ngOnInit() {
        const user = this.currentUser();
        if (user) {
          console.log('Initial form update with user data:', user.address);
          this.updateFormWithUserAddress(user);
        }
      }

    private updateFormWithUserAddress(user: User) {
        this.addressForm.patchValue({
          street: user.address.street,
          number: user.address.number,
          city: user.address.city,
          zipcode: user.address.zipcode,
          email: user.email,
          firstname: user.name.firstname,
          lastname: user.name.lastname,
        });
      }

}