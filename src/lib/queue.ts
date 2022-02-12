
import EventEmitter from 'events';

const LIMIT = 6;
export enum Events {
  Next = 'NEXT',
  Remove = 'REMOVE'
}

export class Queue extends EventEmitter {
  #list: Set<bigint> = new Set();

  public get list() {
    return Array.from(this.#list);
  }

  public add(id: bigint) {
    this.#list.add(id);
    if (this.#list.size < LIMIT) {
      this.emit(Events.Next, id);
    }
  }

  public remove(id: bigint) {
    this.#list.delete(BigInt(id));
    this.emit(Events.Remove, id);

    if (this.#list.size > 0) {
      const nextId = this.list[this.list.length - 1];
      this.emit(Events.Next, BigInt(nextId));
    }
  }

  public subscribe(cb: (id: string) => void) {
    this.on(Events.Next, (id) => {
      cb(String(id));
    });
  }
}

// const t = new Queue();

// t.subscribe(console.log);
// t.add(BigInt(1));
// t.add(BigInt(2));
// t.add(BigInt(3));
// t.add(BigInt(4));
// console.log(t.list);

// t.remove(BigInt(3));
// console.log(t.list);
