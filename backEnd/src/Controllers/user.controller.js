import genSaltSync from 'bcrypt';
import hashSync from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default function createUser(req, res) {
    const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body,(err, results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
}

export default function getUserByUserId (req, res){
    const id = req.params.id;
    getUserByUserIdService(id, (err, results) => {
        if(err){
            console.log(err);
            return;
        }
        if(!results){
            return res.json({
                success: 0,
                message: "Record not Found"
            });
        }
        return res.json({
            success: 1,
            data: results
        });
    });
}

export default function getUsers (req, res){
    getUsersService((err, results) => {
        if(err){
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            data: results
        });
    });
}

export default function updateUser (req, res){
    const body = req.body;
        const salt  = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUserService(body, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                });
            }
            return res.json({
                success: 1,
                message: "Updated successfully"
            });
        });
}

export default function deleteUser (req, res){
    const data = req.body;
        deleteUserService(data, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully"
            });
        });
}