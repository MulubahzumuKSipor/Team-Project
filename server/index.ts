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
        console.log(result.rows);
        res.json(result.rows);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

// app.post('/users', async (req: express.Request, res: express.Response) => {
//     try {
//         const body = req.body;

//         if (!body.email){
//             return res.status(400).json('Email is required');
//         }
//         const birthDate = body.birthDate ? `'${body.birthDate}'` : 'NULL';

//         const text = `
//         INSERT INTO users_table(email, user_data, shop_name, featuredproduct) VALUES ($1, $2, jsonb_build_object(
//             'firstName', $3, 
//             'lastName', $4,
//             'gender', $6,
//             'phone', $7,
//             'image', $8,
//             'company', jsonb_build_object(
//                 'name', $9)
//     ), jsonb_build_object( 'image', $5, 'price', 0
//     ) RETURNING *`;

//         const values = [
//             body.email,
//             body.shop_name || null,
//             body.firstName || null,
//             body.lastName || null,
//             body.gender || null,
//             body.phone || null,
//             body.image || null,
//             body.company?.name || null
//         ];

//         const result = await pool.query(text, values);
//         return res.status(201).json(result.rows[0]);
//     } catch (err: any) {
//         console.error("Insert user Error" ,err);
//         // Handle unique violation error (duplicate email)
//         if (err.code === '23505') { 
//             return res.status(400).json('Email already exists');
//         }
//         res.status(500).send('Server Error');
//     }
// })

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }   
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


export default app;