import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MESSAGESEXIT } from './config/constants';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService } from './services/user.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ConfirmDialogModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService],
})
export class AppComponent {
  constructor(
    private confimationService: ConfirmationService,
    private messageServis: MessageService,
    private router: Router,
    protected userService: UserService
  ) {}

  clickExitAccount() {
    this.confimationService.confirm({
      message: 'Вы уверены, что хотите выйти ?',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.unlog();
        this.messageServis.add(MESSAGESEXIT);
        this.router.navigate(['/authorization']);
      },
    });
  }
}
