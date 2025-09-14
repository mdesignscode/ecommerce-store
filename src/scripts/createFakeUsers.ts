import bcrypt from "bcryptjs";
import { User } from "models";

const avatar = '/images/icons8-user-64.png';

const createFakeUser = async (username: string) => {
        // generate password
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(username, salt);
        // generate email
        const joinedUsername = username.split(' ').join('')
        const email = `${joinedUsername}@seed.email`;

        await User.create({
                password: hash,
                avatar,
                username,
                email,
                isVerified: true,
        });
};

export async function createFakeUsers() {
        const fakeUsers = [
                'Lida Cross', 'Randall Park', 'Bill Buchanan', 'Douglas Russell',
                'Annie Baldwin', 'Don Willis', 'Catherine Pope',
                'Georgia Richards', 'Evelyn Gomez', 'Clifford Guerrero'
        ];

        for (const name of fakeUsers) {
                try {
                        await createFakeUser(name);
                        console.log(`✅ User created: ${name}`);
                } catch {
                        console.log('DB populated with fake users already')
                        return;
                }
        }

        console.log('🌱 Seeding complete.');
}

