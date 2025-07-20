import { Prop, Schema } from '@nestjs/mongoose';

export type UserDocument = User & Document;

export enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager',
}
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true, lowercase: true })
  fullName: string;

  @Prop({
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'Invalid email format',
    },
  })
  email: string;

  @Prop({ required: true, trim: true, minlength: 6 })
  password: string;

  @Prop({ default: ROLE.USER, enum: ROLE })
  role: string;

  @Prop({ trim: true })
  profilePic?: string;

  @Prop({ default: true, index: true })
  isActive?: boolean;

  @Prop({ select: false }) // Avoid exposing tokens by default
  refreshToken?: string;
}
