import knex, { Knex } from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: "Papéis e Papelão", image: "papel.png" },
        { title: "Vidro e Lâmpada", image: "vidro.png" },
        { title: "Óleo de Cozinha", image: "oleo.png" },
        { title: "Resíduos Orgânicos", image: "organico.png" },
        { title: "Baterias e Pilhas", image: "bateria.png" },
        { title: "Eletrônicos", image: "eletronico.png" }
    ]);
}