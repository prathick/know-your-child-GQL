import { MyContext } from "src/types/types";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Student } from "../..//entity/Student";
import { Room } from "../../entity/Room";
import { School } from "../../entity/School";


@Resolver()
export class RoomResolver {

    @Authorized()
    @Query(() => [Room])
    async rooms(
        @Ctx() ctx: MyContext
    ): Promise<Room[]> {
        const { user } = ctx.req.session;
        const school = await School.findOne({ user });
        const rooms = await Room.find({ relations: ['school', 'students'], where: { school } })
        return rooms;
    }

    @Authorized()
    @Query(() => Room, { nullable: true })
    async room(
        @Arg("id") id: string
    ): Promise<Room | null> {
        const room = await Room.findOne({ id }, { relations: ['school'] })
        if (!room) return null;
        return room;
    }

    @Authorized()
    @Mutation(() => Room)
    async addRoomToSchool(
        @Arg("name") name: string,
        @Ctx() ctx: MyContext
    ): Promise<Room | null> {
        const { user } = ctx.req.session;
        const school = await School.findOne({ user });
        const newRoom = await Room.create({ name: name, school }).save();
        return newRoom;
    }

    @Authorized()
    @Mutation(() => Room)
    async addStudentToRoom(
        @Arg("studentId") studentId: string,
        @Arg("roomId") roomId: string
    ): Promise<Room | null> {
        const student = await Student.findOne({ id: studentId })
        const currentRoom = await Room.findOne({ id: roomId })
        if (!student || !currentRoom) return null;

        currentRoom.students = [student]
        const updatedRoom = await currentRoom.save();
        return updatedRoom
    }
}