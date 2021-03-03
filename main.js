const tagTable = {

    tagsArray: [],
    inputState: '',

    createTag(inputValue) {

        const tagContainer = document.querySelector('.tag-container')
        //create element
        const tagItemWrapper = document.createElement('div');
        tagItemWrapper.setAttribute('class', 'tag');

        const tagNameWrapper = document.createElement('div');
        tagNameWrapper.setAttribute('class', 'tagNameBox');

        const closeIconWrapper = document.createElement('div');
        closeIconWrapper.setAttribute('class', 'closeIconBox');

        const internalTextSpan = document.createElement('span');
        internalTextSpan.innerHTML = inputValue;

        const closeIconImg = document.createElement('img');
        closeIconImg.src = 'cross.png';
        closeIconImg.setAttribute('class', 'close-icon');
        closeIconImg.setAttribute('data-item', inputValue);

        //append elements
        closeIconWrapper.appendChild(closeIconImg)
        tagNameWrapper.appendChild(internalTextSpan)
        tagItemWrapper.appendChild(tagNameWrapper);
        tagItemWrapper.appendChild(closeIconWrapper);

        //add listener
        closeIconImg.addEventListener('click', this.deleteTag.bind(this))

        tagContainer.prepend(tagItemWrapper)

        //update state
        this.tagsArray.push(inputValue)
        //update localstorage
        localStorage.setItem('tags', this.tagsArray)

        this.changeEditMode()
    },

    changeEditMode() {

        let minMaxArray = this.tagsArray.length
        let input = document.querySelector('.input')
        let button = document.querySelector('.add-btn')
        //set max tags count
        if (minMaxArray >= 5) {
            input.disabled = true
            button.disabled = true
        } else if (minMaxArray < 5) {
            input.disabled = false
            button.disabled = false
        }
    },

    deleteTag(e) {

        const tag = e.target.closest('.tag');
        let tags = localStorage.getItem('tags').split(',')
        let updatedTagsArray = tags.filter(item => item !== tag.firstChild.innerText);

        localStorage.setItem('tags', updatedTagsArray);

        e.target.closest('.tag').remove()
        this.tagsArray = updatedTagsArray
        this.changeEditMode()
    },

    handleInput(e) {
        this.inputState = e.target.value
    },

    handleButton() {
        let inputLength = this.inputState.length

        if (inputLength === 0) {
            return alert('min length 1')
        } else if (inputLength >= 10) {
            return alert('max length 10')
        }

        for (let tag of this.tagsArray) {
            if (tag === this.inputState) {
                return alert(`you can't add similar value`)
            }
        }

        this.createTag(this.inputState)
        document.querySelector('.input').value = ''
    },

    getFromStorage() {
        const tags = localStorage.getItem('tags').split(',');
        for (let tag of tags) {
            if (tag.length === 0) {
                return
            }
        }
        if (tags.length !== 0) {
            tags.forEach((tag) => this.createTag(tag));
        }
    },

    setListener() {
        document.querySelector('.input').addEventListener('input', this.handleInput.bind(this));
        document.querySelector('.add-btn').addEventListener('click', this.handleButton.bind(this));
    },

    start() {
        this.getFromStorage()
        this.setListener()
    }
}

tagTable.start()

