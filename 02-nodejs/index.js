/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu Id 
2 Obter o endereco do usuario pelo Id
*/

//importamos um modulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario(){
    //quando der algum problema -> reject(ERRO)
    //quando der tudo certo -> resolve(SUCESSO)
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
            //return reject(new Error('DEU RUIM DE VERDADE!'))
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
            return resolve({
                telefone:'9990-0000',
                ddd: 11
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(function(){
        return callback(null, {
            rua:'dos bobos',
            numero: 0
        })
    }, 2000)
}

const usuarioPromise = obterUsuario()
//para manipular o sucesso usamos a funcao .then
//para manipular erros usuamos o .catch
//usuario -> telefone -> telefone
usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function(resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function(resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch(function(error){
        console.error('DEU RUIM', error)
    })

// obterUsuario(function resolverUsuario(error, usuario){
//     null || "" || 0 === false
//     if(error){
//         console.error('Erro em Usuario', error)
//         return;
//     }
//     obterTelefone( usuario.id, function resolverTelefone(error1, telefone){
//         if(error1){
//             console.error('Erro em Telefone', error1)
//             return;
//         } 
//         obterEndereco( usuario.id, function resolverEndereco(error2, endereco){
//             if(error2){
//                 console.error('Erro em Endereço', error2)
//                 return;
//             } 
    
//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereço: ${endereco.rua}, ${endereco.numero}
//                 Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
//         })
//     })
    
// })

//const telefone = obterTelefone(usuario.id)


//console.log('telefone', telefone)