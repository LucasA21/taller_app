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
            console.error("Supabase Error (contenidos):", {
                message: error?.message,
                hint: error?.hint,
                details: error?.details,
                code: error?.code
            });
            console.log("Supabase: Fallante, usando fallback local.");
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
