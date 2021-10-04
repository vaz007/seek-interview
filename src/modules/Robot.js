const { error } = require('../helpers/utils');

/** Direction Indexes */
const Direction = {
    NORTH: 1,
    EAST: 2,
    SOUTH: 3,
    WEST: 4
}
module.exports = class Robot {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.boundaries = { x: 5, y: 5 };
        this.direction = Direction.NORTH;
        this.placed = false;
    }

    /**
     * @description Places the robot on the grid with an x,y and direction
     */
    place(x, y, direction) {
        if ((x <= this.boundaries.x && x >= 0) && (this.y <= this.boundaries.y && y >= 0) && this.isValidDirection(direction)) {
            this.x = x;
            this.y = y;
            this.direction = Direction[direction];
            this.placed = true;
        } else {
            return error(`Robot could not be placed. Please check that the direction is correct and the position is valid`);
        }
    };

    /**
     * @description Moves the robot forward based on it's current facing direction
     */
    move() {
        switch (this.direction) {
            case Direction.NORTH:
                this.y + 1 < this.boundaries.y ? this.y++ : null;
                break;
            case Direction.EAST:
                this.x + 1 < this.boundaries.x ? this.x++ : null;
                break;
            case Direction.SOUTH:
                this.y - 1 >= 0 ? this.y-- : null;
                break;
            case Direction.WEST:
                this.x - 1 >= 0 ? this.x-- : null;
                break;
        }
    };

    /**
     * @description Turns the Robot 90deg to the left from it's current direction
     */
    left() {
        return this.direction - 1 === 0 ? this.direction = Direction.WEST : this.direction--;
    }

    /**
     * @description Turns the Robot 90deg to the right from it's current direction
    */
    right() {
        return this.direction + 1 === Object.keys(Direction).length ? this.direction = Direction.NORTH : this.direction++;
    }

    /**
     * @description Provides the Direction name in string form from the index
     * @returns Direction Name - 'NORTH', 'SOUTH', 'EAST', 'WEST'
     */
    convertDirectionToString() {
        for (const dir in Direction) {
            if (this.direction === Direction[dir]) return dir;
        }
    }

    /**
     * @description Checks if the direction is valid or not
     * @returns Boolean
     */
    isValidDirection(direction) {
        return !Direction[direction] ? false : true;
    }

    /**
     * @description Return the current location details of the robot
     */
    report() {
        return `${this.x},${this.y},${this.convertDirectionToString()}`
    }
};