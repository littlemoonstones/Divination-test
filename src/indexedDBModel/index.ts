// class IndexedDb{
//     private IndxDB: IDBFactory;
//     public db: IDBDatabase;
//     constructor(public dbName: string, public tInfos: Array<TableInfo>){
//         this.IndxDB = window.indexedDB;
        
//     }
//     OpenInitDB(){
//         const req:IDBOpenDBRequest = this.IndxDB.open(this.dbName)
//         req.onupgradeneeded = this.AddTables
//         req.onsuccess = function
//     }

//     AddTables(e: any){

//     }
// }