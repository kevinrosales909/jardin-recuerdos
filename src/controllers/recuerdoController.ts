import { DatabaseService } from '../db/database';
import { RecuerdoView } from '../views/recuerdoView';

export class RecuerdoController {
    private db: DatabaseService;
    private view: RecuerdoView;

    constructor(db: DatabaseService, view: RecuerdoView) {
        this.db = db;
        this.view = view;
    }

    public init(): void {
        this.loadRecuerdos();
        this.initEventListeners();
    }

    private loadRecuerdos(emocionFiltro?: string): void {
        const data = emocionFiltro && emocionFiltro !== 'todos' 
            ? this.db.filterByEmocion(emocionFiltro) 
            : this.db.getAll();
        this.view.render(data);
    }

    private initEventListeners(): void {
        const form = document.getElementById('recuerdo-form') as HTMLFormElement;
        const grid = document.getElementById('jardin-grid')!;
        const selectFiltro = document.getElementById('filtro-emocion') as HTMLSelectElement;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const contenido = (document.getElementById('contenido') as HTMLInputElement).value;
            const fecha = (document.getElementById('fecha') as HTMLInputElement).value;
            const categoria = (document.getElementById('categoria') as HTMLSelectElement).value;
            const emocion = (document.getElementById('emocion') as HTMLSelectElement).value;

            if (contenido && fecha) {
                this.db.create(contenido, fecha, categoria, emocion);
                this.loadRecuerdos(selectFiltro.value);
                form.reset();
            }
        });

        grid.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('btn-delete')) {
                const id = Number(target.getAttribute('data-id'));
                this.db.delete(id);
                this.loadRecuerdos(selectFiltro.value);
            }
        });

        selectFiltro.addEventListener('change', () => {
            this.loadRecuerdos(selectFiltro.value);
        });
    }
}