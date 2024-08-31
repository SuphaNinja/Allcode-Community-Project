export async function test(req, res) {
    try {
        const jsonObject = req.body;
        res.status(200).send(jsonObject);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred' });
    }
}