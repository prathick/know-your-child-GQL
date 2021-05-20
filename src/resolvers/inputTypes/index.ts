import { IsEmail, IsPhoneNumber, Length, MinLength } from 'class-validator';
import { SchoolType } from '../../entity/School';
import { Field, InputType, registerEnumType } from "type-graphql";
import { userType } from '../../entity/User';

registerEnumType(SchoolType, {
  name: "SchoolType", // this one is mandatory
});

registerEnumType(userType, {
  name: "UserType", // this one is mandatory
});

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(4)
  password: string;

  @Field(() => userType)
  role: userType;
}

@InputType()
export class SchoolDetails {
  @Field()
  @MinLength(3)
  name: string;

  @Field(() => SchoolType)
  type: SchoolType;

  @Field()
  @IsPhoneNumber('CA')
  @Length(1, 12)
  phone: string;

  @Field()
  address: string;
}

@InputType()
export class AddStudent {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@InputType()
export class ParentDetails {
  @Field()
  @MinLength(3)
  firstName: string;

  @Field()
  @MinLength(3)
  lastName: string;

  @Field()
  @IsPhoneNumber('CA')
  @Length(1, 12)
  phone: string;

  @Field()
  address: string;

}