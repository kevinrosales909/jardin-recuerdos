import { Recuerdo } from '../models/recuerdoModel';

export class RecuerdoView {
    private container: HTMLElement;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId)!;
    }

    public render(recuerdos: Recuerdo[]): void {
        this.container.innerHTML = '';

        if (!recuerdos || recuerdos.length === 0) {
            this.container.innerHTML = `
                <div class="empty-msg">
                    <span style="font-size: 2.5rem; display: block; margin-bottom: 10px;">🌱</span>
                    Tu jardín está esperando. ¡Siembra tu primer recuerdo arriba!
                </div>
            `;
            return;
        }

        recuerdos.forEach(recuerdo => {
            const card = document.createElement('div');
            card.className = `flor-card`;
            
            // Asignación segura de icono según la emoción
            let iconoFlor = '🌸';
            const emocion = recuerdo.emocion ? recuerdo.emocion.toLowerCase() : '';
            
            if (emocion.includes('entusiasmo')) {
                iconoFlor = '🌻';
            } else if (emocion.includes('nostalgia')) {
                iconoFlor = '🌷';
            } else if (emocion.includes('paz')) {
                iconoFlor = '🌼';
            } else if (emocion.includes('alegría') || emocion.includes('alegria')) {
                iconoFlor = '🌸';
            }

            card.innerHTML = `
                <div class="flor-header">
                    <span class="flor-icono">${iconoFlor}</span>
                    <span class="badge-emocion">${recuerdo.emocion}</span>
                </div>
                <div class="flor-body">
                    <p class="texto">"${recuerdo.contenido}"</p>
                </div>
                <div class="flor-footer">
                    <div class="tags">
                        <span class="tag">📂 ${recuerdo.categoria}</span>
                        <span class="tag">📅 ${recuerdo.fecha}</span>
                    </div>
                    <button class="btn-delete" data-id="${recuerdo.id}" title="Eliminar recuerdo">🗑️ Arrancar</button>
                </div>
            `;
            this.container.appendChild(card);
        });
    }
}