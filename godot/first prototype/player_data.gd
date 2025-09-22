extends Node

signal health_changed(new_health)
var health = 50 : 
	set(value):
		health = clamp(value, 0, 100)
		health_changed.emit(health)


signal family_changed(new_family)
var family = 50 : 
	set(value):
		family = clamp(value, 0, 100)
		family_changed.emit(family)


signal happiness_changed(new_happiness)
var happiness = 50 : 
	set(value):
		happiness = clamp(value, 0, 100)
		happiness_changed.emit(happiness)


signal money_changed(new_money)
var money = 0 :
	set(value):
		money = 0 if value < 0 else value
		money_changed.emit(money)



func _ready():
	health = 50
	family = 50
	happiness = 50
	money = 0



func _on_h_box_container_choice_made(effects: Array[Effect]) -> void:
	for effect in effects:
		if effect is StatEffect:
			match effect.stat_type:
				StatEffect.StatType.HEALTH:
					health += effect.value
				StatEffect.StatType.FAMILY:
					family += effect.value
				StatEffect.StatType.HAPPINESS:
					happiness += effect.value
				StatEffect.StatType.MONEY:
					money += effect.value
