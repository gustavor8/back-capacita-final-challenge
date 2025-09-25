import Favorite from "../models/favorite_model.js";
import Team from "../models/team_model.js";

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

  async createTeam(req, res) {
    try {
      const { name, pokemonIds } = req.body;
      const userId = req.user.userId;

      if (!name || !pokemonIds) {
        return res
          .status(400)
          .json({ message: "Nome e IDs dos Pokémon são obrigatórios." });
      }

      if (
        !Array.isArray(pokemonIds) ||
        pokemonIds.length === 0 ||
        pokemonIds.length > 6
      ) {
        return res
          .status(400)
          .json({ message: "O time deve ter de 1 a 6 Pokémon." });
      }

      const team = await Team.create({ name, pokemonIds, UserId: userId });

      return res
        .status(201)
        .json({ message: "Time criado com sucesso!", team });
    } catch (error) {
      console.error("Erro ao criar time:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  async getTeams(req, res) {
    try {
      const userId = req.user.userId;
      const teams = await Team.findAll({
        where: { UserId: userId },
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json(teams);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  async deleteTeam(req, res) {
    try {
      const { teamId } = req.params;
      const userId = req.user.userId;

      const result = await Team.destroy({
        where: { id: teamId, UserId: userId },
      });

      if (result === 0) {
        return res.status(404).json({
          message: "Time não encontrado ou não pertence a este usuário.",
        });
      }

      return res.status(200).json({ message: "Time deletado com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar time:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}
