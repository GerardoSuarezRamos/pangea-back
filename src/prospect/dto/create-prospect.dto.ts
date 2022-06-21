import { StatusUser, TypeDocuments } from '../entities/prospect.entity';

export class CreateUserDto {
  first_name: string;
  last_name: string;
  document_id: number;
  status: StatusUser;
  type_document: TypeDocuments;
  email: string;
  phone: string;
}
