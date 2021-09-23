import {app} from '../src/server/index';
const supertest = require('supertest');
const request = supertest(app);

it('Test express endpoint', async () => {
    const res = await request.get('/all');
    
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined;
    return res;
}); 
//Make sure that no process is using the default Packager 8081 port