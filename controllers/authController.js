const User = require('../models/User'); 

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.status(200).json({ message: 'Connexion réussie' });
    } else {
      res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
