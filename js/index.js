let current = null

class Animal {
    constructor(name, type, file_music, img) {
        this.name = name
        this.type = type
        this.energy = 5
        this.mood = 5
        this.file_music = file_music
        this.bag = null
        this.img = img
    }

    speak() {
        return `${this.name} ${(this.type)} says: hello!`
    }

    eat() {
        this.energy++
    }

    pet() {
        this.mood++
    }

    playSound() {
        if (current) {
            current.pause()
            current.currentTime = 0
        }

        this.music = new Audio(this.file_music)
        this.music.play()

        current = this.music
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name, "Dog", "audio/lay-sobaki.mp3", "img/Без названия (1).jpg")
    }

    speak() {
        return `${this.name} says: woof!`
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name, "Cat", "audio/myaukane-domashney-koshki-37030.mp3", "img/cat.jpg")
    }
    
    speak() {
        return `${this.name} says: meow!`
    }
}

class Lion extends Animal {
    constructor(name) {
        super(name, "Lion", "audio/ryk-lva (1).mp3", "img/Lion.jpg")
    }

    speak() {
        return this.name + " РРРРР"
    }
}

class Elephant extends Animal {
    constructor(name) {
        super(name, "Elephant", "audio/elephant-angry_gkwoet4u.mp3", "img/дамбо.jpg")
    }

    speak() {
        return this.name + " Трууууууу"
    }
}

class Kangaroo extends Animal {
    constructor(name) {
        super(name, "Kangaroo", "audio/zvuki-detenysha-kenguru.mp3", "img/кингуру.jpg")
    }

    speak() {
        return this.name + " Цок-цок!"
    }
}

const zoo = []
const zooDiv = document.getElementById("zoo")

function renderZoo() {
    zooDiv.innerHTML = ""
    zoo.forEach((animal) => {
        const card = document.createElement("div")
        card.className = "card"

        card.innerHTML = `
            <h3>${animal.name} (${animal.type})</h3>
            <p>Energy: ${animal.energy}</p>
            <p>Mood: ${animal.mood}</p>
            <p>${animal.speak()}</p>
        `;

        const imgElement = document.createElement("img")
        imgElement.src = animal.img
        imgElement.alt = `${animal.name}`
        card.appendChild(imgElement)

        const eatButton = document.createElement("button")
        eatButton.textContent = "Eat"
        eatButton.onclick = () => {
            setTimeout(() => {
                animal.eat()
                renderZoo()
            }, 500)
        };

        const sound_play = document.createElement("button")
        sound_play.textContent = "Play sound"
        sound_play.onclick = () => {
            setTimeout(() => {
                animal.pet()
                renderZoo()
                animal.playSound()
            }, 500)
        };

        card.appendChild(eatButton)
        card.appendChild(sound_play)
        zooDiv.appendChild(card)
    });
}

document.getElementById("addBtn").onclick = () => {
    const name = prompt("Enter animal name")
    const type = prompt("Enter animal type (Cat or Dog)").toLowerCase()

    let animal
    if (type === "cat") {
        animal = new Cat(name)
    } else {
        animal = new Dog(name)
    }

    zoo.push(animal)
    renderZoo()
}

document.getElementById("loadBtn").onclick = () => {
    setTimeout(() => {
        let starik = new Cat("Starik")
        let danya = new Dog("D.Skybenich")
        let lion = new Lion("Симба")
        let elephant = new Elephant("Дамбо")
        let kangaroo = new Kangaroo("Бимбо")

        const loadToZoo = [starik, danya, lion, elephant, kangaroo]

        zoo.push(...loadToZoo)

        renderZoo()
    }, 1000)
}
