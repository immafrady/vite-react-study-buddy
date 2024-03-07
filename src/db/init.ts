import { AppDatabase } from '@/db/index';
import { loadMarxData } from '@/services/subjects/marx/load-data';

let db: AppDatabase;

export async function getDatabaseInstance(): Promise<AppDatabase> {
  if (!db?.isOpen()) {
    db = new AppDatabase();
    // 马克思
    await loadMarxData(db)
  }

  return db
}
