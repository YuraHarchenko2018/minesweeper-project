

export class Human {

    public firstName: string;
    public sureName: string;
    public age: number;

    constructor(fName: string, sName: string, age: number) {
        this.firstName = fName;
        this.sureName = sName;
        this.age = age;
    }

    public getInfo() {
        return `Имя: ${this.firstName}, Фамилия: ${this.sureName}, Возраст: ${this.age}`
    }

}
