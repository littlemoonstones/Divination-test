import { Gua64 } from "@/guaModel/gua/Gua64";
export interface Gua64Type {
  Name: string;
  GuaNumber: number;
  GuaOrder: string;
  AboveGua: Gua8Type
  BelowGua: Gua8Type
}

export interface Gua8Type {
  Name: string;
  GuaNumber: number;
  GuaOrder: string;
}

export interface GuaResultSaveType{
  id: string,
  date: string,
  presentGua: string;
  futureGua: string;
  varianceNumber: number;
  discription: string;
  isSaved: boolean;
}