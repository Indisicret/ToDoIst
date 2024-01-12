import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MESSAGESEXIT } from './config/constants';
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
    this.config.setTranslation({
      firstDayOfWeek: 1,
      dayNames: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
      ],
      monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      monthNamesShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
      ],
      dayNamesShort: ['Воск', 'Пон', 'Вт', 'Ср', 'Четв', 'Пят', 'Суб'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      weekHeader: 'Неделя',
      today: 'Сегодня',
      dateFormat: 'mm.dd.y',

      clear: 'Очистить',
    });
  }

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
