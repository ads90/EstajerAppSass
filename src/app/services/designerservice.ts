import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DesignerService {
    preset = signal({ primitive: null, semantic: null });

    acTokens = signal<any>([]);
    
    setPreset(preset: { primitive: any; semantic: any }): void {
        this.preset.set(preset);
    }

    setAcTokens(tokens: any[]): void {
        this.acTokens.set(tokens);
    }
}