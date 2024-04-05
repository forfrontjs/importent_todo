let arr = []

let ul = document.querySelector('.tasks'),
    form = document.querySelector('form'),
    del = document.querySelector('.delete'),
    task__done = document.querySelector('.task__done'),
    task__all = document.querySelector('.task__all'),
    progress = document.querySelector('.progress__done'),
    menu = document.querySelectorAll('.menu__li'),
    statusMenu = 'all'
     
let showTodo = ()=>{
    progress.style.width = 100 / arr.length * arr.filter((el)=>{
        return el.isDone === true
    }).length + '%'
    task__all.textContent = arr.length
    task__done.textContent = arr.filter((el)=>{
        return el.isDone === true
    }).length
    ul.innerHTML = ''
    arr.filter((el)=>{
        if(statusMenu === 'all'){
            return el
        }
        else if(statusMenu === 'done'){
            return el.isDone === true
        }else if(statusMenu === 'imp'){
            return el.isImportant
        }
    })
    .forEach((el)=>{
        ul.innerHTML += 
        `
        <li> <span style = "text-decoration: ${el.isDone ? 'line-through':'none'}">${el.title}</span>
            <div >
            <button class='btn_done' data-id="${el.id}"'>
                <span class="material-symbols-outlined">check</span>   
            </button>
            <button class="btn_del" data-id="${el.id}">
                <span class="material-symbols-outlined">delete</span>
            </button>
            <button class="btn_imp ${el.isImportant ? 'important':''}" data-id="${el.id}">
                <span class="material-symbols-outlined">notification_important
                </span>
            </button>
            </div>
        </li>
        `
    })

    let btns_del = document.querySelectorAll('.btn_del')
    btns_del.forEach((el)=>{
        el.addEventListener('click',()=>{
            arr = arr.filter((item)=>{
                return item.id !== +el.dataset.id
            })
        showTodo()
        })

    })

    let btns_done = document.querySelectorAll('.btn_done')
        btns_done.forEach((el)=>{
        el.addEventListener('click', ()=>{
            arr = arr.map((item)=>{
                if(item.id === +el.dataset.id){
                    return {...item, isDone: !item.isDone}
                }
                return item
            })
            
            showTodo()
            })
        })

    let btns_imp = document.querySelectorAll('.btn_imp')
        btns_imp.forEach((el)=>{
            el.addEventListener('click', ()=>{
                arr = arr.map((item)=>{
                    if(item.id === +el.dataset.id){
                        return {...item, isImportant: !item.isImportant}
                    }
                    return item
                })
                
                showTodo()
            })
        })

}

menu.forEach((el)=>{
    el.addEventListener('click', (event)=>{
        statusMenu = el.textContent
        menu.forEach(el => el.classList.remove('active'))
        event.target.classList.add('active')
        showTodo()
    })
})


form[1].addEventListener('click', (e)=>{
    e.preventDefault()
    if(form[0].value.trim() === '' || /^\d/.test(form[0].value)){
        return 
    }
    arr = [...arr, {id: arr.length + 1, title: form[0].value, isDone: false, isImportant: false}]
    form[0].value = ''
    showTodo()
})


