import { Module } from '@nestjs/common';
import { PrismaModule } from './lib/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { BookModule } from './api/book/book.module';
import { CategoryModule } from './api/category/category.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    BookModule,
    CategoryModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
