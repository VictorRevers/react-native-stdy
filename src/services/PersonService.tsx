import { Person } from "../modules/Person";
import { DatabaseConnection } from "../database/db_connection";
import { SQLError } from "expo-sqlite";
import * as fs from 'expo-file-system';

const table = 'person';
const db = DatabaseConnection.getConnection();
var people:Array<Person> = [];
var id = 0;
var path:string = "";


export default class PersonService{
    
    static addData(person: Person){
        return new Promise((resolve, reject)=> db.transaction(          
            tx=>{
                try{
                    tx.executeSql(`insert into ${table} (name) values (?)`, [person.name],(_,{rows,insertId})=>{
                        console.log("ID: "+insertId);
                    }),(sqlError: SQLError)=>{
                        console.log("Insert error: "+sqlError);
                    };
                    console.log("PESSOA INSERIDA!");                   
                }catch(error){
                    console.log("Insert Error: "+error);             
                }     
            }
        ));

        /*id++;
        person.id = id;
        people.push(person);*/
    }

    static findAll(){
        /*try{
            var pr =  db.transaction(tx=>{
                tx.executeSql(`select * from ${table}`, [],(_,{rows})=>{
                        
                });
            });
            console.log("PR: "+pr);
        }catch(error){
            console.log("Search All Error: "+error);
        }*/

        new Promise((resolve, reject) => db.transaction(
            tx =>{
                try{
                    tx.executeSql(`select * from ${table}`, [],(_,{rows})=>{
                       console.log("Find all size:"+rows.length);
                       resolve(rows._array);
                       /*for(var i=0; i < rows.length; i++){
                        people.push(rows._array[i]);
                       }*/
                       people = rows._array;
                       console.log("PEOPLE: "+ people);
                       //people = rows._array;
                       console.log(rows._array);
                    });
                }catch(error){
                    console.log("Search All Error: "+error);
                }
                
        }))
        
        return people; 
    }

    static createDir(name:String){
        path = `${fs.documentDirectory}${name}`
        new Promise((resolve , reject)=> fs.makeDirectoryAsync(path).then((inf)=>{
            console.log("Diretório criado com sucesso: "+inf);
        }).catch((err)=>{
            

            console.log("Erro ao criar diretórito de imagem! "+err);
        }));     
    }

    static getDir(name:string){
        path = `${fs.documentDirectory}${name}`;

        new Promise((resolve , reject)=> fs.readDirectoryAsync(path).then((inf)=>{
            resolve(inf);
            console.log("Informação do diretório: "+inf);
        }).catch((err)=>{
            

            console.log("Erro ao buscar diretórito de imagem! "+err);
        })); 
    }

    static uploadPic(from:string, to:string){
       new Promise(()=>fs.copyAsync({
        from: from,
        to: to
    }).then(()=>{
        console.log("Upload concluido!");
    }).catch((err)=>{
        console.log("Erro ao inserir imagem! "+err);     
    })); 
        
    }
}