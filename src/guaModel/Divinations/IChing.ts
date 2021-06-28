import { getRandom } from "../random";
import { Divination } from "./Divination"
import { Gua64 } from "../gua/Gua64"
import { Gua8 } from "../gua/Gua8";
import { GuaResultType } from "../types";

export class IChing extends Divination{
    private _num: Array<number> = []

    constructor(num: Array<number>){
        super()      
        this.num = num       
    }
    
    get num(): number[]{
        return this._num
    }

    set num(value: number[]){
        if(value.length != 6) throw Error("array should have 6 numbers.")
        // 將陣列轉成六十四卦和變爻位置
        let { PresentGua, FutureGua, varianceNumber } = this.ToGua64(value)
        this.setterGua(PresentGua, FutureGua, varianceNumber)
    }
    // 隨機一個八卦，和變爻位置
    // private GetRandomGua8(): [number, number]{
    //     let varianceNumber = 0;
    //     let guaNumber = 0;
    //     for(let i=0; i<3; i++){
    //         let rand = IChing.GetRandomNumber();
                            
    //         guaNumber |= (rand & 1) << i;                
                                            
    //         varianceNumber |= (((rand & 1)^(rand >> 3)) ==0 ? 1: 0) << i;                
    //     }
    //     return [guaNumber, varianceNumber]
    // }

    public static GetRandomNumber(): number{
        let rand = getRandom(1, 16);
        if (rand == 1) return 6;                    // 老陰
        else if (2 <= rand && rand <= 6) return 7;  // 少陽
        else if (7 <= rand && rand <= 13) return 8; // 少陰
        else return 9;                              // 老陽
    }
    
    // 將陣列轉成六十四卦和變爻位置
    private ToGua64(num: Array<number>): GuaResultType{
        let _varianceNumber = 0;
        let guaNumber = 0;
        for(let i=0; i<num.length; i++){
            let item = num[i]
            if(6 > item || item > 9) throw Error("integer is out of range.")
            guaNumber |= (item & 1) << i;                                                     
            _varianceNumber |= (((item & 1)^(item >> 3)) ==0 ? 1: 0) << i;
        }
        const [aboveNumber, belowNumber] = Gua64.SplitToTwoGua(guaNumber)        
        return this.toThreeValues(aboveNumber, belowNumber, _varianceNumber)
    }
}