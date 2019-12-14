export class Cat {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    selfIntroduce() {
        return `Hello, I am ${this.name}.`;
    }
}
