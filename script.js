// Endpoint da AwesomeAPI com a última cotação USD/BRL
const URL_API = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

// Formata número como moeda brasileira (R$ 5,43)
function formatarReal(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 4,
  });
}

async function buscarCotacao() {
  try {
    // 1. Faz a requisição com fetch()
    const resposta = await fetch(URL_API);

    // 2. Converte a resposta para JSON
    const dados = await resposta.json();

    // 3. A API devolve um objeto com a chave "USDBRL"
    const dolar = dados.USDBRL;

    // 4. Mostra os valores na tela
    document.getElementById("atual").textContent = formatarReal(dolar.bid);
    document.getElementById("maior").textContent = formatarReal(dolar.high);
    document.getElementById("menor").textContent = formatarReal(dolar.low);

    // Extra: variação percentual do dia
    const pct = Number(dolar.pctChange);
    const variacao = document.getElementById("variacao");
    variacao.textContent = (pct >= 0 ? "▲ " : "▼ ") + pct.toFixed(2) + "%";
    variacao.className = "variacao " + (pct >= 0 ? "alta" : "baixa");

    document.getElementById("atualizado").textContent =
      "Última cotação: " + dolar.create_date;
  } catch (erro) {
    console.error(erro);
    document.getElementById("atualizado").textContent =
      "Erro ao carregar a cotação. Tente novamente.";
  }
}

buscarCotacao();
