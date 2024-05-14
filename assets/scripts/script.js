const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sImage = document.querySelector('#m-image')
const sNome = document.querySelector('#m-nome')
const sSite = document.querySelector('#m-site')
const sPreco = document.querySelector('#m-preco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sImage.value = itens[index].image
    sNome.value = itens[index].nome
    sSite.value = itens[index].site
    sPreco.value = itens[index].preco
    id = index
  } else {
    sImage.value = ''
    sNome.value = ''
    sSite.value = ''
    sPreco.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.foto}</td>
    <td>${item.nome}</td>
    <td>${item.site}</td>
    <td>R$ ${item.preco}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class="bi bi-pencil-square"></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class="bi bi-trash"></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sSite.value == '' || sPreco.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].image = sImage.value
    itens[id].nome = sNome.value
    itens[id].site = sSite.value
    itens[id].preco = sPreco.value
  } else {
    itens.push({'image': sImage.value,'nome': sNome.value, 'site': sSite.value, 'preco': sPreco.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
