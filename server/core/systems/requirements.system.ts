import { Player, Requirement } from '../../core/models';

class RequirementSystem {
  private requirements: Map<number, Requirement> = new Map();

  public initialize(requirements: Requirement[]): void {
    this.requirements.clear();
    requirements.forEach(req => {
      if (req.id) {
        this.requirements.set(req.id, req);
      }
    });
  }

  public checkRequirements(player: Player, requirementIds: number[]): boolean {
    return requirementIds.every(reqId => {
      const requirement = this.requirements.get(reqId);
      return requirement ? this.checkRequirement(player, requirement) : false;
    });
  }

  private checkRequirement(player: Player, requirement: Requirement): boolean {
    // Проверяем требования по картам с ответом "да"
    if (requirement.selectedYes.length > 0) {
      const hasYesRequirements = requirement.selectedYes.every(cardId =>
        player.history.some(record => record.cardId === cardId && record.approved === true)
      );
      if (!hasYesRequirements) {
        return false;
      }
    }

    // Проверяем требования по картам с ответом "нет"
    if (requirement.selectedNo.length > 0) {
      const hasNoRequirements = requirement.selectedNo.every(cardId =>
        player.history.some(record => record.cardId === cardId && record.approved === false)
      );
      if (!hasNoRequirements) {
        return false;
      }
    }

    // Проверяем требования по эффектам
    if (requirement.effectRequirements.length > 0) {
      const hasEffectRequirements = requirement.effectRequirements.every(effectId =>
        player.activeEffects.some(activeEffect => activeEffect.effectId === effectId)
      );
      if (!hasEffectRequirements) {
        return false;
      }
    }

    // Проверяем требование по статам
    if (requirement.statId && requirement.statValue !== null) {
      const stat = player.stats.find(s => s.id === requirement.statId);
      if (!stat) {
        return false;
      }

      const meetsStatRequirement = requirement.operator === '>'
        ? stat.value > requirement.statValue
        : stat.value < requirement.statValue;

      if (!meetsStatRequirement) {
        return false;
      }
    }

    // Проверяем требование по деньгам
    if (requirement.money !== null) {
      const meetsMoneyRequirement = requirement.operator === '>'
        ? player.money > requirement.money
        : player.money < requirement.money;

      if (!meetsMoneyRequirement) {
        return false;
      }
    }

    return true;
  }

  public getRequirementById(reqId: number): Requirement | null {
    return this.requirements.get(reqId) || null;
  }

  public getFailedRequirements(player: Player, requirementIds: number[]): number[] {
    return requirementIds.filter(reqId => {
      const requirement = this.requirements.get(reqId);
      return requirement ? !this.checkRequirement(player, requirement) : false;
    });
  }

  public getRequirementDetails(player: Player, requirementIds: number[]): {
    passed: number[];
    failed: number[];
    details: { [reqId: number]: { passed: boolean; reason?: string } };
  } {
    const passed: number[] = [];
    const failed: number[] = [];
    const details: { [reqId: number]: { passed: boolean; reason?: string } } = {};

    requirementIds.forEach(reqId => {
      const requirement = this.requirements.get(reqId);
      if (!requirement) {
        failed.push(reqId);
        details[reqId] = { passed: false, reason: 'Requirement not found' };
        return;
      }

      const passedRequirement = this.checkRequirement(player, requirement);
      if (passedRequirement) {
        passed.push(reqId);
        details[reqId] = { passed: true };
      } else {
        failed.push(reqId);
        details[reqId] = { passed: false, reason: this.getFailureReason(player, requirement) };
      }
    });

    return { passed, failed, details };
  }

  private getFailureReason(player: Player, requirement: Requirement): string {
    const reasons: string[] = [];

    if (requirement.selectedYes.length > 0) {
      const missingYes = requirement.selectedYes.filter(cardId =>
        !player.history.some(record => record.cardId === cardId && record.approved === true)
      );
      if (missingYes.length > 0) {
        reasons.push(`Missing YES choices for cards: ${missingYes.join(', ')}`);
      }
    }

    if (requirement.selectedNo.length > 0) {
      const missingNo = requirement.selectedNo.filter(cardId =>
        !player.history.some(record => record.cardId === cardId && record.approved === false)
      );
      if (missingNo.length > 0) {
        reasons.push(`Missing NO choices for cards: ${missingNo.join(', ')}`);
      }
    }

    if (requirement.effectRequirements.length > 0) {
      const missingEffects = requirement.effectRequirements.filter(effectId =>
        !player.activeEffects.some(activeEffect => activeEffect.effectId === effectId)
      );
      if (missingEffects.length > 0) {
        reasons.push(`Missing active effects: ${missingEffects.join(', ')}`);
      }
    }

    if (requirement.statId && requirement.statValue !== null) {
      const stat = player.stats.find(s => s.id === requirement.statId);
      if (stat) {
        const meets = requirement.operator === '>'
          ? stat.value > requirement.statValue
          : stat.value < requirement.statValue;
        if (!meets) {
          reasons.push(`Stat ${requirement.statId} ${requirement.operator} ${requirement.statValue} (current: ${stat.value})`);
        }
      } else {
        reasons.push(`Stat ${requirement.statId} not found`);
      }
    }

    if (requirement.money !== null) {
      const meets = requirement.operator === '>'
        ? player.money > requirement.money
        : player.money < requirement.money;
      if (!meets) {
        reasons.push(`Money ${requirement.operator} ${requirement.money} (current: ${player.money})`);
      }
    }

    return reasons.join('; ');
  }
}

export const requirementSystem = new RequirementSystem();
