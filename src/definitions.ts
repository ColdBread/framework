export interface ClassMetadata {
  name: string;
  target: string;
  fields?:FieldMetadata[];
}

export interface FieldMetadata {
  name: string;
  target: string;
  type: string;
}