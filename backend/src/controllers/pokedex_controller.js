import Favorite from "../models/favorite_model.js";

export default class PokedexController {
  async addFavorite(req, res) {
    try {
      const { pokemonId } = req.body;
      const userId = req.user.userId;

      if (!pokemonId) {
        return res
          .status(400)
          .json({ message: "O ID do Pokémon é obrigatório." });
      }

      const [favorite, created] = await Favorite.findOrCreate({
        where: { UserId: userId, pokemonId: pokemonId },
      });

      if (!created) {
        return res
          .status(409)
          .json({ message: "Este Pokémon já está nos seus favoritos." });
      }

      return res
        .status(201)
        .json({ message: "Pokémon adicionado aos favoritos!", favorite });
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  async removeFavorite(req, res) {
    try {
      const { pokemonId } = req.params;
      const userId = req.user.userId;

      const result = await Favorite.destroy({
        where: { UserId: userId, pokemonId: pokemonId },
      });

      if (result === 0) {
        return res.status(404).json({ message: "Favorito não encontrado." });
      }

      return res
        .status(200)
        .json({ message: "Pokémon removido dos favoritos." });
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  async getFavorites(req, res) {
    try {
      const userId = req.user.userId;
      const favorites = await Favorite.findAll({
        where: { UserId: userId },
        attributes: ["pokemonId"],
      });

      const favoriteIds = favorites.map((fav) => fav.pokemonId);
      return res.status(200).json(favoriteIds);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}
