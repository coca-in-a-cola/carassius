@abstract
extends Resource
class_name Effect

@abstract
func apply(playerData: PlayerData) -> void

@abstract
func should_repeat() -> bool
