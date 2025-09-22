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
