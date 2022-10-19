import { PartialType } from '@nestjs/mapped-types';
import { CreateHitDto } from './create-hit.dto';

export class UpdateHitDto extends PartialType(CreateHitDto) {}
