import { TaskStatus, Task } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) {
        return TaskStatus.COMPLETED;
    }

    // Problem, find in order
    const storages = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          if (structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_CONTAINER ||
            structure.structureType === STRUCTURE_STORAGE) {
            if (structure.structureType === STRUCTURE_SPAWN && structure.memory.needToSpawn)
                return false

            const store = structure.store as GenericStore;
            // @ts-ignore
            return store.getFreeCapacity(RESOURCE_ENERGY) <= 0;
          }

          return false
        }
    });
    const storage = creep.pos.findClosestByPath(storages);

    if (storage) {
        creep.speech("📦");

        if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        }
    } else {
        return creep.runTask(Task.HARVEST);
    }

    return TaskStatus.OK;
}
