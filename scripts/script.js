const emotionRadios = document.getElementById('emotion-radios')
const emotionSelect = document.getElementById("emotion-select")
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', selectRadio)

emotionSelect.addEventListener('change', selectSelect)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)
    
function selectRadio () {
    emotionSelect.selectedIndex = 0
    emotionSelect.classList.remove('selected')
}
    
function selectSelect () {
    const radioButtons = document.querySelectorAll('input[name="emotions"]')
    radioButtons.forEach(radio => radio.checked = false)
    
    if (emotionSelect.selectedIndex !== 0) {
        emotionSelect.classList.add('selected')
    }
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderCat(){
    const catObject = getMatchingCatsArray()
    let gallery = ``
    const selectedRadio = document.querySelector('input[type="radio"]:checked');
    const selectedOption = document.querySelector('option:checked');
    if (selectedRadio) {
        for (let cat of catObject) {
            gallery += `<img class="cat-img" src="${cat.image}" alt="${cat.alt}">`;
        }
    } else if (selectedOption && !selectedOption.classList.contains('placeholder')) {
        gallery = `<img class="cat-img" src="${catObject.image}" alt="${catObject.alt}">`;
    }
    if (gallery === ``) {
        gallery = "<h3>There is no Cat Meme For Your Preferences</h3>"
    }
    memeModalInner.innerHTML = gallery
    memeModal.style.display = 'grid'
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        const catsArray = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return catsArray
    }

    if (!document.querySelector(".placeholder").checked) {
        const selectedEmotion = document.querySelector('option:checked').value
        const isGif = gifsOnlyOption.checked
        const catsArray = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotions(cats){
    let radioItems = ``
    let selectItems = `<option class="placeholder" value="" selected disabled>Select Your Emotion</option>`
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}<input type="radio" id="${emotion}" value="${emotion}" name="emotions"></label>
            </div>`
        selectItems += `<option value="${emotion}" id="${emotion}">${emotion}</option>`
    }
    emotionSelect.innerHTML = selectItems
    emotionRadios.innerHTML = radioItems
}

renderEmotions(catsData)