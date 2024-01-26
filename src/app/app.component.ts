import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ClickExitAccountLabel, MESSAGESEXIT, SETTRANSLATION } from './config/constants';
import { DialogService } from 'primeng/dynamicdialog';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService } from './services/user.service';
import { ToastModule } from 'primeng/toast';
import { BehaviorSubject, Observable, map } from 'rxjs';

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

  constructor(
    private confimationService: ConfirmationService,
    private messageServis: MessageService,
    private config: PrimeNGConfig,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.config.setTranslation(SETTRANSLATION);
  }

  clickExitAccount() {
    this.confimationService.confirm({
      message: ClickExitAccountLabel.confirmExit,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.unlog();
        this.messageServis.add(MESSAGESEXIT);
        this.router.navigate(['/authorization']);
      },
    });
  }
}
