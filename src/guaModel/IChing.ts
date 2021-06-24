import { getRandom } from "./random";
import { IDivination } from "./Divination"
import { Gua64 } from "./gua/Gua64"

export class IChing implements IDivination{
    public GetDivnationResult(): [Gua64, Gua64, number]{ 
        let belowNumber: number, varianceNumber2: number, aboveNumber: number, varianceNumber1: number
        [belowNumber, varianceNumber2] = this.GetRandomGua8();      // 取得下卦
        [aboveNumber, varianceNumber1] = this.GetRandomGua8();      // 取得上卦

        let varianceNumber: number = (varianceNumber1 << 3) | varianceNumber2; // 變爻的位置

        let PresentGua = new Gua64(aboveNumber, belowNumber);          // 本卦
        let FutureGua = PresentGua.VaryGua(varianceNumber);            // 變卦

        return [PresentGua, FutureGua, varianceNumber]
    }

    // 隨機一個八卦，和變爻位置
    private GetRandomGua8(): [number, number]{
        let varianceNumber = 0;
        let guaNumber = 0;
        for (let i=0; i<3; i++)
        {
            let rand = this.GetRandomNumber();
                            
            guaNumber |= (rand & 1) << i;                
                                            
            varianceNumber |= (((rand & 1)^(rand >> 3)) ==0 ? 1: 0) << i;                
        }
        return [guaNumber, varianceNumber]
    }

    private GetRandomNumber(): number{
        let rand = getRandom(1, 16);
        if (rand == 1) return 6; // 老陰
        else if (2 <= rand && rand <= 6) return 7; // 少陽
        else if (7 <= rand && rand <= 13) return 8; // 少陰           
        else return 9; // 老陽            
    }
}