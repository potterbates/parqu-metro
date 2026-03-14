class Parquimetro {
    constructor() {
        this.tabelaPrecos = [
            { valor: 1.00, tempo: 30 },
            { valor: 1.75, tempo: 60 },
            { valor: 3.00, tempo: 120 }
        ]
    }


    calculartempo(valorInserido) {
        const valorMinimo = this.tabelaPrecos[0].valor;
        if (valorInserido < valorMinimo) {
            return { error: `Valor insuficiente. O valor mínimo é de R$ ${valorMinimo.toFixed(2)}.` };
        }

        let tempoCorrespondente = 0;
        let custoDoTempo = 0; // Custo do tempo correspondente ao valor inserido

        for (let i = this.tabelaPrecos.length - 1; i >= 0; i--) {
            const faixa = this.tabelaPrecos[i]
            tempoCorrespondente = this.tabelaPrecos[i];

            if (valorInserido >= faixa.valor) {
                tempoCorrespondente = faixa.tempo;
                custoDoTempo = faixa.valor;
                break;
            }
        }

        const troco = valorInserido - custoDoTempo;

        return {
            tempo: tempoCorrespondente,
            troco: troco
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const meuParquimetro = new Parquimetro();

    const valorInput = document.getElementById("valorInput");
    const calcularBtn = document.getElementById("calcularBtn");
    const resultadoDiv = document.getElementById("resultadoDiv");

    calcularBtn.addEventListener('click', () => {
        const valor = parseFloat(valorInput.value);

        if (isNaN(valor) || valor <= 0) {
            resultadoDiv.textContent = "Por favor, insira um valor numérico válido."
            resultadoDiv.className = "error";
            return;
        }

        const resultado = meuParquimetro.calculartempo(valor);

        resultadoDiv.className = "";

        if (resultado.error) {
            resultadoDiv.textContent = resultado.error;
            resultadoDiv.classList.add("error")
        } else {
            const mensagem = `
            Tempo de permanência: <strong>${resultado.tempo} minutos</strong>.
            <br>
            Troco: <strong>R$ ${resultado.troco.toFixed(2)}</strong>.
            `
            resultadoDiv.innerHTML = mensagem;
            resultadoDiv.classList.add("success");
        }
    })

})