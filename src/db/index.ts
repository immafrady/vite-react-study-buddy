import Dexie from 'dexie';

export class MyAppDatabase extends Dexie {
  constructor() {
    super('MyAppDatabase');

    this.version(1).stores({
      contacts: '++id, first, last'
    })
    this.open().catch(err => {
      console.log(err)
    })
  }
}
