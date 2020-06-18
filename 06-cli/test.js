const {
    deepEqual, 
    ok
} = require ('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1 
}

describe('Suite de manipulacao de herois', () =>{
    it('deve pesquisar um heroi usando arquivos', async () =>{
        const expected =  DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        const posicaoUm = resultado[0]
            deepEqual(resultado, expected)
    })

    // it('deve cadastrar um heroi, usando arquivos', async () =>{
    //     const expected =  DEFAULT_ITEM_CADASTRAR
    //         ok(null, expected)
    // })
})