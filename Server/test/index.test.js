const app = require('../src/app');
const session = require('supertest');
const request = session(app);

const character = {
    id: 923,
    name: "daniel",
    species: "Human", 
    gender: "Male",
    status: "Alive",
    origin: {
        name: "Earth"
    },
    image: "image.jpg"
};

describe("Test de RUTAS", () => {
    describe("GET /rickandmorty/character/:id", () => {
        
        it("Responde con status: 200", async () => {
            const response = await request.get('/rickandmorty/character/1');
            expect(response.statusCode).toBe(200);
        })

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await request.get('/rickandmorty/character/1');
            for(const prop in character){
                expect(response.body).toHaveProperty(prop);
            }
        })

        it("Si hay un error responde con status: 500", async () => {
            const response = await request.get('/rickandmorty/character/900');
            expect(response.statusCode).toBe(500);
        })

    })

    describe("GET /rickandmorty/login", () => {
        it("Rosoponder con un objeto con la propiedad access en true si la informacion es valida", async () => {
            const response = await request.get('/rickandmorty/login?email=admin@admin.com&password=12345678');
            const access = {access: true};

            expect(response.body).toEqual(access);
        })

        it("Rosoponder con un objeto con la propiedad access en true si la informacion es valida", async () => {
            const response = await request.get('/rickandmorty/login?email=admn@admin.com&password=1234568');
            const access = {access: false};

            expect(response.body).toEqual(access);
        })
    })

    describe("POST /rickandmorty/fav", () => {
        it("Debe guardar el personaje en favoritos", async () => {
            const response = await request.post('/rickandmorty/fav')
            .send(character);
            expect(response.body).toContainEqual(character);
        })

        it("Debe agregar personajes a favoritos sin eliminar los existentes", async () => {
            const characterId = 1923;
            const characterName = "Daniel"
            const response = await request.post('/rickandmorty/fav')
            .send(character);
            expect(response.body.length).toBe(2);
        })
    })

    describe("DELETE /rickandmorty/fav/:id", () => {
        it("Si el ID solicitado no existe, deberia retornar un arreglo con todos los favoritos", async () => {
            const response = await request.delete('/rickandmorty/fav/asd2')
            expect(response.body.length).toBe(2);
        })

        it("Elimina un personaje si el ID enviado existe", async () => {
            const response = await request.delete('/rickandmorty/fav/923');
            expect(response.body.length).toBe(0);
        })
    })

})