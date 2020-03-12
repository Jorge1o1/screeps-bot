export function centerMass(positions: [number, number][]): [number, number] {
    const xreducer = (acc: number, cur: [number, number]) => acc + cur[0];
    const yreducer = (acc: number, cur: [number, number]) => acc + cur[1];
    const sumx = positions.reduce<number>(xreducer, 0);
    const sumy = positions.reduce<number>(yreducer, 0);
    return [Math.round(sumx / positions.length), Math.round(sumy / positions.length)];
}

export function neighbors4(pos: RoomPosition): RoomPosition[] {
    return [
        new RoomPosition(pos.x, pos.y + 1, pos.roomName),
        new RoomPosition(pos.x, pos.y - 1, pos.roomName),
        new RoomPosition(pos.x + 1, pos.y, pos.roomName),
        new RoomPosition(pos.x - 1, pos.y, pos.roomName),
    ];
}

export function neighbors8(pos: RoomPosition): RoomPosition[] {
    return [
        new RoomPosition(pos.x, pos.y + 1, pos.roomName),
        new RoomPosition(pos.x, pos.y - 1, pos.roomName),
        new RoomPosition(pos.x + 1, pos.y, pos.roomName),
        new RoomPosition(pos.x - 1, pos.y, pos.roomName),
        new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName),
        new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName),
        new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName),
        new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName),
    ];
}