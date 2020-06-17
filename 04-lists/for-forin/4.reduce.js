const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function(callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for(let index = 0; index <= this.length; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }
    return valorFinal;
}

async function main() {
    try {
        const { 
            results 
        } = await obterPessoas('a')

        
        const altura = results.map(item => parseInt(item.height))
        console.log('altura', altura)
        // const total = altura.reduce((anterior, proximo) => {
        //     return anterior + proximo
        // }, 0)

        const minhaLista = [
            ['Gustavo', 'de Paula'],
            ['Node', 'NodeBR']
        ]

        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, [])
        .join(', ')
        console.log('total', total)
    }
    catch(error) {
        console.error('DEU RUIM', error)
    }
}

main()