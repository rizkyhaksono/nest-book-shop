import { ApiProperty } from '@nestjs/swagger';

export class LoginEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  status: number;
}
