import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, Validate } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { validatePhoneNumber } from 'utilities/validators';

@Entity('users')
@Unique('user_constraint', ['username', 'email'])
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @ApiProperty()
  @Column({ length: 255, type: 'varchar', nullable: false })
  @Length(3, 255, {
    message: 'First name must be between 3 and 255 characters long',
  })
  firstName: string;

  @ApiProperty()
  @Column()
  @Column({ length: 255, type: 'varchar', nullable: false })
  @Length(3, 255, {
    message: 'Last name must be between 3 and 255 characters long',
  })
  lastName: string;

  @ApiProperty()
  @Column({ unique: true, type: 'varchar', nullable: false })
  @Length(3, 255, {
    message: 'Username must be between 3 and 255 characters long',
  })
  username: string;

  @ApiProperty()
  @Column({ unique: true, type: 'varchar', nullable: false })
  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  email: string;

  @ApiProperty()
  @Column()
  @Validate(validatePhoneNumber, {
    message: 'The phone number is not valid',
  })
  phone: string;

  @ApiProperty()
  @Column({ default: true })
  isActive?: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt?: Date;
}
