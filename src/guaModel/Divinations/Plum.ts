import { Gua8 } from "../gua/Gua8";
import { Divination } from "./Divination"

export class Plum extends Divination{
    private _num: number = 0
    constructor(num: number){
        super()
        this.num = num
    }

    get num(): number{
        return this._num
    }

    set num(value: number){
        if(value < 0) throw Error("Your number should not be negative.")
        this._num = value
        const [a, b] = Plum.splitToNumber(value)
        
        let aboveNumber = new Gua8(Plum.sumDigits(a)%8)      // 取得上卦
        let belowNumber = new Gua8(Plum.sumDigits(b)%8)      // 取得下卦
        
        let sum = Plum.sumDigits(a)%8 + Plum.sumDigits(b)%8 + Plum.timeToZhiIndex(Plum.getHours())
        let _varianceNumber: number = 1 << (sum%6==0? 6: sum%6)-1; // 變爻的位置
        
        let { PresentGua, FutureGua, varianceNumber } = this.toThreeValues(aboveNumber, belowNumber, _varianceNumber)
        this.setterGua(PresentGua, FutureGua, varianceNumber)
    }
    
    // 幾位數
    public static nDigits(num: number): number{
        return Math.ceil(Math.log(num+1)/Math.LN10)
    }
    
    // 將數字拆開，e.g. "1234" -> "12", "34"; "12345" -> "12", "345"
    public static splitToNumber(a: number): [number, number]{
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
        if(hour >= 23 || hour < 1) return 12
        for(let i=1; i<12; i++){
            if(i*2-1 <= hour && hour < i*2+1) return i
        }
        throw Error("timeToZhiIndex error")
    }
}