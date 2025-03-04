import * as taskIdle from "tasks/idle";
import * as taskHarvest from "tasks/harvest";
import * as taskPickup from "tasks/pickup";
import * as taskCarry from "tasks/carry";
import * as taskSpread from "tasks/spreadEnergy";
import * as taskUpgrade from "tasks/upgrade";
import * as taskRepair from "tasks/repair";
import * as taskBuild from "tasks/build";
import * as taskStore from "tasks/store";
import * as taskExtract from "tasks/extractor"

export enum Task {
    IDLE = "idle",
    HARVEST = "harvest",
    PICKUP = "pickup",
    CARRY = "carry",
    SPREAD_ENERGY = "spreadEnergy",
    UPGRADE = "upgrade",
    REPAIR = "repair",
    BUILD = "build",
    STORE = "store",
    EXTRACT = "extract"
}

export enum TaskStatus {
    FAILED,
    WORKING,
    COMPLETED
}

Creep.prototype.runTask = function (task: Task): TaskStatus {
    switch (task) {
        case Task.HARVEST:
            return taskHarvest.run(this);
        case Task.PICKUP:
            return taskPickup.run(this);
        case Task.CARRY:
            return taskCarry.run(this);
        case Task.SPREAD_ENERGY:
            return taskSpread.run(this);
        case Task.UPGRADE:
            return taskUpgrade.run(this);
        case Task.REPAIR:
            return taskRepair.run(this);
        case Task.BUILD:
            return taskBuild.run(this);
        case Task.STORE:
            return taskStore.run(this);
        case Task.EXTRACT:
            return taskExtract.run(this);
        default:
            return taskIdle.run(this);
    }
}
