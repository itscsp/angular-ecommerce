import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',

  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isFetching = signal<boolean>(false);
  private destroyRef = inject(DestroyRef);

  constructor(private userService: UserService) {}

  onSubmit(formData: NgForm): void {
    if (formData.form.invalid) {
      return;
    }

    const enteredUsername = formData.form.value.username;
    const enteredPassword = formData.form.value.password;

    this.isFetching.set(true);

    const subscription = this.userService.getUserData().subscribe({
      next: (user) => {
        console.log('User data:', user);
        this.userService.userData.set(user); // Update the user data signal
      },
      error: (error) => {
        console.log('Error:', error);
        this.isFetching.set(false);
      },
      complete: () => {
        console.log('User data load completed');
        this.userService.isUserLogedIn.set(true); // Update login status to true
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
