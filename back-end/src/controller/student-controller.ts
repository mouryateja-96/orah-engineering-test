import { getRepository, ObjectID } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { Student } from "../entity/student.entity"
import { CreateStudentInput, UpdateStudentInput } from "../interface/student.interface"

export class StudentController {
  private studentRepository = getRepository(Student)

  async allStudents(request: Request, response: Response, next: NextFunction) {
    const returnResponse = await this.studentRepository.find()
    return returnResponse
  }

  async createStudent(request: Request, response: Response, next: NextFunction) {
    const { body: params } = request

    const createStudentInput: CreateStudentInput = {
      first_name: params.first_name,
      last_name: params.last_name,
      photo_url: params.photo_url,
    }
    const student = new Student()
    student.prepareToCreate(createStudentInput)
    const returnResponse = await this.studentRepository.save(student)
    return returnResponse
  }

  async updateStudent(request: Request, response: Response, next: NextFunction) {
    const { body: params } = request
    const studentToUpdate = await this.studentRepository.findOne(params.id)

    const updateStudentInput: UpdateStudentInput = {
      id: params.id,
      first_name: params.first_name,
      last_name: params.last_name,
      photo_url: params.photo_url,
    }
    studentToUpdate.prepareToUpdate(updateStudentInput)
    const returnResponse = this.studentRepository.save(updateStudentInput)
    return returnResponse
  }

  async removeStudent(request: Request, response: Response, next: NextFunction) {
    let studentToRemove = await this.studentRepository.findOne(request.query.id)
    console.log("studentToRemove is : ", studentToRemove)
    const returnResponse = await this.studentRepository.remove(studentToRemove)
    return returnResponse
  }
}