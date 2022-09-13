import { NextFunction, Request, Response } from "express"
import { getRepository } from "typeorm"
import { Group } from "../entity/group.entity"
import { CreateGroupInput, UpdateGroupInput } from "../interface/group.interface";
export class GroupController {

  private groupRepository = getRepository(Group)

  async allGroups(request: Request, response: Response, next: NextFunction) {
    // Task 1: 

    // Return the list of all groups
    return this.groupRepository.find()

  }

  async createGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 

    // Add a Group
    try {
      console.log("createGroup started and request is : ", request);
      const { body: params } = request

      const createGroupInput: CreateGroupInput = {
        name: params.name,
        number_of_weeks: params.number_of_weeks,
        roll_states: params.roll_states,
        incidents: params.incidents,
        ltmt: params.ltmt,
        run_at: params.run_at,
        student_count: params.student_count
      }
      const group = new Group()
      group.prepareToCreate(createGroupInput)

      return this.groupRepository.save(group)

    } catch (error) {
      console.log(error);
    }

  }

  async updateGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 

    // Update a Group
    const { body: params } = request

    this.groupRepository.findOne({ where: { id: params.id } }).then((group) => {
      const updateGroupInput: UpdateGroupInput = {
        id: params.id,
        name: params.name,
        number_of_weeks: params.number_of_weeks,
        roll_states: params.roll_states,
        incidents: params.incidents,
        ltmt: params.ltmt,
        run_at: params.run_at,
        student_count: params.student_count,
      }
      group.prepareToUpdate(updateGroupInput)
      return this.groupRepository.save(group)
    })
  }

  async removeGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 

    // Delete a Group
    let groupToRemove = await this.groupRepository.findOne({where : {id : request.query.id}})
    console.log("groupToRemove is : ",groupToRemove);
    await this.groupRepository.remove(groupToRemove)
  }

  async getGroupStudents(request: Request, response: Response, next: NextFunction) {
    // Task 1: 

    // Return the list of Students that are in a Group
  }


  async runGroupFilters(request: Request, response: Response, next: NextFunction) {
    // Task 2:

    // 1. Clear out the groups (delete all the students from the groups)

    // 2. For each group, query the student rolls to see which students match the filter for the group

    // 3. Add the list of students that match the filter to the group
  }
}
