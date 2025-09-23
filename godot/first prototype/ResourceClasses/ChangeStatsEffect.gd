extends Effect
class_name StatEffect

enum StatType{
	HEALTH,
	FAMILY,
	HAPPINESS,
	MONEY
}

@export var value : int
@export var stat_type : StatType

func apply(playerData: PlayerData) -> void:
	match stat_type:
				StatEffect.StatType.HEALTH:
					playerData.health += value
				StatEffect.StatType.FAMILY:
					playerData.family += value
				StatEffect.StatType.HAPPINESS:
					playerData.happiness += value
				StatEffect.StatType.MONEY:
					playerData.money += value
