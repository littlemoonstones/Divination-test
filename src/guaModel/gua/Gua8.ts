export class Gua8{
    private static readonly gua: string[] = ["坤", "震", "坎", "兌", "艮", "離", "巽", "乾"]
    private static readonly guaOrder = ["8", "4", "6", "2", "7", "3", "5", "1"]
    public Name: string = ""
    public GuaNumber: number = 0
    public GuaOrder: string = ""

    constructor(...args: any[]){
        if(args.length == 1){
            if(typeof(args[0]) === "number"){
                let n:number = args[0]
                if(n === 0){
                    this.Name = Gua8.gua[0]
                    this.GuaNumber = 0
                    this.GuaOrder = Gua8.guaOrder[0]
                }else if(1 <= n && n <= 7){
                    for(let i=0; i < Gua8.guaOrder.length; i++){
                        if(n.toString() == Gua8.guaOrder[i]){
                            this.Name = Gua8.gua[i]
                            this.GuaNumber = i
                            this.GuaOrder = Gua8.guaOrder[i]
                            break
                        }
                    }
                }else{
                    throw new Error("Out of range(0~7)")
                }
            }
            else if(typeof(args[0]) === "string"){
                let name:string = args[0]
                let i = 0
                for(; i < Gua8.gua.length; i++){
                    
                    if (name == Gua8.gua[i]){
                        this.Name = name
                        this.GuaNumber = i
                        this.GuaOrder = Gua8.guaOrder[i]
                        break;
                    }
                }
                if (i == Gua8.gua.length)
                {
                    throw new Error("Cannot find it in Gua8")
                }
            }
        }
        else if(args.length == 2){
            let guaNumber: number = args[0]
            // let a: boolean = args[1]
            this.GuaNumber = guaNumber
            this.GuaOrder = Gua8.guaOrder[guaNumber]
            this.Name = Gua8.gua[guaNumber]
        }
    }
}