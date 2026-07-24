const botaoCarrinho = document.querySelector(".carrinho")
const itensCarrinho = document.querySelector(".menuCarrinho")
const botoesAdicionar = document.querySelectorAll(".produtoBotao")
const listaItens = document.querySelector(".itensCarrinho")
const dinheiroFinal = document.querySelector(".dinheiroFinal")
const itensMenu = document.querySelector(".menuItens")
const botaoMenu = document.querySelector(".menu")
const mensagemCarrinho = document.querySelector(".mensagemCarrinho")
const menuLinks = document.querySelector(".menuLinks")
const iconeMenu = document.querySelector(".menu i")
const banners = document.querySelectorAll(".banner")
const itensTotalCarrinho = document.querySelector(".itensTotalCarrinho")
const input = document.querySelector(".input")
const divProdutos = document.querySelectorAll(".produtos")
const menuDaPesquisa = document.querySelector(".menuDaPesquisa")
const botaoWhatsapp = document.querySelector(".whatsapp")
const divMensagemWhatsapp = document.querySelector(".mensagemWhatsapp")

let bannerAtual = 0

function mostrarBanner(){
    
            banners[bannerAtual].classList.remove("bannerAtivo")
            bannerAtual = bannerAtual + 1
    
            if(bannerAtual > 2){
            bannerAtual = 0
            }
    banners[bannerAtual].classList.add("bannerAtivo")
}
setInterval(mostrarBanner, 3000)

function mensagemWhatsapp(){
            
            divMensagemWhatsapp.classList.add("mostrar")
            setTimeout(() =>{
                        divMensagemWhatsapp.classList.remove("mostrar")}, 3000)
}
botaoWhatsapp.addEventListener("click", mensagemWhatsapp)

function abrirCarrinho(){
    itensMenu.classList.remove("menuAberto")
    itensCarrinho.classList.toggle("menuCarrinhoAberto")
            
            fecharMenu()
}
function abrirMenu(){
    itensCarrinho.classList.remove("menuCarrinhoAberto")
    itensMenu.classList.toggle("menuAberto")
    
    if(itensMenu.classList.contains("menuAberto")){
        iconeMenu.classList.remove("fa-bars")
        iconeMenu.classList.add("fa-xmark")
        
        iconeMenu.style.transform = "rotate(90deg)"
    }else{
        iconeMenu.classList.remove("fa-xmark")
        iconeMenu.classList.add("fa-bars")
        iconeMenu.style.transform = "rotate(0deg)"
    }
}
function fecharMenu(){
    itensMenu.classList.remove("menuAberto")
    iconeMenu.classList.remove("fa-xmark")
    iconeMenu.classList.add("fa-bars")
    iconeMenu.style.transform = "rotate(0deg)"
}
botaoCarrinho.addEventListener("click", abrirCarrinho)
botaoMenu.addEventListener("click", abrirMenu)
menuLinks.addEventListener("click", fecharMenu)

let carrinho = []

function atualizarCarrinho(){
    let total = 0
    let quantidadeTotal = 0
    listaItens.innerHTML = ""
    carrinho.forEach((produto, indice) => {
        let item = document.createElement("div")
        let imagemItem = document.createElement("img")
        let nomeItem = document.createElement("h3")
        let quantidadeItem = document.createElement("p")
        let precoItem = document.createElement("p")
        let botaoMenos = document.createElement("button")
        let botaoMais = document.createElement("button")
                
        quantidadeTotal = quantidadeTotal + produto.quantidade
        itensTotalCarrinho.classList.add("numero")
        
        imagemItem.src = produto.imagem
        nomeItem.textContent = produto.nome
        precoItem.textContent = produto.preco
        quantidadeItem.textContent = `${produto.quantidade}`
        botaoMenos.textContent = "-"
        botaoMais.textContent = "+"
        
        function botaoDiminuir(){
            produto.quantidade = produto.quantidade - 1
            
            if(produto.quantidade === 0 ){
            carrinho.splice(indice, 1)
        }
            
            atualizarCarrinho()
        }
        function botaoAdicao(){
            produto.quantidade = produto.quantidade + 1
            atualizarCarrinho()
        }
        botaoMenos.addEventListener("click", botaoDiminuir)
        botaoMais.addEventListener("click", botaoAdicao)
        
        item.appendChild(imagemItem)
        item.appendChild(nomeItem)
        item.appendChild(botaoMenos)
        item.appendChild(quantidadeItem)
        item.appendChild(botaoMais)
        item.appendChild(precoItem)
        
        listaItens.appendChild(item)
        
        let totalDinheiro = produto.preco.replace("R$", "").trim()
        let valor = totalDinheiro.replace(",", ".")
        let valorFinal = Number(valor)
        total += valorFinal * produto.quantidade
        
        
        
        item.classList.add("itemCarrinho")
        imagemItem.classList.add("itemImagem")
        nomeItem.classList.add("itemNome")
        precoItem.classList.add("itemPreco")
        quantidadeItem.classList.add("quantidadeItem")
        botaoMenos.classList.add("botaoMenos")
        botaoMais.classList.add("botaoMais")
    })

    itensTotalCarrinho.textContent = quantidadeTotal
            
    let valorDecimal = total.toFixed(2)
    let valorStringFinal = valorDecimal.replace(".", ",")
    dinheiroFinal.textContent = `R$ ${valorStringFinal}`
            
            localStorage.setItem("carrinho", JSON.stringify(carrinho))
                
}
function adicionarCarrinho(produto){
    
    mensagemCarrinho.classList.add("mostrar")
    setTimeout(() =>{
        mensagemCarrinho.classList.remove("mostrar")}, 2000)
    
    let botaoClicado = event.target
    
        const produtoHTML = botaoClicado.closest(".produtos")
        const imagemHTML = produtoHTML.querySelector("img")
        const nomeHTML = produtoHTML.querySelector("h3")
        const precoHTML = produtoHTML.querySelector("p")
    
    const produtoSelecionado = {
        imagem: imagemHTML.src,
        nome: nomeHTML.textContent,
        preco: precoHTML.textContent,
        quantidade: 1
    }
    
    mensagemCarrinho.querySelector(".mensagem").textContent = `${produtoSelecionado.nome} foi adicionado ao carrinho!`
    
    let numeroEncontrado = false
    
    carrinho.forEach((produto, indice) => {
    if(produto.nome === produtoSelecionado.nome){
            produto.quantidade++
        numeroEncontrado = true
    }
    })
    
    if(numeroEncontrado === false){
            carrinho.push(produtoSelecionado)
        }
            
            localStorage.setItem("carrinho", JSON.stringify(carrinho))
            
    atualizarCarrinho()
}

botoesAdicionar.forEach((botaoAdicionar) => {
    botaoAdicionar.addEventListener("click", adicionarCarrinho)
})


function mostrarProdutos(){
            
            let valorInput = input.value
            let inputMinusculo = valorInput.toLowerCase()
            
            if(inputMinusculo === ""){
              menuDaPesquisa.classList.remove("menuPesquisaAberto")
                        
                        divProdutos.forEach((produto) => {
                                    produto.classList.remove("itemPesquisa")
                        })
                        
                        return
             }
            
            menuDaPesquisa.innerHTML = ""
            
            divProdutos.forEach((produto) => {
                        
            let divNome = produto.querySelector("h3").textContent
            let nomeMinusculo = divNome.toLowerCase()
            
            let nomeInput = nomeMinusculo.includes(`${inputMinusculo}`)
                        
                        if(nomeInput === true){
                                   produto.classList.remove("itemPesquisa")
                                    menuDaPesquisa.classList.add("menuPesquisaAberto")
                                    
                                    const divPesquisaNovo = document.createElement("div")
                                    const imagemPesquisaNovo = document.createElement("img")
                                    const nomePesquisaNovo = document.createElement("h3")
                                    const precoPesquisaNovo = document.createElement("p")
                                    const botaoPesquisaNovo = document.createElement("button")
                                    
                                    const imagemProdutoPesquisa = produto.querySelector("img").src
                                    const nomeProdutoPesquisa = divNome
                                    const precoProdutoPesquisa = produto.querySelector("p").textContent
                                    const botaoProdutoPesquisa = produto.querySelector("button").textContent
                                    
                                    imagemPesquisaNovo.src = imagemProdutoPesquisa
                                    nomePesquisaNovo.textContent = nomeProdutoPesquisa
                                    precoPesquisaNovo.textContent = precoProdutoPesquisa
                                    botaoPesquisaNovo.textContent = botaoProdutoPesquisa
                                    
                                    menuDaPesquisa.appendChild(divPesquisaNovo)
                                    divPesquisaNovo.appendChild(imagemPesquisaNovo)
                                    divPesquisaNovo.appendChild(nomePesquisaNovo)
                                    divPesquisaNovo.appendChild(precoPesquisaNovo)
                                    divPesquisaNovo.appendChild(botaoPesquisaNovo)
                                    
                                    divPesquisaNovo.classList.toggle("itensPesquisados")
                                    imagemPesquisaNovo.classList.toggle("imagensPesquisados")
                                    
                                    botaoPesquisaNovo.closest(".produtos")
                                    
                                    botaoPesquisaNovo.addEventListener("click", () => {

    const imagemHTML = produto.querySelector("img")
    const nomeHTML = produto.querySelector("h3")
    const precoHTML = produto.querySelector("p")

    const produtoSelecionado = {
        imagem: imagemHTML.src,
        nome: nomeHTML.textContent,
        preco: precoHTML.textContent,
        quantidade: 1
    }

    let numeroEncontrado = false

    carrinho.forEach((produto) => {

        if (produto.nome === produtoSelecionado.nome) {
            produto.quantidade++
            numeroEncontrado = true
        }

    })

    if (numeroEncontrado === false) {
        carrinho.push(produtoSelecionado)
    }

    atualizarCarrinho()

})
                                    
                        }else{
                                    produto.classList.add("itemPesquisa")
                        }
                        
            })            
            
}
input.addEventListener("input", mostrarProdutos)

let carrinhoSalvo = localStorage.getItem("carrinho")
            if(carrinhoSalvo != null){
            let carrinhoArray = JSON.parse(carrinhoSalvo)
            carrinho = carrinhoArray
            
                        atualizarCarrinho()
            }