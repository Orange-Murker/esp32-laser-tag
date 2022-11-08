import { PartialType } from '@nestjs/mapped-types';
import { CreateGunDto } from './create-gun.dto';

export class UpdateGunDto extends PartialType(CreateGunDto) {
  displayName: string;
  secret: string;
}
