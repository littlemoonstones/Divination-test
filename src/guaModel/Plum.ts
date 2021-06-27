import { Gua64 } from "./gua/Gua64"
import { Gua8 } from "./gua/Gua8";

export class Plum{
    public GetDivnationResult(num: number): [Gua64, Gua64, number]{ 
        const [a, b] = Plum.splitToNumber(num)

        let belowNumber: Gua8, aboveNumber: Gua8
        belowNumber = new Gua8(Plum.sumDigits(a)%8)      // 取得下卦
        aboveNumber = new Gua8(Plum.sumDigits(b)%8)      // 取得上卦

        let sum = Plum.sumDigits(a)%8 + Plum.sumDigits(b)%8 + Plum.timeToZhiIndex(Plum.getHours())
        let varianceNumber: number = Math.pow(2, sum%6); // 變爻的位置

        let PresentGua = new Gua64(aboveNumber, belowNumber);          // 本卦
        let FutureGua = PresentGua.VaryGua(varianceNumber);            // 變卦

        return [PresentGua, FutureGua, varianceNumber]
    }
    
    // 幾位數
    private static nDigits(num: number): number{
        return Math.ceil(Math.log(num+1)/Math.LN10)
    }
    
    // 將數字拆開，e.g. "1234" -> "12", "34"; "12345" -> "12", "345"
    private static splitToNumber(a: number): [number, number]{
        let a_n = Plum.nDigits(a)
        let l = Math.pow(10, Math.ceil(a_n/2))
        return [Math.floor(a/l), a%l]
    }

    public static sumDigits(num: number): number{
        let sum = 0
        while(num){
            sum += num%10
            num = Math.floor(num/10)
        }
        return sum
    }

    public static getHours(){
        let hour = new Date().getHours()
        let minute = new Date().getMinutes()
        return hour+minute/60
    }
    
    public static timeToZhiIndex(hour: number){
        if(hour >= 23 || hour < 1) return 1
        for(let i=1; i<12; i++){
            if(i*2-1 <= hour && hour < i*2+1) return i+1
        }
        throw Error("timeToZhiIndex error")
    }
}