export class Person{
    public id: number = 0;
    public name: string = "";

    constructor(id?: number, name?: string){
        if(typeof(id) !== 'undefined'){
            this.id = id;
        }        
        if(typeof(name) !== 'undefined'){
            this.name = name;
        } 
    }

}