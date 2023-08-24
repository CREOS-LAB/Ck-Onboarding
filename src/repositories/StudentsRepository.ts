import Student from "../models/students.model";

export class StudentRepository{
    private readonly student = Student;

    async save(data: any){
        let result = await new this.student(data).save()
    }

    async findById(id: string){
        let result = await this.student.findById(id)
    }

    async findByEmail(email: string){
        let result = await this.student.findOne({email})
    }
}