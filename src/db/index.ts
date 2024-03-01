import Dexie from 'dexie';
import { IRecord } from '@/db/models/record/types';
import { IClassify } from '@/db/models/classify/types';
import { IQuestion } from '@/db/models/question/types';

export class MyAppDatabase extends Dexie {
  classifies!: Dexie.Table<IClassify, number>
  questions!: Dexie.Table<IQuestion, number>
  records!: Dexie.Table<IRecord, number>

  constructor() {
    super('StudyBuddyDatabase');

    this.version(1).stores({
      classifies: '++id, name',
      questions: '++id, &classifyId, q, like, count, wrongCount, type',
      records: '++id, &classifyId, *questionIds, *wrongQuestionIds'
    })
  }
}
