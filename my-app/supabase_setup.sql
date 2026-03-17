-- ==========================================
-- SUPABASE DATABASE SETUP
-- Consolidated script for Tables, RLS, and Seed Data
-- ==========================================

-- 1. CREATE TABLES
-- ------------------------------------------

-- Table for content types (Series, Movies, etc.)
CREATE TABLE tipos (
    id BIGINT PRIMARY KEY,
    singular TEXT NOT NULL,
    plural TEXT NOT NULL
);

-- Table for content genres
CREATE TABLE generos (
    id BIGINT PRIMARY KEY,
    nombre TEXT NOT NULL
);

-- Main table for audiovisual content
CREATE TABLE contenidos (
    id BIGINT PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    imageurl TEXT,
    tipo_id BIGINT REFERENCES tipos(id)
);

-- Junction table for Many-to-Many relation between Contenidos and Generos
CREATE TABLE contenido_generos (
    contenido_id BIGINT REFERENCES contenidos(id) ON DELETE CASCADE,
    genero_id BIGINT REFERENCES generos(id) ON DELETE CASCADE,
    PRIMARY KEY (contenido_id, genero_id)
);

-- Table for Hangman game scores
CREATE TABLE puntuaciones_ahorcado (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    username TEXT NOT NULL,
    score INTEGER NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 2. SECURITY & REALTIME
-- ------------------------------------------

-- Enable Row Level Security (RLS)
ALTER TABLE tipos ENABLE ROW LEVEL SECURITY;
ALTER TABLE generos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contenidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contenido_generos ENABLE ROW LEVEL SECURITY;
ALTER TABLE puntuaciones_ahorcado ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Allow public read types" ON tipos FOR SELECT USING (true);
CREATE POLICY "Allow public read genres" ON generos FOR SELECT USING (true);
CREATE POLICY "Allow public read content" ON contenidos FOR SELECT USING (true);
CREATE POLICY "Allow public read junction" ON contenido_generos FOR SELECT USING (true);
CREATE POLICY "Public Read Puntuaciones" ON puntuaciones_ahorcado FOR SELECT USING (true);

-- Insert Policy for Scores
CREATE POLICY "Allow anyone to insert scores" ON puntuaciones_ahorcado FOR INSERT WITH CHECK (true);

-- Enable Realtime for scores
ALTER TABLE puntuaciones_ahorcado REPLICA IDENTITY FULL;

-- 3. SEED DATA
-- ------------------------------------------

-- 3.1. Insert Tipos
INSERT INTO tipos (id, singular, plural) VALUES
(1, 'Serie', 'Series'),
(2, 'Película', 'Películas'),
(3, 'Anime', 'Animes');

-- 3.2. Insert Generos
INSERT INTO generos (id, nombre) VALUES
(1, 'Drama'), (2, 'Comedia'), (3, 'Acción'), (4, 'Ciencia ficción'),
(5, 'Aventura'), (6, 'Fantasía'), (7, 'Terror'), (8, 'Misterio'),
(9, 'Romance'), (10, 'Thriller'), (11, 'Superhéroes'), (12, 'Slice of life'),
(13, 'Shonen'), (14, 'Mecha'), (15, 'Histórico'), (16, 'Documental');

-- 3.3. Insert Contenidos
INSERT INTO contenidos (id, nombre, descripcion, imageurl, tipo_id) VALUES
(1, 'Breaking Bad', 'Un profesor de química se convierte en fabricante de metanfetaminas.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqhGRPHbiT9WRbp4Mc7kKgT6LHSPHrDiWfEg&s', 1),
(2, 'Stranger Things', 'Un grupo de niños se enfrenta a fuerzas sobrenaturales en su ciudad.', 'https://m.media-amazon.com/images/M/MV5BMjg2NmM0MTEtYWY2Yy00NmFlLTllNTMtMjVkZjEwMGVlNzdjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 1),
(3, 'Friends', 'Seis amigos viven las altas y bajas de la vida en Nueva York.', 'https://m.media-amazon.com/images/M/MV5BOTU2YmM5ZjctOGVlMC00YTczLTljM2MtYjhlNGI5YWMyZjFkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 1),
(4, 'The Office', 'La vida cotidiana en una oficina de papel con mucho humor absurdo.', 'https://m.media-amazon.com/images/M/MV5BZjQwYzBlYzUtZjhhOS00ZDQ0LWE0NzAtYTk4MjgzZTNkZWEzXkEyXkFqcGc@._V1_.jpg', 1),
(5, 'Game of Thrones', 'Familias nobles luchan por el control de los Siete Reinos.', 'https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 1),
(6, 'Dark', 'Desapariciones en un pueblo alemán revelan oscuros secretos temporales.', 'https://www.lavanguardia.com/peliculas-series/images/serie/poster/2017/12/w1280/hRP7N2uI0pokxnkcMFONoOZnxbv.jpg', 1),
(7, 'The Crown', 'Dramatización de la vida de la reina Isabel II.', 'https://m.media-amazon.com/images/M/MV5BODcyODZlZDMtZGE0Ni00NjBhLWJlYTAtZDdlNWY3MzkwMGVhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 1),
(8, 'Sherlock', 'Una moderna adaptación de Sherlock Holmes.', 'https://m.media-amazon.com/images/M/MV5BNTQzNGZjNDEtOTMwYi00MzFjLWE2ZTYtYzYxYzMwMjZkZDc5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 1),
(9, 'The Boys', 'Un grupo busca exponer los crímenes de superhéroes corruptos.', 'https://m.media-amazon.com/images/M/MV5BMWJlN2U5MzItNjU4My00NTM2LWFjOWUtOWFiNjg3ZTMxZDY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 1),
(10, 'Better Call Saul', 'El origen del abogado de Breaking Bad.', 'https://www.aceprensa.com/wp-content/uploads/2015/10/60059-1.jpg', 1),
(11, 'How I Met Your Mother', 'Un hombre cuenta a sus hijos cómo conoció a su madre.', 'https://m.media-amazon.com/images/M/MV5BNjg1MDQ5MjYtZDA0ZS00MWJmLTgxMDctYmIxN2RhYTU5NzBkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg', 1),
(12, 'The Witcher', 'Un cazador de monstruos lucha por encontrar su lugar en un mundo brutal.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9l0qTSnfSABEG9p9ZJqMeLaqaMBQAQvyufQ&s', 1),
(13, 'House of Cards', 'Un político ambicioso trama su camino hacia el poder.', 'https://m.media-amazon.com/images/M/MV5BMTQ4MDczNDYwNV5BMl5BanBnXkFtZTcwNjMwMDk5OA@@._V1_.jpg', 1),
(14, 'Peaky Blinders', 'Una familia criminal británica después de la Primera Guerra Mundial.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOvDSoGSlHJ8gvE3JpgnSSLh9vLdpL6DRcVA&s', 1),
(15, 'Inception', 'Un ladrón entra en los sueños de otros para robar secretos.', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg', 2),
(16, 'The Matrix', 'Un hacker descubre la verdad sobre su realidad simulada.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfSjSWOCaw5dnDL2GT1zFd9RMCgUGw5Q2Cfg&s', 2),
(17, 'Pulp Fiction', 'Historias entrelazadas de crimen en Los Ángeles.', 'https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 2),
(18, 'Titanic', 'Un amor trágico a bordo del famoso barco.', 'https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_.jpg', 2),
(19, 'The Dark Knight', 'Batman enfrenta al temible Joker en Ciudad Gótica.', 'https://m.media-amazon.com/images/S/pv-target-images/e9a43e647b2ca70e75a3c0af046c4dfdcd712380889779cbdc2c57d94ab63902.jpg', 2),
(20, 'Forrest Gump', 'Un hombre simple vive momentos clave de la historia de EE.UU.', 'https://i.pinimg.com/736x/52/29/99/5229997934b5b5acfa512b32db0091fd.jpg', 2),
(21, 'Interstellar', 'Astronautas viajan a través de un agujero de gusano para salvar a la humanidad.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyEQSNpbDsHQd08ZAx-l2E1h5uXxNErtBz3A&s', 2),
(22, 'Fight Club', 'Un hombre crea un club de lucha secreto que cambia su vida.', 'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 2),
(23, 'Gladiator', 'Un general romano busca venganza como gladiador.', 'https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjEtOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_.jpg', 2),
(24, 'The Godfather', 'La historia de una poderosa familia mafiosa.', 'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg', 2),
(25, 'Avengers: Endgame', 'Los Vengadores enfrentan la batalla final contra Thanos.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdwwvagArkrVCOASllUfjgkLow55SakU0sow&s', 2),
(26, 'Parasite', 'Una familia pobre se infiltra en la vida de una familia rica.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyJYd_sWzQdj87gwIiDRpi6JtzfY6-XLG-w&s', 2),
(27, 'La La Land', 'Una historia de amor entre un pianista y una actriz en Los Ángeles.', 'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_FMjpg_UX1000_.jpg', 2),
(28, 'Joker', 'El origen del famoso villano de Gotham.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWnfRvL2Agr1BMFJZn-OcGrozTKU3wWFYGAw&s', 2),
(29, 'Naruto', 'Un joven ninja busca convertirse en el líder de su aldea.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuxa5g8DAZZQpTQvCl0Vme1XacaX-f4AuogF5KD94ULLViEW7lQk4FDyhaLsFkTZz-wc&usqp=CAU', 3),
(30, 'Attack on Titan', 'Humanos luchan por sobrevivir contra titanes gigantes.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBw7hV7aa2wVdL-lggddX_oBSbokJ0Kn-Fcg&s', 3),
(31, 'One Piece', 'Piratas buscan el tesoro legendario llamado One Piece.', 'https://images.justwatch.com/poster/310515848/s718/one-piece.jpg', 3),
(32, 'Death Note', 'Un estudiante obtiene un cuaderno con el poder de matar.', 'https://m.media-amazon.com/images/M/MV5BYTgyZDhmMTEtZDFhNi00MTc4LTg3NjUtYWJlNGE5Mzk2NzMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 3),
(33, 'Fullmetal Alchemist: Brotherhood', 'Dos hermanos alquimistas buscan la Piedra Filosofal.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWp_oYo3pRAzDLqR-Cj6JjaUU6Y1RdoeaoQ&s', 3),
(34, 'My Hero Academia', 'En un mundo con superpoderes, un chico sin dones quiere ser héroe.', 'https://m.media-amazon.com/images/M/MV5BNzgxMzI3NzgtYzE2Zi00MzlmLThlNWEtNWVmZWEyZjNkZWYyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 3),
(35, 'Demon Slayer', 'Un joven caza demonios tras perder a su familia.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWRaIUYW6W8mWGutUKJkRbKn2rOkYq9HN4Dg&s', 3),
(36, 'Jujutsu Kaisen', 'Estudiantes de hechicería luchan contra maldiciones.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8uMcJ2ua3TOb8tu9SANwon4Yp1jgHNrwm3w&s', 3),
(37, 'Dragon Ball Z', 'Guerreros protegen la Tierra de amenazas cósmicas.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKmPkKz7qe4UF0X5eHIFM1Qwe-AY2bRaq6g&s', 3),
(38, 'Cowboy Bebop', 'Cazarrecompensas viajan por el espacio enfrentando su pasado.', 'https://m.media-amazon.com/images/M/MV5BM2VhZjk2MWMtZjc2OC00YzA4LWI0NzAtZGQ1YjVkOTk5YzVlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 3),
(39, 'Tokyo Ghoul', 'Un estudiante se transforma en mitad ghoul tras un accidente.', 'https://i5.walmartimages.com/asr/d597957c-351d-4903-82ff-d52a66aed94a.73a05cb85fdaf2b6a80beb38a5a7f550.jpeg', 3),
(40, 'Bleach', 'Un joven obtiene poderes para luchar contra espíritus malignos.', 'https://static.wikia.nocookie.net/doblaje/images/a/a6/Bleach_%28anime%29.png/revision/latest?cb=20220116194311&path-prefix=es', 3),
(41, 'Steins;Gate', 'Un grupo descubre cómo enviar mensajes al pasado.', 'https://m.media-amazon.com/images/M/MV5BZjI1YjZiMDUtZTI3MC00YTA5LWIzMmMtZmQ0NTZiYWM4NTYwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 3),
(42, 'Mob Psycho 100', 'Un joven psíquico intenta vivir una vida normal.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1E7nLIqKxzIdD_pQAgzch0cfwMFSAEgBzrA&s', 3),
(43, 'Haikyuu', 'Un equipo de voleibol lucha por llegar a la cima.', 'https://m.media-amazon.com/images/M/MV5BYjYxMWFlYTAtYTk0YS00NTMxLWJjNTQtM2E0NjdhYTRhNzE4XkEyXkFqcGc@._V1_.jpg', 3),
(44, 'Clannad', 'Un estudiante problemático cambia su vida al conocer a una chica especial.', 'https://m.media-amazon.com/images/M/MV5BMWJiNDQzNGEtNTA3Zi00NjM2LWE2NTAtOTU0NzA4ZmJiMjhmXkEyXkFqcGc@._V1_.jpg', 3),
(45, 'Neon Genesis Evangelion', 'Adolescentes pilotan mechas para salvar al mundo.', 'https://m.media-amazon.com/images/M/MV5BMGRiOWQyOTAtZDQ0Ny00NGRiLWIyYTYtZWM1MjNjNzg0ZjE3XkEyXkFqcGc@._V1_.jpg', 3);

-- 3.4. Insert Contenido-Generos
INSERT INTO contenido_generos (contenido_id, genero_id) VALUES
(1, 1), (1, 3), (1, 10),
(2, 1), (2, 4), (2, 8),
(3, 2), (3, 1),
(4, 2),
(5, 1), (5, 6), (5, 5),
(6, 8), (6, 1), (6, 4),
(7, 1), (7, 15),
(8, 8), (8, 1),
(9, 3), (9, 11), (9, 10),
(10, 1), (10, 10),
(11, 2), (11, 9),
(12, 5), (12, 6), (12, 1),
(13, 1), (13, 10),
(14, 1), (14, 3), (14, 15),
(15, 4), (15, 10), (15, 1),
(16, 4), (16, 3),
(17, 1), (17, 2), (17, 10),
(18, 1), (18, 9), (18, 15),
(19, 3), (19, 11), (19, 10),
(20, 1), (20, 2), (20, 15),
(21, 4), (21, 1), (21, 5),
(22, 1), (22, 10),
(23, 3), (23, 15), (23, 1),
(24, 1), (24, 10), (24, 15),
(25, 3), (25, 11), (25, 4),
(26, 1), (26, 10),
(27, 2), (27, 9),
(28, 1), (28, 10),
(29, 13), (29, 5), (29, 6),
(30, 3), (30, 10), (30, 13),
(31, 5), (31, 6), (31, 13),
(32, 8), (32, 10), (32, 13),
(33, 5), (33, 6), (33, 13),
(34, 11), (34, 13), (34, 3),
(35, 3), (35, 6), (35, 13),
(36, 3), (36, 6), (36, 13),
(37, 3), (37, 13), (37, 6),
(38, 4), (38, 5), (38, 13),
(39, 7), (39, 10), (39, 13),
(40, 3), (40, 6), (40, 13),
(41, 4), (41, 10), (41, 8),
(42, 2), (42, 11), (42, 13),
(43, 12), (43, 1), (43, 13),
(44, 1), (44, 9), (44, 12),
(45, 14), (45, 4), (45, 13);
