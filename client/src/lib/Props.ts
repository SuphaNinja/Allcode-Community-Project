export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  emailConfirmed: boolean;
  emailConfirmationToken?: string | null;
  emailConfirmationExpiresAt?: Date | null;
  resetPasswordToken?: string | null;
  reserPasswordExpiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}