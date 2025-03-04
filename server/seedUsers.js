import mongoose from 'monggose';
import bcrypt from 'bcrypt';
import User from './models/User.js';

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB")

        const supervisor = new User({
            username:'merid',
            email:'merid@gmail.com',
            password: await hashPassword('merid12'),
            role:'supervisor',
        })

        await supervisor.save();
        console.log('Supervisor created:', supervisor)

        for (let agent of agents) {
            const newAgent = new User ({
                username: agent.username,
                email: agent.email,
                password: await hashPassword(agent.password),
                role: 'agent'
            });
            await newAgent.save();
            console.log('Agent created:', newAgent);
        }

        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error seeding users', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

seedUsers();