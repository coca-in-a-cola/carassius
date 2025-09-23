extends Effect
class_name TimeEffect

@export var duration : int
@export var stat_effect : StatEffect

var _should_repeat = true

func apply(playerData: PlayerData) -> void:
	stat_effect.apply(playerData)
	duration -= 1
	if duration <= 0:
		_should_repeat = false

func should_repeat() -> bool:
	return _should_repeat
