@abstract
extends Resource
class_name Effect

func apply(playerData: PlayerData) -> void:
	pass
	
func should_repeat() -> bool:
	return false	# default behavior: dont repeat the effect on the next turn
