import axios from 'axios';

class User {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000' // json-server end point
        })
    }

    async list() {
        const res = await this.api.get('/users');
        return res.data;
    }

    async find(id) {
        const res = await this.api.get(`users/${id}`);
        return res.data;
    }

    async create(data) {
        data.friends = data.friends ? data.friends.map(id => {id}) : []

        const res = await this.api.post('/users', data);
        return res.data;
    }
}

export default new User();