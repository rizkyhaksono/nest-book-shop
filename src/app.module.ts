import { Module } from '@nestjs/common';
import { PrismaModule } from './lib/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { BookModule } from './api/book/book.module';
import { CategoryModule } from './api/category/category.module';
import { RentalModule } from './api/rental/rental.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    BookModule,
    CategoryModule,
    RentalModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
