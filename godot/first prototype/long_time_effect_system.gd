extends Node

var time_effects : Array[TimeEffect]




signal apply_effects(effects : Array[Effect])

func _on_card_system_choice_made(effects: Array[Effect]) -> void:
	for effect in effects:
		if effect is TimeEffect:
			time_effects.append(effect.duplicate())
	
	var applying_effects : Array[Effect]
	for i in range(len(time_effects)):
		if i >= time_effects.size():
			break
		applying_effects.append(time_effects[i].stat_effect)
		time_effects[i].duration -= 1
		if time_effects[i].duration <= 0:
			time_effects.pop_at(i)
	if not applying_effects.is_empty():
		apply_effects.emit(applying_effects)
