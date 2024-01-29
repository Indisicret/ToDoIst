import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { Observable, map } from 'rxjs';
import {
  ClickExitAccountLabel,
  MESSAGES_EXIT,
  TRANSLATION,
  AppLables,
} from './config/constants';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ConfirmDialogModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService],
})
export class AppComponent {
  visibleExit$: Observable<boolean> = this.userService.userId$.pipe(
    map((value) => Boolean(value))
  );
  appLables = AppLables;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private config: PrimeNGConfig,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.config.setTranslation(TRANSLATION);
  }

  clickExitAccount() {
    this.confirmationService.confirm({
      message: ClickExitAccountLabel.confirmExit,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.unlog();
        this.messageService.add(MESSAGES_EXIT);
        this.router.navigate(['/authorization']);
      },
    });
  }
}
