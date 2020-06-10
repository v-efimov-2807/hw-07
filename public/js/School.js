import {PersonFactory} from "./PersonFactory.js"
import { Student, Teacher } from "./personLib.js";

export class School {
    constructor() {
        this.students = [];
        this.teachers = [];
    };

    get studentsList() {
        return this.students;
    };

    get teachersList() {
        return this.teachers;
    };

    enrollPerson(params) {
        const person = new PersonFactory(params);

        if(person.type === "teacher") {
            this.teachers.push(person);
        } else if(person.type === "student") {
            this.students.push(person);
        } else {
            return "Uncorrect person's status";
        }
    };

    enrollStudent(params) {
        this.students.push( new PersonFactory(params) );
    };

    enrollTeacher(params) {
        this.teachers.push( new PersonFactory(params) );
    };

    findStudent(fullName) {
        return this.students.filter( student => student.fullName === fullName );
    };

    dismissStudent(fullName) {
        const index = this.students.findIndex(student => student.fullName === fullName);
        if (index !== -1) {
            this.students.splice(index, 1);
        } else {
            return "Student not found";
        }
    };

    appendToDOM() {
        this.students.forEach((item) => {
            const student = new Student(item);
            student.appendToDOM();
        });

        this.teachers.forEach((item) => {
            const teacher = new Teacher(item);
            teacher.appendToDOM();
        });
    }
}