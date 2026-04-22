/*
  Ключ (Key): приватна властивість signature, яка генерується випадково,
  і метод getSignature, що повертає її значення.

  Людина (Person): приймає у конструктор об'єкт Key і зберігає його у приватній властивості key.
  Метод getKey повертає збережений ключ.

  Дім (House): абстрактний клас з властивостями door (true/false) та key (Key).
  Метод comeIn додає Person у масив tenants, якщо door відкрита.
  Абстрактний метод openDoor приймає об'єкт Key.

  MyHouse: наслідується від House та реалізує openDoor —
  якщо підпис переданого ключа збігається зі збереженим, двері відчиняються.
*/

class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected key: Key;
  protected tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  comeIn(person: Person): void {
    if (!this.door) {
      console.log('The door is closed, the tenant cannot come in.');
      return;
    }
    this.tenants.push(person);
    console.log('Tenant came in. Total tenants: ' + this.tenants.length);
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log('The door is open.');
    } else {
      console.log('Wrong key, the door stays closed.');
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);


export {};
