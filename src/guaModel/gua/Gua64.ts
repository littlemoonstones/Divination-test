import { Gua8 } from "./Gua8"
export class Gua64{
    //將卦名依二進位順序存入陣列
    private static readonly guaName:string[]  = [
        "坤為地","地雷復","地水師","地澤臨","地山謙","地火明夷","地風升","地天泰",
        "雷地豫","震為雷","雷水解","雷澤歸妹","雷山小過","雷火豐","雷風恆","雷天大壯",
        "水地比","水雷屯","坎為水","水澤節","水山蹇","水火既濟","水風井","水天需",
        "澤地萃","澤雷隨","澤水困","兌為澤","澤山咸","澤火革","澤風大過","澤天夬",
        "山地剝","山雷頤","山水蒙","山澤損","艮為山","山火賁","山風蠱","山地大畜",
        "火地晉","火雷噬嗑","火水未濟","火澤睽","火山旅","離為火","火風鼎","火天大有",
        "風地觀","風雷益","風水渙","風澤中孚","風山漸","風火家人","巽為風","風天小畜",
        "天地否","天雷無妄","天水訟","天澤履","天山遯","天火同人","天風姤","乾為天"
    ]

    //將卦號依卦名順序存入陣列
    private static readonly guaOrder:string[] = [
        "2", "24", "7", "19", "15", "36", "46", "11",
        "16", "51", "40", "54", "62", "55", "32", "34",
        "8", "3", "29", "60", "39", "63", "48", "5",
        "45", "17", "47", "58", "31", "49", "28", "43",
        "23", "27", "4", "41", "52", "22", "18", "26",
        "35", "21", "64","38", "56", "30", "50", "14",
        "20", "42", "59", "61", "53", "37", "57", "9",
        "12", "25", "6","10", "33", "13", "44", "1",
    ]

    public Name: string = ""
    public GuaNumber: number = 0
    public GuaOrder: string = ""
    public AboveGua: Gua8|null = null
    public BelowGua: Gua8|null = null

    constructor(...args: any[]){
        if(args.length == 1){
            // 用"卦序"生成64卦
            let _guaOrder: number = args[0]
            for(let i = 0; i < Gua64.guaOrder.length; i++){
                if(Gua64.guaOrder[i] === _guaOrder.toString()){
                    this.GuaNumber = i;
                    this.SettingNameAndOrder(this.GuaNumber);
                    // Console.WriteLine($"GuaNumber: {GuaNumber}");
                    [this.AboveGua, this.BelowGua] = Gua64.SplitToTwoGua(this.GuaNumber);
                    break;
                }
            }
        }else if(args.length == 2){
            let a, b
            [a, b] = args
            if(typeof(a) === "number" && typeof(b) === "number"){
                let aboveGuaNumber: number, belowGuaNumber: number
                [aboveGuaNumber, belowGuaNumber] = args
                this.AboveGua = new Gua8(aboveGuaNumber);
                this.BelowGua = new Gua8(belowGuaNumber);
                this.GuaNumber = this.CombineTwoGuaToInt(this.AboveGua, this.BelowGua);
                this.SettingNameAndOrder(this.GuaNumber);
            }else if(typeof(a) === "object" && typeof(b) === "object"){
                let aboveGua: Gua8, belowGua: Gua8
                [aboveGua, belowGua] = args
                this.AboveGua = aboveGua;
                this.BelowGua = belowGua;
                this.GuaNumber = this.CombineTwoGuaToInt(aboveGua, belowGua);
                this.SettingNameAndOrder(this.GuaNumber);
            }else if(typeof(a) === "number" && typeof(b) === "boolean"){
                // 用"卦合"生成64卦
                let guaNumber: number, b: boolean
                [guaNumber, b] = args
                this.GuaNumber = guaNumber;
                [this.AboveGua, this.BelowGua] = Gua64.SplitToTwoGua(this.GuaNumber);
                this.SettingNameAndOrder(guaNumber);
            }
        }
    }
    private SettingNameAndOrder(guaNumber: number): void{
            this.Name = Gua64.guaName[guaNumber];
            this.GuaOrder = Gua64.guaOrder[guaNumber];
    }

    // 將上下兩卦合成一個64卦
    private CombineTwoGuaToInt(a: Gua8, b: Gua8): number {
        return (a.GuaNumber << 3) | b.GuaNumber;
        /*
         * 上卦: 離卦(☲)，二進位: 101
         * 下卦: 艮卦(☶)，二進位: 100
         * 
         * Step 1. 101 << 3 = 101000
         * Step 2. 101000 | 100 = 101100
         * Step 3. 101100 => 56.火山旅(䷷)，卦合為44
         */
    }
    
    // 將一個64卦分成上下兩個卦
    public static SplitToTwoGua(guaNumber: number): [Gua8, Gua8]{
        let aboveNumber: number = guaNumber >> 3;
        let belowNumber: number = guaNumber & 7;
        return [new Gua8(aboveNumber, true), new Gua8(belowNumber, true)]
        /* Example
         * 
         * 56.火山旅(䷷)
         * 二進位: 101100
         * 卦合為44
         * 上卦: 101100 >> 3 = 101 => 離卦(☲)
         * 下卦: 101100 & 000111 = 100 => 艮卦(☶)
         */
    }

    // 透過variance將本卦生成變卦
    public VaryGua(variance: number): Gua64{
        let futureGuaNumber: number = this.GuaNumber ^ variance;
        return new Gua64(futureGuaNumber, true);
        /* Example
         * 
        * 56.火山旅(䷷)
        * 二進位: 101100
        * 卦合為44
        * 
        * Step 1. If Variance=16, its binary is 010000，變爻位在第五爻
        * Step 2. 101100 ^ 010000 = 111100
        * Step 3. 111100 => 33.天山遯(䷠)，卦合為60
        */
    }
}