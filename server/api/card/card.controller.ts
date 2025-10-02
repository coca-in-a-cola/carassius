import { Request, Response } from 'express';
import { CardCategory } from '../../core/models';
import { gameSystem } from '../../core/systems';

class CardController {
  public selectCard = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.params;

    if (!Object.values(CardCategory).includes(category as CardCategory)) {
      throw new Error('Invalid card category');
    }

    const result = gameSystem.select(req.player!, category as CardCategory);
    res.json(result);
  };

  public chooseYes = async (req: Request, res: Response): Promise<void> => {
    const { player } = req;
    const result = gameSystem.apply(player!, true);

    res.json(result);
  };

  public chooseNo = async (req: Request, res: Response): Promise<void> => {
    const { player } = req;
    const result = gameSystem.apply(player!, false);

    res.json(result);
  };
}

export const cardController = new CardController();
