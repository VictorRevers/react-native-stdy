import { DatabaseConnection } from "./db_connection";

var db:any = null;

export default class DatabaseInit{
    
    constructor(){
        db = DatabaseConnection.getConnection();
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Foreign keys turned on'));

        this.InitDb();
    }

    private InitDb(){
        var sql = `create table if not exists person (id integer primary key autoincrement, name text);`;

        db.transaction((tr:any) => {tr.executeSql(sql)},
        (error: any) =>{
            console.log("error call back: "+ JSON.stringify(error));
        },
        () => {
            console.log("database was succesfully created!");
        }
        );
    }
}