import express from 'express';
import cors from 'cors';
import pool  from './db.ts';

const app = express();
app.use(cors());
app.use(express.json());

// Routes Here
app.get('/users', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.post('/users', async (req: express.Request, res: express.Response) => {
    try {
        const body = req.body;

        if (!body.email){
            return res.status(400).json('Email is required');
        }
        const birthDate = body.birthDate ? `'${body.birthDate}'` : 'NULL';

        const text = `
        INSERT INTO users(first_name, last_name, maiden_name, gender, email, phone, image, company) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

        const values = [body.first_name, body.last_name, body.maiden_name, body.gender, body.email, body.phone, body.image, body.company];
        
        const result = await pool.query(text, values);
        return res.status(201).json(result.rows[0]);
    } catch (err: any) {
        console.error("Insert user Error" ,err);
        // Handle unique violation error (duplicate email)
        if (err.code === '23505') { 
            return res.status(400).json('Email already exists');
        }
        res.status(500).send('Server Error');
    }
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

export default app;