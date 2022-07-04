import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  async sendEmail() {
    try {
    } catch (e) {
      throw new Error('Email can not send');
    }
  }

  async sendNotificationCalendar() {
    try {
    } catch (e) {
      throw new Error('Notification can not send');
    }
  }
}
