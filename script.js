const doc = document
const items = doc.getElementById("items")
const but = doc.getElementById("button")
const ped = doc.getElementById("pedidos")
const total = doc.getElementById("valor_total_soma")
const image = doc.getElementById("image")
let pedido = [];
const data = [
    {
        "id": 1,
        "nome": "Nigiri",
        "imagem": "https://img.freepik.com/fotos-gratis/bastoes-de-close-up-segurando-sushi-saboroso_23-2148862957.jpg",
        "valor": 10
    },
    {
        "id": 2,
        "nome": "Maki",
        "imagem": "https://cdn.diferenca.com/imagens/sushi-maki-cke.jpg",
        "valor": 2.50
    },
    {
        "id": 3,
        "nome": "Uramaki",
        "imagem": "https://sushimasuko.com.br/wp-content/uploads/2021/02/01-URAMAKI-PHILADELPHIA.jpg",
        "valor": 4.50
    },
    {
        "id": 4,
        "nome": "Temaki",
        "imagem": "https://nakayoshisushibar.meucatalogofacil.com/_core/_uploads//2021/03/00252503216cdh0h93jj.jpg",
        "valor": 10.50
    },
    {
        "id": 5,
        "nome": "Oshi",
        "imagem": "https://t3.ftcdn.net/jpg/01/46/05/18/360_F_146051838_5JDwhw0bKKd5rjegQJiyGazIXYQD3LHz.jpg",
        "valor": 6.50
    },
    {
        "id": 6,
        "nome": "Hosomaki",
        "imagem": "https://thericechick.com/wp-content/uploads/2022/07/square-hosomaki.jpg",
        "valor": 3.50
    },
    {
        "id": 7,
        "nome": "Temari",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzScI6BhGBtTbsetJt-8H4pPlJwAf7vairJeT6Gd4IOVefMff7Kxm33NCsLE2kRtAcSJg&usqp=CAU",
        "valor": 7.50
    },
    {
        "id": 8,
        "nome": "Futomaki",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSASgxtLpTLWyjqZmAvpkKA1cNvu8gd1_xWTA&usqp=CAU",
        "valor": 2.50
    }
]


function testeImage(){
    doc.getElementById("imagem").src = image.value
}

data.forEach(produto => {
    add_item(produto.id, produto.nome, produto.imagem, produto.valor)
});

function add_item(id, title, image, price){
    let resp = 
    "<div class='item'>"+
        "<img src='" + image + "' alt='"+ title + "'>"+
        "<p class='product'>"+title+"</p>"+
        "<p class='price'> Valor: R$ <b>"+ price.toFixed(2) +"</b> </p>"+
        "<button id='button' onclick='add_pedido("+id+")'> Adicionar </button>"+
    "</div>"
    items.innerHTML += resp;
}

function add_item_pedido(id, title, image, price, id_prod_ped){
    let resp = 
    "<div class='item'>"+
        "<img src='" + image + "' alt='"+ title + "'>"+
        "<p class='product'>"+ title +"</p>"+
        "<p class='price'> Valor: R$ <b>"+ price.toFixed(2) +"</b> </p>"+
        "<button id='button_rem' onclick='remove("+ id_prod_ped +")'> Remover </button>"+
    "</div>"
    ped.innerHTML += resp
    let valor = 0;
    pedido.forEach(prod => {
        valor += prod.valor
    })
    total.innerHTML = valor.toFixed(2) ;
}

function add_pedido(id){
    let prod = {};
    let id_prod_ped = Object.keys(pedido).length;

    data.forEach(produto => {
        if(produto.id == id){
            prod.id = produto.id;
            prod.nome = produto.nome;
            prod.imagem = produto.imagem;
            prod.valor = produto.valor;
            prod.id_prod_ped = id_prod_ped;
            pedido.push(prod)
        }
    })
    add_item_pedido(prod.id, prod.nome, prod.imagem, prod.valor, prod.id_prod_ped)
    id_prod_ped++;
}

function remove(id){
    // Removendo pedido específico
    delete pedido[id]
    // Reiniciando os valores dos ids
    let id_prod_ped = 0;
    // Limpando o valor quando não tiver nenhum pedido
    if(Object.keys(pedido).length == 0){
        total.innerHTML = "";
    }
    // Removendo empty spaces
    let response = pedido.filter(function (el) {
        return el != null;
    });
    // Removendo empty spaces
    pedido = response;
    ped.innerHTML = "";
    // Inserindo os pedidos restantes depois que um for apagado
    pedido.forEach(prod=>{
        add_item_pedido(prod.id, prod.nome, prod.imagem, prod.valor, id_prod_ped)
        id_prod_ped++;
    })
}