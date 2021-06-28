import { Gua64 } from "../gua/Gua64"
import { Gua8 } from "../gua/Gua8"
import { GuaResultType } from "../types";
import { IDivination } from "./IDivination";

export abstract class Divination implements IDivination{
    private _presentGua: Gua64
    private _futureGua: Gua64
    varianceNumber: number

    constructor(){
        this._presentGua = new Gua64(0)
        this._futureGua = new Gua64(0)
        this.varianceNumber = 0
    }

    protected setterGua(PresentGua: Gua64, FutureGua: Gua64, varianceNumber: number): void{
        this._presentGua = PresentGua
        this._futureGua = FutureGua
        this.varianceNumber = varianceNumber
    }

    // 將上下卦、變爻位置轉成 => 本卦、變卦、變爻位置
    protected toThreeValues(aboveNumber: Gua8|number, belowNumber: Gua8|number, varianceNumber: number): GuaResultType{
        if(typeof(aboveNumber) != typeof(belowNumber)) throw Error("above and below numbers are not the same type")
        let PresentGua = new Gua64(aboveNumber, belowNumber);          // 本卦
        let FutureGua = PresentGua.VaryGua(varianceNumber);            // 變卦
        return {
            PresentGua,
            FutureGua,
            varianceNumber
        }
    }

    public GetDivnationResult(): GuaResultType{ 
        return {
            PresentGua: this._presentGua,
            FutureGua: this._futureGua,
            varianceNumber: this.varianceNumber
        }
    }
}