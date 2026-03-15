import { supabase } from "@/lib/supabase";
import { contenidosAudiovisuales, IContenidoAudiovisual } from "../data/contenidosAudiovisuales";
import { tiposContenidoAudiovisual, ITipoContenidoAudiovisual } from "../data/tiposContenidoAudiovisual";
import { generosContenidoAudiovisual, IGeneroContenidoAudiovisual } from "../data/generosContenidoAudiovisual";

export async function fetchTipos(): Promise<ITipoContenidoAudiovisual[]> {
    try {
        const { data, error } = await supabase
            .from('tipos')
            .select('*')
            .order('id', { ascending: true });

        if (error || !data || data.length === 0) {
            return tiposContenidoAudiovisual;
        }
        return data as ITipoContenidoAudiovisual[];
    } catch (e) {
        return tiposContenidoAudiovisual;
    }
}

export async function fetchGeneros(): Promise<IGeneroContenidoAudiovisual[]> {
    try {
        const { data, error } = await supabase
            .from('generos')
            .select('*')
            .order('id', { ascending: true });

        if (error || !data || data.length === 0) {
            return generosContenidoAudiovisual;
        }
        return data as IGeneroContenidoAudiovisual[];
    } catch (e) {
        return generosContenidoAudiovisual;
    }
}

export async function fetchContenidos(): Promise<IContenidoAudiovisual[]> {
    try {
        const { data, error } = await supabase
            .from('contenidos')
            .select(`
                id,
                nombre,
                descripcion,
                imageurl,
                tipo_id,
                contenido_generos (
                    genero_id
                )
            `)
            .order('id', { ascending: true });

        if (error || !data || data.length === 0) {
            console.error("Supabase Error (contenidos):", error?.message || error);
            return contenidosAudiovisuales;
        }
        return data.map((item: any) => ({
            id: item.id,
            nombre: item.nombre,
            descripcion: item.descripcion,
            imageUrl: item.imageurl,
            tipoId: item.tipo_id,
            generos: item.contenido_generos.map((g: any) => g.genero_id)
        })) as IContenidoAudiovisual[];

    } catch (e) {
        console.error("Supabase Connection Error (contenidos):", e);
        return contenidosAudiovisuales;
    }
}

export interface ILeaderboardEntry {
    id: string;
    username: string;
    score: number;
    created_at: string;
}

export async function fetchLeaderboard(): Promise<ILeaderboardEntry[]> {
    try {
        const { data, error } = await supabase
            .from('puntuaciones_ahorcado')
            .select('*')
            .order('score', { ascending: false });

        if (error) {
            console.error("Error al obtener puntuaciones:", error);
            return [];
        }

        const bestScoresMap = new Map<string, ILeaderboardEntry>();
        
        data.forEach((entry: any) => {
            const existing = bestScoresMap.get(entry.username);
            if (!existing || entry.score > existing.score) {
                bestScoresMap.set(entry.username, entry);
            }
        });

        return Array.from(bestScoresMap.values())
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
            
    } catch (e) {
        console.error("Error inesperado en fetchLeaderboard:", e);
        return [];
    }
}

export function subscribeToLeaderboard(onUpdate: () => void) {
    const channel = supabase
        .channel('public:puntuaciones_ahorcado')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'puntuaciones_ahorcado' },
            () => {
                onUpdate();
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}

export async function saveScore(username: string, score: number): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('puntuaciones_ahorcado')
            .insert([{ 
                username, 
                score, 
                created_at: new Date().toISOString() 
            }]);

        if (error) {
            console.error("Error al guardar puntaje:", error);
            return false;
        }

        return true;
    } catch (e) {
        console.error("Error inesperado en saveScore:", e);
        return false;
    }
}
