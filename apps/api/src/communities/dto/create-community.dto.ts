import { IsBoolean, IsOptional } from 'class-validator';

export class CreateCommunityDto {
  @IsOptional()
  @IsBoolean()
  Ziele?: boolean;

  @IsOptional()
  @IsBoolean()
  Erzeugung?: boolean;

  @IsOptional()
  @IsBoolean()
  Nahbereisabfrage?: boolean;

  @IsOptional()
  @IsBoolean()
  Registrierung?: boolean;

  @IsOptional()
  @IsBoolean()
  Statuten?: boolean;

  @IsOptional()
  @IsBoolean()
  Vereinsbehörde?: boolean;

  @IsOptional()
  @IsBoolean()
  Gründungsbescheid?: boolean;

  @IsOptional()
  @IsBoolean()
  Vereinbarung_1?: boolean;

  @IsOptional()
  @IsBoolean()
  Vereinbarung_2?: boolean;

  @IsOptional()
  @IsBoolean()
  Regelungen?: boolean;

  @IsOptional()
  @IsBoolean()
  ebutilities?: boolean;

  @IsOptional()
  @IsBoolean()
  Marktpartner_ID?: boolean;

  @IsOptional()
  @IsBoolean()
  Netzbetreiber?: boolean;

  @IsOptional()
  @IsBoolean()
  Vertragsvorbereitung?: boolean;

  @IsOptional()
  @IsBoolean()
  Vertragsfertigstellung?: boolean;

  @IsOptional()
  @IsBoolean()
  EDA?: boolean;

  @IsOptional()
  @IsBoolean()
  Angelegt?: boolean;

  @IsOptional()
  @IsBoolean()
  Freigeschaltet?: boolean;

  @IsOptional()
  @IsBoolean()
  Ausgestattet?: boolean;

  @IsOptional()
  @IsBoolean()
  Zugestimmt?: boolean;
}
