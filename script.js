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
const apagarProdutos = document.querySelector(".limparCarrinho")
const naoEncontrado = document.querySelector(".naoEncontrado")
const divProdutos = document.querySelectorAll(".produtos")
const menuDaPesquisa = document.querySelector(".menuDaPesquisa")
const totalNotaFiscal = document.querySelector(".totalNotaFiscal")
const botaoWhatsapp = document.querySelector(".whatsapp")
const pedido = document.querySelector(".pedido")
const btnConcluido = document.querySelector(".concluido")

let bannerAtual = 0

function mostrarBanner(){
    banners[bannerAtual].classList.remove("bannerAtivo")
    bannerAtual = bannerAtual + 1
    
    if(bannerAtual > 2){
        bannerAtual = 0
    }
    banners[bannerAtual].classList.add("bannerAtivo")
}
setInterval(mostrarBanner, 5000)

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

botaoWhatsapp.addEventListener("click", () => {
if(carrinho.length === 0){
    window.alert("Não tem nenhum produto no seu carrinho")
}else{
    pedido.style.display = "flex"
    itensCarrinho.classList.remove("menuCarrinhoAberto")

    const itensAntigos = pedido.querySelectorAll(".itensNotaFiscal")
    itensAntigos.forEach(item => item.remove())

    let valorTotalDaNota = 0

    carrinho.forEach((produto) => {
        const divNota = document.createElement("div")
        const nomeNota = document.createElement("p")

        let totalDinheiro = produto.preco.replace("R$", "").trim()
        let valor = totalDinheiro.replace(",", ".")
        let valorFinal = Number(valor)

        let valorDoItem = valorFinal * produto.quantidade
        valorTotalDaNota += valorDoItem

        divNota.className = "itensNotaFiscal"
        
        nomeNota.textContent = `${produto.nome} (x${produto.quantidade}) - R$ ${valorDoItem.toFixed(2).replace(".", ",")}`

        divNota.appendChild(nomeNota)
        
        pedido.insertBefore(divNota, totalNotaFiscal)
    })

    totalNotaFiscal.textContent = `Total: R$ ${valorTotalDaNota.toFixed(2).replace(".", ",")}`
    
    carrinho = []
    atualizarCarrinho()
  }
})

btnConcluido.addEventListener("click", () => {
    pedido.style.display = "none"
    carrinho = []
    atualizarCarrinho()
})

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
            if(produto.quantidade < 10){
                produto.quantidade ++
                atualizarCarrinho()
            }else{
                window.alert("O limite de produtos são de 10 itens")
                atualizarCarrinho()
            }
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
    
    if(quantidadeTotal === 0){
        itensTotalCarrinho.classList.remove("numero")
    }else{
        itensTotalCarrinho.classList.add("numero")
    }
    
    let valorDecimal = total.toFixed(2)
    let valorStringFinal = valorDecimal.replace(".", ",")
    dinheiroFinal.textContent = `R$ ${valorStringFinal}`
            
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
}

apagarProdutos.addEventListener("click", () => {
    carrinho = []
    atualizarCarrinho()
})

function adicionarCarrinho(event){
    mensagemCarrinho.style.display = "flex"
    setTimeout(() =>{
        mensagemCarrinho.style.display = "none"
    }, 2000)
    
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
    
    carrinho.forEach((produto) => {
        if(produto.nome === produtoSelecionado.nome){
            numeroEncontrado = true
            if(produto.quantidade < 10){
                produto.quantidade++  
            }else{
                window.alert("O limite de produtos são de 10 itens") 
            }
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
    let valorInput = input.value.trim()
    let inputMinusculo = valorInput.toLowerCase()
    
    if(inputMinusculo === ""){
        menuDaPesquisa.classList.remove("menuPesquisaAberto")
        menuDaPesquisa.innerHTML = "" 
        
        divProdutos.forEach((produto) => {
            produto.classList.remove("itemPesquisa")
        })
        return
    }
    
    menuDaPesquisa.innerHTML = ""
    let encontrouProduto = false
    
    divProdutos.forEach((produto) => {
        let divNome = produto.querySelector("h3").textContent
        let nomeMinusculo = divNome.toLowerCase()
        let nomeInput = nomeMinusculo.includes(inputMinusculo)

        if(nomeInput === true){
            encontrouProduto = true
            produto.classList.remove("itemPesquisa") 
            
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
            
            divPesquisaNovo.classList.add("itensPesquisados")
            imagemPesquisaNovo.classList.add("imagensPesquisados")
            
            botaoPesquisaNovo.addEventListener("click", () => {
                const produtoSelecionado = {
                    imagem: imagemProdutoPesquisa,
                    nome: nomeProdutoPesquisa,
                    preco: precoProdutoPesquisa,
                    quantidade: 1
                }
                
                let numeroEncontrado = false
                
                carrinho.forEach((prod) => {
                    if (prod.nome === produtoSelecionado.nome) {
                        numeroEncontrado = true
                        if(prod.quantidade < 10){
                            prod.quantidade++
                        }else{
                            window.alert("O limite de produtos são de 10 itens")
                        }
                    }
                })
                
                if (numeroEncontrado === false) {
                    carrinho.push(produtoSelecionado)
                }
                
                localStorage.setItem("carrinho", JSON.stringify(carrinho))
                atualizarCarrinho()
            })
        }
    })
    menuDaPesquisa.classList.add("menuPesquisaAberto")

    if(encontrouProduto === false){
        const mensagemErro = document.createElement("p")
        mensagemErro.textContent = `Nenhum produto encontrado com "${valorInput}"`
        mensagemErro.classList.add("naoEncontrado")
       
        mensagemErro.style.display = "block" 
        
        menuDaPesquisa.appendChild(mensagemErro)

        divProdutos.forEach((produto) => {
            produto.classList.remove("itemPesquisa")
        })
    } else {
        divProdutos.forEach((produto) => {
            let divNome = produto.querySelector("h3").textContent.toLowerCase()
            if(!divNome.includes(inputMinusculo)){
                produto.classList.add("itemPesquisa")
            }
        })
    }
}

input.addEventListener("input", mostrarProdutos)

let carrinhoSalvo = localStorage.getItem("carrinho")
if(carrinhoSalvo != null){
    let carrinhoArray = JSON.parse(carrinhoSalvo)
    carrinho = carrinhoArray
    atualizarCarrinho()
}
