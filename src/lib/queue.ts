
import EventEmitter from 'events';

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
    this.emit(Events.Next, id);
  }

  public remove(id: bigint) {
    this.#list.delete(id);
    this.emit(Events.Remove, id);
  }

  public subscribe(cb: (id: string) => void) {
    this.on(Events.Next, (event) => {
      console.log('event', event);
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
