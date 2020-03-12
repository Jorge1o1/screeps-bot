import { centerMass, neighbors4 } from "utils/geometry";

export function optimalSpawnPoint(room: Room): RoomPosition {
    const sources = room.find(FIND_SOURCES);
    const positions: Array<[number, number]> = sources.map(s => <[number, number]>[s.pos.x, s.pos.y]);
    const cm = centerMass(positions);
    const pos = new RoomPosition(cm[0], cm[1], room.name);
    const candidates = neighbors4(pos).concat(pos);
    const targets = sources.map(s => s.pos);
    return recursiveOSP(candidates, targets, Number.MAX_SAFE_INTEGER);
}

//Todo this wastes a lot of effort on recalculations
function recursiveOSP(positions: RoomPosition[], targets: RoomPosition[], bestCostSoFar: number): RoomPosition {
    let cost = Number.MAX_SAFE_INTEGER;
    let best = positions[0];
    positions.forEach(pos => {
        let sum = 0;
        targets.forEach(t => {
            let search = PathFinder.search(pos, { pos: t, range: 1 }, { maxOps: 20000 });
            sum += search.cost;
        });
        if (sum < cost) {
            cost = sum;
            best = pos;
        }
    });
    console.log(cost, bestCostSoFar);
    if (best == undefined) {
        throw new Error("Could not find best position");
    }
    if (cost == bestCostSoFar) {
        return best;
    } else {
        let newPositions = neighbors4(best).concat(best);
        return recursiveOSP(newPositions, targets, cost)
    }
}