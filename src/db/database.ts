export class DatabaseService {
    private db: any = null;
    private readonly STORAGE_KEY = 'jardin_recuerdos_sqlite_db';

    async init(): Promise<void> {
        // @ts-ignore
        if (typeof window.initSqlJs === 'undefined') {
            throw new Error("sql.js no se ha cargado correctamente.");
        }

        // @ts-ignore
        const SQL = await window.initSqlJs({
            locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        const savedDb = localStorage.getItem(this.STORAGE_KEY);
        if (savedDb) {
            const uInt8Array = new Uint8Array(JSON.parse(savedDb));
            this.db = new SQL.Database(uInt8Array);
        } else {
            this.db = new SQL.Database();
            this.createTable();
            this.seedData();
        }
    }

    private createTable(): void {
        if (!this.db) return;
        this.db.run(`
            CREATE TABLE IF NOT EXISTS recuerdos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                contenido TEXT NOT NULL,
                fecha TEXT NOT NULL,
                categoria TEXT NOT NULL,
                emocion TEXT NOT NULL
            );
        `);
        this.persist();
    }

    private seedData(): void {
        if (!this.db) return;
        const stmt = this.db.prepare(
            "INSERT INTO recuerdos (contenido, fecha, categoria, emocion) VALUES (?, ?, ?, ?);"
        );
        stmt.run(["Primer día de clases en UNIVO", "2026-02-10", "Estudio", "Alegría"]);
        stmt.run(["Creando mi portafolio web con TypeScript", "2026-11-16", "Tecnología", "Entusiasmo"]);
        stmt.free();
        this.persist();
    }

    private persist(): void {
        if (!this.db) return;
        const binaryArray = this.db.export();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(Array.from(binaryArray)));
    }

    public getAll(): any[] {
        if (!this.db) return [];
        const result = this.db.exec("SELECT * FROM recuerdos ORDER BY fecha DESC;");
        if (result.length === 0) return [];
        
        const columns = result[0].columns;
        return result[0].values.map((row: any[]) => {
            let obj: any = {};
            columns.forEach((col: string, index: number) => {
                obj[col] = row[index];
            });
            return obj;
        });
    }

    public create(contenido: string, fecha: string, categoria: string, emocion: string): void {
        if (!this.db) return;
        const stmt = this.db.prepare(
            "INSERT INTO recuerdos (contenido, fecha, categoria, emocion) VALUES (?, ?, ?, ?);"
        );
        stmt.run([contenido, fecha, categoria, emocion]);
        stmt.free();
        this.persist();
    }

    public delete(id: number): void {
        if (!this.db) return;
        this.db.run("DELETE FROM recuerdos WHERE id = ?;", [id]);
        this.persist();
    }

    public filterByEmocion(emocion: string): any[] {
        if (!this.db) return [];
        const stmt = this.db.prepare("SELECT * FROM recuerdos WHERE emocion = ? ORDER BY fecha DESC;");
        stmt.bind([emocion]);
        let rows = [];
        while (stmt.step()) {
            rows.push(stmt.getAsObject());
        }
        stmt.free();
        return rows;
    }
}