const express = require("express");
const router = express.Router();
const uploaderInfo = require("../../db/models/uploaderInfo");

router.get("/getuser", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const user = await validateMyToken(token, process.env.JWT_SECRET)
        if(user.id) {
            res.json({
                id: user.id,
                firstname: user.uploaderFirstName,
                lastname: user.uploaderLastName,
                email: user.uploaderEmail,
                hebrewDOB: user.uploaderDOBHebrew
            })
        } else {
            res.json({
                message: "No user found"
            })
        }
    } catch (error) {
        
    }
})

module.exports = router;