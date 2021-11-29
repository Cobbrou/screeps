import { TaskStatus } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    // WIP : ORDER & SELL TERMINAL
    const room = Game.rooms[creep.memory.room];
    const targets = creep.room.find(FIND_MINERALS);
    const target = targets[0];
    creep.memory.mineralType = target.mineralType;

    if (creep.harvest(target) === ERR_NOT_IN_RANGE) creep.travelTo(target);

    if (creep.room.terminal && creep.store.getFreeCapacity() <= 0) {
        if (creep.transfer(creep.room.terminal, creep.memory.mineralType) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal);
        }
    } else if (creep.room.storage && creep.store.getFreeCapacity() <= 0) {
        if (creep.transfer(creep.room.storage, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.storage);
        }
    }

    creep.speech("⛏")
    return TaskStatus.WORKING;
}
