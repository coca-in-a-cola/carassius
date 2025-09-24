extends Node

@export var playerData: PlayerData

var _effects : Array[Effect]

func _on_card_system_choice_made(effects: Array[Effect]) -> void:
	var _new_effects: Array[Effect] = []
	_effects.append_array(effects)
	for effect in _effects:
		effect.apply(playerData)
		if effect.should_repeat():
			_new_effects.append(effect)
	_effects = _new_effects
