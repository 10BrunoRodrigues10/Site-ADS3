const produtos = [
  {
    id: 1,
    nome: "Notebook",
    preco: 5000,
    categoria: "aparelhos",
    imagem: "img/notebook.png",
  },
  {
    id: 2,
    nome: "Mouse Gamer",
    preco: 500,
    categoria: "acessorios",
    imagem: "img/mousegamer.png",
  },
  {
    id: 3,
    nome: "Teclado Mecânico",
    preco: 430,
    categoria: "acessorios",
    imagem: "img/tecladogamer.png",
  },
  {
    id: 4,
    nome: "Headset",
    preco: 600,
    categoria: "acessorios",
    imagem: "img/headset.png",
  },
  {
    id: 5,
    nome: "Monitor",
    preco: 3800,
    categoria: "aparelhos",
    imagem: "img/monitor.png",
  },
  {
    id: 6,
    nome: "Celular",
    preco: 11500,
    categoria: "aparelhos",
    imagem: "img/celular.png",
  },
  {
    id: 7,
    nome: "Mousepad",
    preco: 270,
    categoria: "acessorios",
    imagem: "img/mousepad.png",
  },
  {
    id: 8,
    nome: "Tablet",
    preco: 3000,
    categoria: "aparelhos",
    imagem: "img/tablet.png",
  },
  {
    id: 9,
    nome: "Webcam",
    preco: 250,
    categoria: "acessorios",
    imagem: "img/webcam.png",
  },
  {
    id: 10,
    nome: "Microfone",
    preco: 700,
    categoria: "acessorios",
    imagem: "img/microfone.png",
  },
  {
    id: 11,
    nome: "Smartwatch",
    preco: 5200,
    categoria: "acessorios",
    imagem: "img/smartwatch.png",
  },
  {
    id: 12,
    nome: "Videogame",
    preco: 4500,
    categoria: "aparelhos",
    imagem: "img/videogame.png",
  },
  {
    id: 13,
    nome: "Caixa de Som",
    preco: 350,
    categoria: "aparelhos",
    imagem: "img/caixadesom.png",
  },
  {
    id: 14,
    nome: "Controle",
    preco: 400,
    categoria: "acessorios",
    imagem: "img/controle.png",
  },
  {
    id: 15,
    nome: "Pen Drive",
    preco: 45,
    categoria: "acessorios",
    imagem: "img/pendrive.png",
  },
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const listaProdutos = document.getElementById("produtos");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalEl = document.getElementById("total");

function mostrarProdutos(lista) {
  listaProdutos.innerHTML = "";

  lista.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${produto.imagem || "img/padrao.png"}" alt="Imagem de ${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>Categoria: ${produto.categoria}</p>
      <p><strong>R$ ${produto.preco}</strong></p>
      <button onclick="adicionarCarrinho(${produto.id})">
        Adicionar
      </button>
    `;

    listaProdutos.appendChild(card);
  });
}

function adicionarCarrinho(id) {
  const item = produtos.find((p) => p.id === id);

  const existente = carrinho.find((p) => p.id === id);

  if (existente) {
    existente.qtd += 1;
  } else {
    carrinho.push({ ...item, qtd: 1 });
  }

  salvarCarrinho();
  atualizarCarrinho();
}

function removerItem(id) {
  carrinho = carrinho.filter((item) => item.id !== id);
  salvarCarrinho();
  atualizarCarrinho();
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.nome} (x${item.qtd}) - R$ ${item.preco * item.qtd}
      <button onclick="removerItem(${item.id})">X</button>
    `;

    listaCarrinho.appendChild(li);

    total += item.preco * item.qtd;
  });

  totalEl.textContent = `Total: R$ ${total}`;
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

document.getElementById("busca").addEventListener("input", filtrar);
document.getElementById("filtro").addEventListener("change", filtrar);

function filtrar() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const categoria = document.getElementById("filtro").value;

  const filtrados = produtos.filter((produto) => {
    return (
      produto.nome.toLowerCase().includes(busca) &&
      (categoria === "todos" || produto.categoria === categoria)
    );
  });

  mostrarProdutos(filtrados);
}

document.getElementById("limpar").addEventListener("click", () => {
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
});

mostrarProdutos(produtos);
atualizarCarrinho();
