import { Module } from '@nestjs/common';
import { PrismaModule } from './lib/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { BookModule } from './api/book/book.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    BookModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
