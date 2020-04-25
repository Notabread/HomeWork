import Chance from "chance";
import User from "./classes/User";
import Admin from "./classes/Admin";
import Accordion from "./classes/Accordion";
// 1. КЛАССЫ

// Написать класс User с двумя аргументами у конструктора - имя пользователя и дата раждения (дата задаётся с помощью объекта date())

const birthday = new Date(2000, 5, 11); // 11 июня 2000-го года
const john = new User("John Doe", birthday);
// у объектов User должен быть свойство-геттер age, которое рассчитывает текущий возраст пользователя

// например:

//alert(john.age); // покажет возраст

// для расчета возраста используйте возможности работы с датами (документация по Date.prototype)

// Затем реализуйте класс Admin, который будет расширять класс User

// у объектов Admin должен быть метод kill, который принимает только один аргумент.
// Если аргумент не является объектом, то метод kill толжен выбросить ошибку (через throw new TypeError("Необходимо передать объект")),
// если передали объект User, то метод должен вывести в консоли сообщение о том, что пользователь убит. Если передан объект Admin, то необходимо выбросить ошибку
//throw new Error("Недостаточно прав");

// Пример:

const admin = new Admin("Martin Luter", birthday);

//admin.kill(admin); // ошибка
//admin.kill(5); // ошибка
//admin.kill(null); // ошибка

admin.kill(john); // Пользователь John Doe убит.


//-------------------------------------------------------------------------------

// 2. Промисы
// Дан массив промисов

const promises = [
    new Promise((resolve) => { setTimeout(() => resolve(5), 2000); }),
    new Promise((resolve) => { setTimeout(() => resolve(10), 2000); }),
    Promise.resolve(9),
];


// Необходимо найти сумму значений трёмя способами:
// а) с помощью Promise.all и reduce
Promise.all(promises)
    .then((values) => {
        return values.reduce((acc, cur) => {
            return acc + cur;
        });
    })
    .then((sum) => console.log('Сумма через Promise.all:', sum));


// б) построить цепочку промисов с помощью reduce и вывести результат через последний then

promises.reduce((acc, promise, i) => {
    let prom = acc.then((promAcc) => {
        return promise.then((promCur) => {
            return promCur + promAcc;
        });
    });

    if (promises.length === i + 1) {
        prom.then((sum) => console.log('Сумма через reduce:', sum));
    }
    return prom;
}, Promise.resolve(0));


// в) async / await

async function counter() {
    let sum = 0;

    /*
     * Сначала думал сделать так, но в условии именно массив, поэтому решил сделать через for await of
     * Но из-за того, что массив сразу выполняет все промисы, разницы в скорости выполнения нет
     *
     * sum += await new Promise((resolve) => { setTimeout(() => resolve(5), 2000); });
     * sum += await new Promise((resolve) => { setTimeout(() => resolve(10), 2000); });
     * sum += await Promise.resolve(9);
     */

    for await (let promise of promises) {
        sum += promise;
    }
    return sum;
}
counter().then((sum) => console.log('Сумма через async await:', sum));


//-------------------------------------------------------------------------------

// 3. Генераторы
// написать генератор, который будет выдавать случайную последовательность символов a-zA-Z
let chance = new Chance;
let randomString = function* (letterCount) {
    for (let i = 0; i < letterCount; i++) {
        yield chance.letter();
    }
};


// 10 - лимит символов
for (const char of randomString(10)) {
    console.log(char);
}

// или

const str = [...randomString(5)].join(""); // например: aXtrW
console.log(str);


//-------------------------------------------------------------------------------

//DOM
// Пример использования
window.addEventListener('load', () => {
    new Accordion({
        elem: "firstAccordion",
        titleClass: "accordion__title",
        contentClass: "accordion__content",
        content: {
            titles: [
                'Первая кнопка',
                'Вторая кнопка',
            ],
            contents: [
                'Первый текст',
                'Второй текст',
            ]
        },
        selector: 'body',
    });
});

window.addEventListener('load', () => {
    new Accordion({
        elem: "secondAccordion",
        titleClass: "accordion__title",
        contentClass: "accordion__content",
        content: {
            titles: [
                'Первая кнопка второго аккордеона',
                'Вторая кнопка второго аккордеона',
            ],
            contents: [
                'Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + .',
                'Второй текст второго аккордеона',
            ]
        },
        selector: 'body',
    });
});


// в аккордеоне всегда может быть открыто НЕ БОЛЕЕ одной панели, есть возможность свернуть все, но нельзя развернуть сразу несколько панелей