export interface UserType {
  id: string;
  token: string;
  name: string;
  email: string;
  avatar?: string;
  avatarFile?: File|null;
  created: string;
  themeMode: string;
  oldPassword?: string;
  password?: string;
  passwordConfirm?: string;
}
