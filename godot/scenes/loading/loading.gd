extends Node2D

func _ready() -> void:
	await _load()
	_post_load()
	

func _load():
	var cards = await Network.get_cards()
	print(cards)

func _post_load():
	get_tree().change_scene_to_file("res://scenes/main/game.tscn")
