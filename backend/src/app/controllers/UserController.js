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
            return res.status(404).send('Error')
        }
    }
}

module.exports = new UserController()