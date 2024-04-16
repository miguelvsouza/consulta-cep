document.getElementById('cep').addEventListener('input', (e) => {
    let value = e.target.value

    let cep = value.replace(/\D/g, '')

    cep = cep.substring(0, 8)

    if (cep.length >= 5) {
        cep = cep.substring(0, 5) + '-' + cep.substring(5)
    }

    e.target.value = cep
})

const showData = (result) => {
    for (const campo in result) {
        if (document.getElementById(campo)) {
            document.getElementById(campo).value = result[campo]
            if (campo != 'cep') {
                document.getElementById(campo).disabled = false
            }
        }
    }

    document.getElementById('numero').disabled = false
    document.getElementById('compl').disabled = false
    document.getElementById('numero').focus()
}

const limparCampos = () => {
    const campos = ['cep', 'logradouro', 'numero', 'compl', 'bairro', 'localidade', 'uf']

    campos.forEach(
        (id) => {
            const campo = document.getElementById(id)
            campo.value = ''

            if (id !== 'cep') {
                campo.disabled = true
            }
        }
    )
}

function consultaCep() {
    const cep = document.getElementById('cep').value.replace('-', '')

    if (cep.length != 8) {
        alert('Digite um CEP válido!')
    } else {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(
                (Response) => {
                    Response.json()
                        .then(
                            (data) => {
                                showData(data)
                            }
                        )
                }
            )
            .catch(
                (e) => { alert(`Ocorreu um erro ao consultar o CEP: ${e.message}`) }
            )
    }
}