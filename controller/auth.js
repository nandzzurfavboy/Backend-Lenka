const query = require("../database")

async function register(req, res) {
    const {name, email, phoneNumber, password, confpassword} = req.body;

    if (name === undefined ||
        name === "" ||
        email === undefined ||
        email === "" ||
        phoneNumber === undefined ||
        isNaN(+phoneNumber) ||
        password === undefined ||
        password === "" ||
        confpassword === undefined ||
        confpassword === ""
        ) 
    return res.status(400).json("Invalid data!")

    if (password !== confpassword) return res.status(400).json("Password not match");


    try {
        
    } catch (error) {
        return res.status(400).json("Something  when wrong !");
    }
}

async function login(req, res) {
    const {} = req.body;
    try {
        
    } catch (error) {
        return res.status(400).json("Something  when wrong !");
    }
}

module.exports = {
    register,
    login,
};