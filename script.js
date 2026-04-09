// Carrinho de compras
let carrinho = [];

// Função para adicionar produto com desconto
function adicionarProduto(nome, preco) {
  // Aplica 15% de desconto
  const precoComDesconto = preco * 0.85;

  const produtoExistente = carrinho.find(item => item.nome === nome);

  if (produtoExistente) {
    produtoExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco: precoComDesconto, quantidade: 1 });
  }

  atualizarCarrinho();
}

// Função para remover produto
function removerProduto(nome) {
  const produto = carrinho.find(item => item.nome === nome);
  if (produto) {
    produto.quantidade--;
    if (produto.quantidade <= 0) {
      carrinho = carrinho.filter(item => item.nome !== nome);
    }
  }
  atualizarCarrinho();
}

// Atualiza carrinho no cabeçalho
function atualizarCarrinho() {
  const cartDiv = document.querySelector(".cart");
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  cartDiv.innerHTML = `🛒 Carrinho (${totalItens} itens)`;
}

// Captura botões de adicionar
document.querySelectorAll(".product button").forEach(botao => {
  botao.addEventListener("click", (e) => {
    const produtoDiv = e.target.closest(".product");
    const nome = produtoDiv.querySelector("h2").textContent;
    const preco = parseFloat(produtoDiv.querySelector("p").textContent.replace("R$", "").replace(",", "."));

    adicionarProduto(nome, preco);
  });
});

// Exibe carrinho detalhado ao clicar
document.querySelector(".cart").addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Itens no carrinho (com 15% OFF):\n\n";
  carrinho.forEach(item => {
    mensagem += `${item.nome} - ${item.quantidade}x (R$ ${(item.preco * item.quantidade).toFixed(2)})\n`;
  });

  alert(mensagem);
});
