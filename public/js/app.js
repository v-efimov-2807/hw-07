import { PersonFactory } from "./PersonFactory.js";
import { personArr } from "./personArr.js";
import { School } from "./School.js";

personArr.forEach((item) => {
    const person = new PersonFactory(item);
    person.appendToDOM();
});


/**
 * Тест класса School
 */

/*Создаём школу*/
const schoooool = new School();
personArr.forEach((item) => {
    schoooool.enrollPerson(item);
});
console.log(schoooool);

/* Добавляем студента */
schoooool.enrollStudent( {
    fullName: 'Пупкин Вячеслав',
    type: "student",
    university: 'НГУ',
    course: 6,
    birthDate: new Date(1488, 6, 28)
} );
console.log(schoooool);

/* Ищем студента по имени */
console.log(schoooool.findStudent('Маша Сидорова'));

/* Удаляем студента */
console.log(schoooool.studentsList);
schoooool.dismissStudent('Пупкин Вячеслав');
console.log(schoooool.studentsList);