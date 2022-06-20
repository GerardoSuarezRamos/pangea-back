import { StatusUser, TypeDocuments, UserRoles } from '../entities/users.entity';

export class CreateUserDto {
  first_name: string;
  last_name: string;
  document_id: number;
  status: StatusUser;
  type_document: TypeDocuments;
  role: UserRoles;
  email: string;
  password?: string;
  phone?: string;
}
