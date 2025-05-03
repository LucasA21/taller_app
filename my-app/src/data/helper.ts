import { generosContenidoAudiovisual } from "./generosContenidoAudiovisual";

export function mapGeneros(ids: number[]): string[] {
  return ids
    .map((id) => generosContenidoAudiovisual.find(g => g.id === id)?.nombre)
    .filter((n): n is string => !!n);
}
