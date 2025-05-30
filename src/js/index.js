class KRKRTrainingData {
    value;
    /** @type {KRKRTrainingData[]} */
    children = [];
    /** @type {KRKRTrainedAIResponse|null} */
    responses;
    constructor (value) { this.value = value; }
}

class KRKRTrainedAIResponse {
    /** @type {{[key: string]: number[]}} */
    data;
    constructor (template) {
        this.data = {};
        for(let i = 0; i < Object.keys(template).length; i++) {
            this.data[Object.keys(template)[i]] = [];
        }
    }

    /**
     * 
     * @param {{[key: string]: number}} data 
     */
    append (data) {
        for(let i = 0; i < Object.keys(this.data).length; i++) {
            this.data[Object.keys(data)[i]].push(data[Object.keys(data)[i]]);
        }
    }
}

class KuruKuruAI {
    temperature;
    variation;
    /** @type {KRKRTrainingData[]} */
    #data = [];

    constructor({temperature,variation}={temperature:0.8,variation:2.5}) {
        this.temperature = temperature;
        this.variation = variation;
    }

    /**
     * Trains the AI.
     * @param {number[]} int 
     * @param {{x:number[],y:number,z:number,xt:number,yt:number,zt:number}} response 
     */
    train (int, response) {
        let foundBase;
        for(let i = 0; i < this.#data.length; i++) {
            if(this.#data[i].value === int[0]) {
                foundBase = this.#data[i];
                break;
            }
        }
        const base = foundBase || new KRKRTrainingData(int[0]);
        let arena = base;
        for(let k = 1; k < int.length; k++) {
            let foundArena;
            for(let g = 0; g < arena.children.length; g++) {
                if(arena.children[g].value === int[k]) {
                    foundArena = arena;
                    break;
                }
            }
            if(foundArena) {
                arena = foundArena;
            } else {
                let soonToBeArena = new KRKRTrainingData(int[k]);
                arena.children.push(soonToBeArena);
                arena = soonToBeArena;
            }
        }
        if(!arena.responses) arena.responses = new KRKRTrainedAIResponse(response);
        arena.response.append(response);
        if(!foundBase) this.#data.push(base);
    }

    /**
     * Generates a result based on the input.
     * @param  {...number} int 
     */
    generate(...int) {}

}
