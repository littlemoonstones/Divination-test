import { Gua64 } from "./gua/Gua64"

export interface IDivination{
    /* 卜卦 */
    GetDivnationResult(): [Gua64, Gua64, number] // (本卦, 變卦, 變爻位置)        
}