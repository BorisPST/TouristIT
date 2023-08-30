import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { DatabaseModule } from './database/database.module';
import { RenterModule } from './renter/renter.module';
import { ExpenseModule } from './expense/expense.module';
import { CostCenterModule } from './cost-center/cost-center.module';
import { ProvisionModule } from './provision/provision.module';
import { AssistanceModule } from './assistance/assistance.module';
import { UtilityModule } from './utility/utility.module';
import { MessageTemplateModule } from './message-template/message-template.module';
import { ReservationModule } from './reservation/reservation.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AppSettingsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['./.env'],
    }),
    RenterModule,
    ExpenseModule,
    CostCenterModule,
    ProvisionModule,
    AssistanceModule,
    UtilityModule,
    MessageTemplateModule,
    ReservationModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
