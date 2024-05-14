export interface UpdateInfoRequest {
  name: string;
}

export interface CompleteInfoRequest {
  name: string;
  age: number;
  married?: string;
  birthDate: Date;
}
