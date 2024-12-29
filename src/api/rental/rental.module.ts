import { Module } from "@nestjs/common";
import { RentalService } from "./rental.service";
import { PrismaModule } from "src/lib/prisma.module";
import { RentalController } from "./rental.controller";

@Module({
  controllers: [RentalController],
  providers: [RentalService],
  imports: [PrismaModule],
  exports: [RentalService],
})

export class RentalModule { }