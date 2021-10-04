const Robot = require('../modules/Robot');

describe('Robot Class Testing', () => {

    let robot = null;
    
    const Direction = {
        NORTH: 1,
        EAST: 2,
        SOUTH: 3,
        WEST: 4
    }

    beforeEach(() => {
        robot = new Robot({x: 5, y: 5});
    });

    it('should create a new robot with default values', () => {
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.NORTH);
        expect(robot.placed).toBeFalsy();
    });

    it('should place the robot in the correct position based on x,y and direction', () => {
        robot.place(3, 3, 'EAST');
        expect(robot.x).toBe(3);
        expect(robot.y).toBe(3);
        expect(robot.direction).toBe(Direction.EAST);
    });

    it('should not place the robot if the direction is incorrect', () => {
        robot.place(3, 3, 'WEST');
		expect(robot.x).toBe(0);
		expect(robot.y).toBe(0);
		expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should move the robot forward north', () => {
        robot.move();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(1);
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should move the robot forward east', () => {
        robot.place(3, 3,'EAST');
        robot.move();
        expect(robot.x).toBe(4);
        expect(robot.y).toBe(3);
        expect(robot.direction).toBe(Direction.EAST);
    });

    it('should move the robot forward south', () => {
        robot.place(3, 3,'SOUTH');
        robot.move();
        expect(robot.x).toBe(3);
        expect(robot.y).toBe(2);
        expect(robot.direction).toBe(Direction.SOUTH);
    });

    it('should move the robot forward west', () => {
        robot.place(3, 3,'WEST');
        robot.move();
        expect(robot.x).toBe(2);
        expect(robot.y).toBe(3);
        expect(robot.direction).toBe(Direction.WEST);
    });

    it('should not move the robot past the boundary of the grid', () => {
        robot.place(4, 4, 'NORTH');
        robot.move();
        expect(robot.x).toBe(4);
        expect(robot.y).toBe(4);
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should report the robot position and direction', () => {
        expect(robot.report()).toBe('0,0,NORTH');
    });

    it('should move the robot left', () => {
        robot.left();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.WEST);
    });

    it('should move the robot right', () => {
        robot.right();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.EAST);
    })

    it('should validate a correct direction', () => {
        expect(robot.isValidDirection('INVALID')).toBe(false);
    });

    it('should return the correct direction string based on the direction index', () => {
        expect(robot.convertDirectionToString()).toBe('NORTH');
    });
});