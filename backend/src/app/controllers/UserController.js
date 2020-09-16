const axios = require('axios')

class UserController {
    async search(req, res) {
        try {
            const { username } = req.body

            const response = await axios.get(`https://api.github.com/users/${username}/repos`)

            const { data } = response

            return res.json({
                data
            })
        } catch (error) {
            return res.json({ msg: error.message })
        }
    }
}

module.exports = new UserController()