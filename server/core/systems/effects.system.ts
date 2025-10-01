import { Player, Effect, PlayerActiveEffect } from '@server/core/models';

class EffectSystem {
  private effects: Map<number, Effect> = new Map();

  public initialize(effects: Effect[]): void {
    this.effects.clear();
    effects.forEach(effect => {
      if (effect.id) {
        this.effects.set(effect.id, effect);
      }
    });
  }

  public applyEffects(player: Player, effectIds: number[]): Player {
    effectIds.forEach(effectId => {
      const effect = this.effects.get(effectId);
      if (effect) {
        this.applyEffect(player, effect);
      }
    });

    return player;
  }

  public processDayEffects(player: Player): Player {
    const effectsToRemove: number[] = [];

    player.activeEffects.forEach((activeEffect, index) => {
      const effect = this.effects.get(activeEffect.effectId);
      if (!effect) {
        effectsToRemove.push(index);
        return;
      }

      const daysPassed = player.day - activeEffect.appliedDay;

      if (effect.delay && daysPassed >= effect.delay) {
        this.executeEffect(player, effect);

        if (effect.repeatCount) {
          activeEffect.repeatsLeft--;

          if (activeEffect.repeatsLeft <= 0) {
            effectsToRemove.push(index);
          } else {
            activeEffect.appliedDay = player.day;
          }
        } else {
          effectsToRemove.push(index);
        }
      }
    });

    if (effectsToRemove.length > 0) {
      player.activeEffects = player.activeEffects.filter((_, index) => !effectsToRemove.includes(index));
    }

    return player;
  }

  private applyEffect(player: Player, effect: Effect): void {
    if (effect.clearEffectId) {
      this.clearEffect(player, effect.clearEffectId);
    }

    if (!effect.delay && !effect.repeatCount) {
      this.executeEffect(player, effect);
      return;
    }

    player.activeEffects.push(new PlayerActiveEffect({
      effectId: effect.id!,
      appliedDay: player.day,
      repeatsLeft: effect.repeatCount || 1
    }));
  }

  private executeEffect(player: Player, effect: Effect): void {
    if (effect.statValue !== null && !isNaN(effect.statValue)) {
      const stat = player.stats.find(s => s.id === effect.statId);
      if (stat) {
        stat.value = Math.max(0, Math.min(100, stat.value + effect.statValue));
      }
    }

    if (effect.money !== null && !isNaN(effect.money)) {
      player.money = Math.max(0, player.money + effect.money);
    }
  }

  private clearEffect(player: Player, effectId: number): void {
    player.activeEffects = player.activeEffects.filter(activeEffect =>
      activeEffect.effectId !== effectId
    );
  }

  public getActiveEffectsInfo(player: Player): { effect: Effect; appliedDay: number; repeatsLeft: number }[] {
    return player.activeEffects.map(activeEffect => ({
      effect: this.effects.get(activeEffect.effectId)!,
      appliedDay: activeEffect.appliedDay,
      repeatsLeft: activeEffect.repeatsLeft
    })).filter(item => item.effect);
  }
}

export const effectSystem = new EffectSystem();
