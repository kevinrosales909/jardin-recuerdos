/// <reference types="vite/client" />

import { DatabaseService } from './db/database';
import { RecuerdoView } from './views/recuerdoView';
import { RecuerdoController } from './controllers/recuerdoController';
import './styles/styles.css';

async function main() {
    const db = new DatabaseService();
    await db.init();

    const view = new RecuerdoView('jardin-grid');
    const controller = new RecuerdoController(db, view);
    
    controller.init();
}

main();